package com.xjob.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.constant.BusinessConst;
import com.xjob.persistence.Job;

@Repository
public class JobDao extends EntityDao<Job>{
	
	public List<Job> getByAuthor(String uid, Integer limit, Integer page){
		final String SQL = "SELECT * FROM job\r\n"
				+ "WHERE author_id = :authorId\r\n"
				+ "ORDER BY update_at desc\r\n"
				+ "LIMIT :limit\r\n"
				+ "offset :offset";
		NativeQuery<Job> query = openSession().createNativeQuery(SQL, Job.class)
				.setParameter("authorId", uid)
				.setParameter("limit", limit)
				.setParameter("offset", (page - 1) * limit);
		return query.getResultList();
	}
	
	public List<Job> get( Integer limit, Integer page){
		final String SQL = "SELECT * FROM job\r\n"
				+ "ORDER BY update_at desc\r\n"
				+ "LIMIT :limit";
		NativeQuery<Job> query = openSession().createNativeQuery(SQL, Job.class)
				.setParameter("limit", page * limit);
		return query.getResultList();
	}
	
	public Job getByIdAndUid(Integer jobId, String uid) {
		final String SQL = "SELECT * FROM job WHERE job_id = :jobId AND author_id = :uid";
		NativeQuery<Job> query = openSession().createNativeQuery(SQL,Job.class)
							.setParameter("jobId", jobId)
							.setParameter("uid", uid);
		return query.uniqueResult();
	}
	
	public String getAuthorById(Integer jobId) {
		final String SQL = "SELECT author_id FROM job WHERE job_id = :jobId";
		NativeQuery<String> query = openSession().createNativeQuery(SQL, String.class)
				.setParameter("jobId", jobId);
		return query.uniqueResult();
	}
	
	public List<Job> getOpenJob(){
		final String SQL = "SELECT * FROM xjob.job\r\n"
				+ "JOIN job_status ON job_status.job_id = job.job_id\r\n"
				+ "WHERE job_status.status_id = :statusId\r\n"
				+ "ORDER BY job.update_at desc";
		NativeQuery<Job> query = openSession().createNativeQuery(SQL, Job.class)
				.setParameter("statusId", BusinessConst.JOB_STATUS_OPENED);
		return query.getResultList();
	}
	
	public Integer count() {
		final String SQL = "SELECT * FROM job";
		NativeQuery<Job> query =openSession().createNativeQuery(SQL, Job.class);
		return query.getResultList().size();
	}
}
