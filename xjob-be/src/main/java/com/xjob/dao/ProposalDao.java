package com.xjob.dao;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Tuple;

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
	
	public List<Integer> getDistinctJobIdByUid(String uid){
		final String SQL = "SELECT DISTINCT job_id FROM proposal WHERE uid = :uid";
		NativeQuery<Tuple> query = openSession().createNativeQuery(SQL, Tuple.class)
									.setParameter("uid", uid);
		return query.getResultList().stream().map(tu -> (Integer)tu.get("job_id")).collect(Collectors.toList());
	}
	
}
