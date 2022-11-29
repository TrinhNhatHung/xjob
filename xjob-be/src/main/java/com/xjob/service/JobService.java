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
import com.xjob.dao.SkillDao;
import com.xjob.dao.UserHistoryDao;
import com.xjob.persistence.Job;
import com.xjob.persistence.JobSkill;
import com.xjob.persistence.JobSkill.Id;
import com.xjob.persistence.Skill;
import com.xjob.persistence.UserHistory;

@Service
public class JobService {

	@Autowired
	private JobDao jobDao;
	
	@Autowired
	private SkillDao skillDao;
	
	@Autowired
	private JobSkillDao jobSkillDao;
	
	@Autowired
	private UserHistoryDao userHistoryDao;

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
	public Integer postjob(Job job, List<String> skills) {
		List<Integer> skillIds = new ArrayList<>();
		for (String skillName : skills) {
			Skill skill = skillDao.getBySkillName(skillName);
			if (skill == null) {
				skill = new Skill();
				skill.setSkillName(skillName);
				Integer insertedId = (Integer) skillDao.insert(skill);
				skillIds.add(insertedId);
			} else {
				skillIds.add(skill.getSkillId());
			}
		}
		
		Integer jobId = (Integer) jobDao.insert(job);
		
		for(Integer skillId : skillIds) {
			JobSkill jobSkill = new JobSkill();
			Id jobSkillId = new Id();
			jobSkillId.setJobId(jobId);
			jobSkillId.setSkillId(skillId);
			jobSkill.setJobSkillId(jobSkillId);
			jobSkillDao.insertNativeQuery(jobSkill);
		}
		
		return jobId;
	}
	
	public Job getById(Integer jobId) {
		return jobDao.getById(Job.class,jobId);
	}
	
	public List<Job> getBestMatch(String uid, Integer page, Integer limit){
		List<UserHistory> userHistories = userHistoryDao.getByUid(uid);
		List<String> userHistoriesSkill = userHistories.stream()
													   .filter(t -> BusinessConst.USER_HISTORY_KIND_SKILL.equals(t.getKind()))
													   .map(t -> t.getKeyword())
													   .collect(Collectors.toList());
		List<String> userHistoriesTitle = userHistories.stream()
													   .filter(t -> BusinessConst.USER_HISTORY_KIND_TITLE.equals(t.getKind()))
													   .map(t -> t.getKeyword())
													   .collect(Collectors.toList());
		List<String> userHistoriesDetail = userHistories.stream()
														.filter(t -> BusinessConst.USER_HISTORY_KIND_DETAIL.equals(t.getKind()))
														.map(t -> t.getKeyword())
														.collect(Collectors.toList());
		List<String> userHistoriesPaymentKind = userHistories.stream()
															 .filter(t -> BusinessConst.USER_HISTORY_KIND_PAYMENTKIND.equals(t.getKind()))
															 .map(t -> t.getKeyword())
															 .collect(Collectors.toList());
		List<String> userHistoriesSearch = userHistories.stream()
															 .filter(t -> BusinessConst.USER_HISTORY_KIND_SEARCH.equals(t.getKind()))
															 .map(t -> t.getKeyword())
															 .collect(Collectors.toList());
//		int count = userHistoriesDetail.size() + userHistoriesTitle.size() + userHistoriesSkill.size() + userHistoriesPaymentKind.size();
		
		List<Job> jobs = jobDao.getOpenJob();
		Map<Job, Integer> bestMatchLevel = new HashMap<>();
		for (Job job: jobs) {
			int result = 0;
			String title = job.getTitle();
			String [] titles = title.split("\\s+");
			String detail = job.getDetail();
			String [] details = detail.split("\\s+");
			String paymentKind = job.getPaymentKind();
			List<String> skills = job.getJobSkills().stream().map(t -> t.getSkill().getSkillName()).collect(Collectors.toList());
			
			for (String s : titles) {
				for (String s1 : userHistoriesTitle) {
					if (s1.indexOf(s) != -1) {
						result++;
					}
				}
				
				for (String s1 : userHistoriesSearch) {
					if (s1.indexOf(s) != -1 || s.indexOf(s1) != -1) {
						result++;
					}
				}
			}
			
			for (String s : details) {
				for (String s1 : userHistoriesDetail) {
					if (s1.indexOf(s) != -1) {
						result++;
					}
				}
				
				for (String s1 : userHistoriesSearch) {
					if (s1.indexOf(s) != -1 || s.indexOf(s1) != -1) {
						result++;
					}
				}
			}
			
			for (String s : userHistoriesPaymentKind) {
				if (paymentKind.equals(s)) {
					result++;
				}
			}
			
			for (String s : skills) {
				for (String s1 : userHistoriesSkill) {
					if (s1.indexOf(s) != -1) {
						result++;
					}
				}
				
				for (String s1 : userHistoriesSearch) {
					if (s1.indexOf(s) != -1 || s.indexOf(s1) != -1) {
						result++;
					}
				}
			}
			
			bestMatchLevel.put(job, result);
		}	
		
		List<Job> jobsResult = bestMatchLevel.entrySet().stream()
											 .sorted(Entry.comparingByValue(Comparator.reverseOrder()))
											 .map(t -> t.getKey())
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
	
	public List<Job> getBySearch(String search, Integer page, Integer limit){
		List<Job> jobs = jobDao.getOpenJob();
		List<Job> result = new ArrayList<>();
		
		for (Job job: jobs) {
			String info = job.getTitle() + job.getDetail();
			List<String> skills = job.getJobSkills().stream().map(s -> s.getSkill().getSkillName()).collect(Collectors.toList());
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
}
