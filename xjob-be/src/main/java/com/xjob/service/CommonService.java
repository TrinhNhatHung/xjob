package com.xjob.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xjob.dao.JobDao;
import com.xjob.dao.UserDao;

@Service
public class CommonService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private JobDao jobDao;
	
	public Map<String, Object> getDashboard(){
		Map<String, Object> map = new HashMap<>();
		int countFreelancer = userDao.countFreelancer();
		int countClient = userDao.countClient();
		int countJob = jobDao.count();
		map.put("countJob", countJob);
		map.put("countFreelancer", countFreelancer);
		map.put("countClient", countClient);
		return map;
	}
}
