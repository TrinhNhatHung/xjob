package com.xjob.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

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
				+ "LIMIT :limit\r\n"
				+ "offset :offset";
		NativeQuery<Job> query = openSession().createNativeQuery(SQL, Job.class)
				.setParameter("limit", limit)
				.setParameter("offset", (page - 1) * limit);
		return query.getResultList();
	}
}