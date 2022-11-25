package com.xjob.dao;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.UserSkill;

@Repository
public class UserSkillDao  extends EntityDao<UserSkill>{

	public void deleteByUid(String uid){
		final String SQL = "DELETE FROM user_skill WHERE uid = :uid";
		NativeQuery<UserSkill> query = getCurrentSession().createNativeQuery(SQL, UserSkill.class)
				.setParameter("uid", uid);
		query.executeUpdate();
	}
	
	public void insert(String uid, Integer skillId) {
		final String SQL = "INSERT INTO user_skill(uid, skill_id) VALUES (:uid, :skillId)";
		NativeQuery<UserSkill> query = getCurrentSession().createNativeQuery(SQL, UserSkill.class)
				.setParameter("uid", uid)
				.setParameter("skillId", skillId);
		query.executeUpdate();
	}
}
