package com.xjob.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xjob.dao.RoleDao;
import com.xjob.persistence.Role;

@Service
public class RoleService {

	@Autowired
	private RoleDao roleDao;
	
	public Role getByRoleName(String roleName) {
		return roleDao.getByRoleName(roleName);
	}
}
