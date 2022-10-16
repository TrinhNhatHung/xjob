package com.xjob.dao;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.Role;

@Repository
public class RoleDao extends EntityDao<RoleDao>{
	
	public Role getByRoleName(String roleName) {
		final String SQL = "SELECT * FROM role WHERE role_name = :roleName";
		NativeQuery<Role> query =  openSession().createNativeQuery(SQL, Role.class).setParameter("roleName", roleName);
		return query.uniqueResult();
	}
}
