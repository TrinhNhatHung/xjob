package com.xjob.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xjob.constant.BusinessConst;
import com.xjob.dao.ProposalDao;
import com.xjob.dao.UserDao;
import com.xjob.persistence.Proposal;
import com.xjob.persistence.User;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ProposalDao proposalDao;
	
	public List<User> get(Integer page, Integer limit){
		return userDao.get(page, limit);
	}
	
	public User getById(String uid) {
		return userDao.getById(User.class, uid);
	}
	
	public User checkLogin(String email, String password) {
		User user = userDao.getByEmail(email);
		if (user == null) {
			return null;
		}
		
		if (password.equals(user.getPassword())) {
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
	
	@Transactional
	public void updateFreelancerInfo(User user) {
		userDao.updateFreelancerInfo(user);
	}
	
	public List<User> getHiredUserByJob(Integer jobId){
		List<Proposal> proposals = proposalDao.getProposalListByJobId(jobId, BusinessConst.PROPOSAL_HIRED);
		List<User> hiredUsers = proposals.stream().map(Proposal::getUser).collect(Collectors.toList());
		return hiredUsers;
	}
	
	@Transactional
	public void updateStatus(String uid, Boolean status) {
		userDao.updateStatus(uid, status);
	}
}
