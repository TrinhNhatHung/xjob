package com.xjob.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Tuple;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.Skill;

@Repository
public class SkillDao extends EntityDao<Skill>{
	
	public List<Skill> getSkillList(){
		final String SQL = "SELECT * FROM skill";
		NativeQuery<Skill> query = openSession().createNativeQuery(SQL,Skill.class);
		return query.getResultList();
	}
	
	public Skill getBySkillName(String skillName) {
		final String SQL = "SELECT * FROM skill WHERE skill_name = :skillName";
		NativeQuery<Skill> query = openSession().createNativeQuery(SQL, Skill.class)
						.setParameter("skillName", skillName);
		return query.uniqueResult();
	}
	public List<Map<String, Object>> getMostSkill() {
		final String SQL = "SELECT job_skill.skill_id, count(job_id) AS COUNT_JOB, skill_name  FROM job_skill \r\n"
				+ "JOIN skill ON skill.skill_id = job_skill.skill_id\r\n"
				+ "GROUP BY skill_id ORDER BY COUNT_JOB desc limit :limit";
		NativeQuery<Tuple> query = openSession().createNativeQuery(SQL, Tuple.class)
							.setParameter("limit", 15);
		List<Tuple> result = query.getResultList();
		List<Map<String, Object>> mostSkill = new ArrayList<>();
		for (Tuple row : result) {
			String skillName = (String)row.get("skill_name");
			int countJob = ((BigInteger)row.get("COUNT_JOB")).intValue();
			Map<String, Object> map = new HashMap<>();
			map.put("skillName", skillName);
			map.put("count", countJob);
			mostSkill.add(map);
		}
		return mostSkill;
	}
	
}
