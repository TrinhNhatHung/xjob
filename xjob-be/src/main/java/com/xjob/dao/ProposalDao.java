package com.xjob.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.Proposal;

@Repository
public class ProposalDao extends EntityDao<Proposal>{
	
	public List<Proposal> getProposalListByJobId(Integer jobId, String...kinds){
		final String SQL = "SELECT * FROM proposal WHERE job_id = :jobId AND kind IN (:kinds)";
		NativeQuery<Proposal> query = openSession().createNativeQuery(SQL, Proposal.class)
					.setParameter("jobId", jobId)
					.setParameterList("kinds", kinds);
		return query.getResultList();
	}
}
