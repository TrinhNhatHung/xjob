package com.xjob.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xjob.dao.SkillDao;
import com.xjob.persistence.Skill;

@Service
public class SkillService {

	@Autowired
	private SkillDao skillDao;
	
	public List<Skill> getSkillList(){
		return skillDao.getSkillList();
	}
}
