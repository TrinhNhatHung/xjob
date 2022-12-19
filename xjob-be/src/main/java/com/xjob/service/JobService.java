package com.xjob.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xjob.constant.BusinessConst;
import com.xjob.dao.JobDao;
import com.xjob.dao.JobSkillDao;
import com.xjob.dao.JobStatusDao;
import com.xjob.dao.ProposalDao;
import com.xjob.dao.SkillDao;
import com.xjob.persistence.Job;
import com.xjob.persistence.JobSkill;
import com.xjob.persistence.JobSkill.Id;
import com.xjob.persistence.JobStatus;
import com.xjob.persistence.Skill;
import com.xjob.persistence.Status;
import com.xjob.persistence.User;

@Service
public class JobService {

	@Autowired
	private JobDao jobDao;

	@Autowired
	private SkillDao skillDao;

	@Autowired
	private JobSkillDao jobSkillDao;

	@Autowired
	private ProposalDao proposalDao;
	
	@Autowired
	private JobStatusDao jobStatusDao;
	
	@Autowired
	private UserService userService;

	public List<Job> getByAuthor(String uid, Integer limit, Integer page) {
		if (limit == null) {
			limit = 10000;
		}

		if (page == null) {
			page = 1;
		} else if (page <= 0) {
			page = 1;
		}
		return jobDao.getByAuthor(uid, limit, page);
	}

	public List<Job> get(Integer limit, Integer page) {
		if (limit == null) {
			limit = 10000;
		}

		if (page == null) {
			page = 1;
		} else if (page <= 0) {
			page = 1;
		}
		return jobDao.get(limit, page);
	}

	public Job getByIdAndUid(Integer jobId, String uid) {
		return jobDao.getByIdAndUid(jobId, uid);
	}

	@Transactional
	public Integer postjob(Job job, List<Skill> skills) {

		Integer jobId = (Integer) jobDao.insert(job);
		
		JobStatus jobStatus = new JobStatus();
		job.setJobId(jobId);
		jobStatus.setJob(job);
		Status status = new Status();
		status.setStatusId(BusinessConst.JOB_STATUS_OPEN);
		jobStatus.setStatus(status);
		com.xjob.persistence.JobStatus.Id id = new com.xjob.persistence.JobStatus.Id();
		id.setJobId(jobId);
		id.setStatusId(BusinessConst.JOB_STATUS_OPEN);
		jobStatus.setJobStatusId(id);
		jobStatusDao.insert(jobStatus);

		for (Skill skill : skills) {
			JobSkill jobSkill = new JobSkill();
			Id jobSkillId = new Id();
			jobSkillId.setJobId(job.getJobId());
			jobSkillId.setSkillId(skill.getSkillId());
			jobSkill.setJobSkillId(jobSkillId);
			jobSkillDao.insertNativeQuery(jobSkill);
		}

		return jobId;
	}
	
	@Transactional
	public void updateJob(Job job, List<Skill> skills) {
		jobDao.insertOrUpdate(job);
		jobSkillDao.deleteByJobId(job.getJobId());
		for (Skill skill : skills) {
			JobSkill jobSkill = new JobSkill();
			Id jobSkillId = new Id();
			jobSkillId.setJobId(job.getJobId());
			jobSkillId.setSkillId(skill.getSkillId());
			jobSkill.setJobSkillId(jobSkillId);
			jobSkillDao.insertNativeQuery(jobSkill);
		}
	}

	public Job getById(Integer jobId) {
		return jobDao.getById(Job.class, jobId);
	}

	public List<Job> getBestMatch(String uid, Integer page, Integer limit) {
		List<Integer> jobIds = proposalDao.getDistinctJobIdByUid(uid);
		Map<Integer, Integer> bestMatchMatrix = jobSkillDao.getBestMatchMatrix(jobIds);
		User user = userService.getById(uid);
		List<Integer> userSkillIds = user.getUserSkills().stream().map(t -> t.getUserSkillId().getSkillId()).collect(Collectors.toList());
		for (Integer i : userSkillIds) {
			if (bestMatchMatrix.get(i) == null) {
				bestMatchMatrix.put(i, 1);
			} else {
				bestMatchMatrix.put(i, bestMatchMatrix.get(i) + 1);
			}
		}
		int total = 0;
		for (Integer weighing : bestMatchMatrix.values()) {
			total += weighing;
		}
		Map<Integer, Double> nornalizeBestMatchMatrix = new HashMap<>();
		for (Entry<Integer, Integer> entry : bestMatchMatrix.entrySet()) {
			nornalizeBestMatchMatrix.put(entry.getKey(), (double) entry.getValue() / (double) total);
		}

		List<Job> jobs = jobDao.getOpenJob();
		Map<Job, Double> bestMatchData = new HashMap<>();
		for (Job job : jobs) {
			double weighing = 0;
			List<Integer> skillIds = job.getJobSkills().stream().map(t -> t.getJobSkillId().getSkillId())
					.collect(Collectors.toList());
			for (Integer i : skillIds) {
				if (nornalizeBestMatchMatrix.get(i) != null) {
					weighing += nornalizeBestMatchMatrix.get(i);
				}
			}
			bestMatchData.put(job, weighing);
		}
		List<Job> jobsResult = bestMatchData.entrySet().stream()
				.sorted(Entry.comparingByValue(Comparator.reverseOrder())).map(t -> t.getKey())
				.collect(Collectors.toList());
		if (page != null && limit != null) {
			if (jobsResult.size() > page * limit) {
				jobsResult = jobsResult.subList(0, page * limit);
			} else {
				jobsResult = jobsResult.subList(0, jobs.size());
			}
		}
		return jobsResult;
	}

	public List<Job> getBySearch(String search, Integer page, Integer limit) {
		List<Job> jobs = jobDao.getOpenJob();
		List<Job> result = new ArrayList<>();

		for (Job job : jobs) {
			String info = job.getTitle() + job.getDetail();
			List<String> skills = job.getJobSkills().stream().map(s -> s.getSkill().getSkillName())
					.collect(Collectors.toList());
			for (String skill : skills) {
				info += skill;
			}
			if (info.toLowerCase().indexOf(search.toLowerCase()) != -1 && search != "" && search != null) {
				result.add(job);
			}
		}
		if (result.size() > (page * limit)) {
			result = result.subList(0, page * limit);
		} else {
			result = result.subList(0, result.size());
		}
		return result;
	}
	
	@Transactional
	public void closeJob(Integer jobId) {
		jobStatusDao.closeJob(jobId);
	}
}
