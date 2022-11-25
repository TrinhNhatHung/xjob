package com.xjob.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xjob.dao.JobDao;
import com.xjob.dao.JobSkillDao;
import com.xjob.dao.SkillDao;
import com.xjob.persistence.Job;
import com.xjob.persistence.JobSkill;
import com.xjob.persistence.JobSkill.Id;
import com.xjob.persistence.Skill;

@Service
public class JobService {

	@Autowired
	private JobDao jobDao;
	
	@Autowired
	private SkillDao skillDao;
	
	@Autowired
	private JobSkillDao jobSkillDao;

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
}
