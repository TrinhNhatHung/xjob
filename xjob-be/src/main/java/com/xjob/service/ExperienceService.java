package com.xjob.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xjob.dao.ExperienceDao;
import com.xjob.persistence.Experience;

@Service
public class ExperienceService {
	
	@Autowired
	private ExperienceDao experienceDao;
	
	@Transactional
	public void update(Experience experience) {
		experienceDao.insertOrUpdate(experience);
	}
	
	@Transactional
	public void deleteById(Integer experiencerId) {
		Experience experience = new Experience();
		experience.setExperienceId(experiencerId);
		experienceDao.delete(experience);
	}
}
