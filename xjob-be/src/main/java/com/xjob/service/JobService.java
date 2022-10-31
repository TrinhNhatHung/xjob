package com.xjob.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xjob.dao.JobDao;
import com.xjob.persistence.Job;

@Service
public class JobService {

	@Autowired
	private JobDao jobDao;

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
}
