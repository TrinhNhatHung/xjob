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
}
