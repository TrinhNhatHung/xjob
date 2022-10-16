package com.xjob.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.xjob.dao.UserDao;
import com.xjob.persistence.User;

@Service
public class UserDetailServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
		User user = userDao.getById(User.class, uid);
		if (user == null) {
			return null;
		}
		List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(user.getRole().getRoleName()));
		return new org.springframework.security.core.userdetails.User(user.getUid(), null, roles);
	}

}
