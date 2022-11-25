package com.xjob.dao;

import java.util.List;

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
	
}
