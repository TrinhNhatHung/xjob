package com.xjob.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xjob.dao.SkillDao;
import com.xjob.dao.UserSkillDao;
import com.xjob.persistence.Skill;

@Service
public class SkillService {

	@Autowired
	private SkillDao skillDao;
	
	@Autowired
	private UserSkillDao userSkillDao;
	
	public List<Skill> getSkillList(){
		return skillDao.getSkillList();
	}
	
	@Transactional
	public void updateFreelancerSkill(List<Integer> skillIds, String uid) {
		userSkillDao.deleteByUid(uid);
		for (Integer skillId : skillIds) {
			userSkillDao.insert(uid, skillId);
		}
	}
	
	public List<Map<String, Object>> getMostSkil(){
		return skillDao.getMostSkill();
	}
}
