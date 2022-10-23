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
}
