package com.xjob.dao;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Tuple;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.JobSkill;

@Repository
public class JobSkillDao extends EntityDao<JobSkill>{
	
	public void insertNativeQuery(JobSkill jobSkill) {
		final String SQL = "INSERT INTO job_skill(job_id, skill_id) VALUES (:jobId,:skillId)";
		NativeQuery<JobSkill> query = getCurrentSession().createNativeQuery(SQL, JobSkill.class)
					.setParameter("jobId", jobSkill.getJobSkillId().getJobId())
					.setParameter("skillId", jobSkill.getJobSkillId().getSkillId());
		query.executeUpdate();
	}
	
	public void deleteByJobId(Integer jobId) {
		final String SQL = "DELETE FROM job_skill WHERE job_id = :jobId";
		NativeQuery<JobSkill> query = getCurrentSession().createNativeQuery(SQL, JobSkill.class)
				.setParameter("jobId", jobId);
		query.executeUpdate();
	}
	
	public Map<Integer, Integer> getBestMatchMatrix(List<Integer> jobIds){
		final String SQL = "SELECT skill_id, COUNT(job_id) AS COUNT_JOB FROM job_skill WHERE job_id IN (:jobIds) GROUP BY skill_id";
		NativeQuery<Tuple> query = openSession().createNativeQuery(SQL, Tuple.class)
						.setParameter("jobIds", jobIds);
		List<Tuple> resultSet = query.getResultList();
		Map<Integer, Integer> bestMatchMatrix = new HashMap<>();
		for (Tuple tuple : resultSet) {
			Integer skillId = (Integer)tuple.get("skill_id");
			Integer weighing = ((BigInteger)tuple.get("COUNT_JOB")).intValue();
			bestMatchMatrix.put(skillId, weighing);
		}
		return bestMatchMatrix;
	}
}
