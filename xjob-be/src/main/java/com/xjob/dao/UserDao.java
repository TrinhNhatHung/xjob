package com.xjob.dao;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.User;

@Repository
public class UserDao extends EntityDao<User>{
	
	public User getByEmail (String email) {
		final String SQL = "SELECT * FROM user WHERE email = :email";
		NativeQuery<User> query = openSession().createNativeQuery(SQL, User.class).setParameter("email", email);
		return query.uniqueResult();
	}
	
	public boolean updateVerifyStatus(String uid, String verifyCode) {
		final String SQL = "UPDATE user SET verified = 1 WHERE uid =:uid AND verify_code = :verifyCode";
		NativeQuery<User> query = getCurrentSession().createNativeQuery(SQL, User.class)
				.setParameter("uid", uid)
				.setParameter("verifyCode", verifyCode);
		int result = query.executeUpdate();
		return result > 0;
	}
	
	public boolean updateVerifyCode(String uid, String verifyCode) {
		final String SQL = "UPDATE user SET verify_code = :verifyCode WHERE uid =:uid";
		NativeQuery<User> query = getCurrentSession().createNativeQuery(SQL, User.class)
				.setParameter("verifyCode", verifyCode)
				.setParameter("uid", uid);
		int result = query.executeUpdate();
		return result > 0;
	}
	
	public void updateFreelancerInfo(User user) {
		String SQL = "UPDATE user SET ";
		if (user.getFirstName() != null) {
			SQL += "first_name = :firstName,";
		}
		
		if (user.getLastName() != null) {
			SQL += "last_name = :lastName,";
		}
		
		if (user.getMainSkill() != null) {
			SQL += "main_skill = :mainSkill,";
		}
		
		if (user.getIntroduction() != null) {
			SQL += "introduction = :introduction,";
		}
		
		if (user.getHourlyRate() != null) {
			SQL += "hourly_rate = :hourlyRate,";
		}
		
		SQL = SQL.substring(0, SQL.length() - 1);
		
		SQL += " WHERE uid = :uid";
		
		NativeQuery<User> query = getCurrentSession().createNativeQuery(SQL, User.class);
		
		if (user.getFirstName() != null) {
			query.setParameter("firstName", user.getFirstName());
		}
		
		if (user.getLastName() != null) {
			query.setParameter("lastName", user.getLastName());
		}
		
		if (user.getMainSkill() != null) {
			query.setParameter("mainSkill", user.getMainSkill());
		}
		
		if (user.getIntroduction() != null) {
			query.setParameter("introduction", user.getIntroduction());
		}
		
		if (user.getHourlyRate() != null) {
			query.setParameter("hourlyRate", user.getHourlyRate());
		}
		
		query.setParameter("uid", user.getUid());
		query.executeUpdate();
	}
}
