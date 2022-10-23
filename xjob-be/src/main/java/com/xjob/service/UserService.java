package com.xjob.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xjob.dao.UserDao;
import com.xjob.persistence.User;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	public User checkLogin(String uid) {
		User user = userDao.getById(User.class, uid);
		if (user == null) {
			return null;
		}
		
		if (user.getStatus()) {
			return user;
		}
		
		return null;
	}
	
	@Transactional
	public boolean signUp (User user) {
		User existingUser = null;
	    existingUser = userDao.getById(User.class, user.getUid());
	    if (existingUser == null) {
	    	existingUser = userDao.getByEmail(user.getEmail());
	    }
	    
	    if (existingUser != null) {
	    	return false;
	    }
	    
		try {
			userDao.insert(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	@Transactional
	public boolean updateVerifyCode (String uid, String verifyCode) {
		return userDao.updateVerifyCode(uid, verifyCode);
	}
	
	@Transactional
	public boolean verifyEmail (String uid, String verifyCode) {
		return userDao.updateVerifyStatus(uid, verifyCode);
	}
	
}
