package com.xjob.dao;

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
}
