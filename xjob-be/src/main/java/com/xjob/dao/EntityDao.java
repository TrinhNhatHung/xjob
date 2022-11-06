package com.xjob.dao;

import java.io.Serializable;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EntityDao<T> {

	@Autowired
	private SessionFactory sessionFactory;

	public Session openSession() {
		return sessionFactory.openSession();
	}

	public Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	public T getById(Class<T> clazz, Serializable id) {
		return openSession().get(clazz, id);
	}

	public void delete(T t) {
		getCurrentSession().delete(t);
	}
	
	public void insertOrUpdate(T t) {
		getCurrentSession().saveOrUpdate(t);
	}
	
	public Serializable insert(T t) {
		return getCurrentSession().save(t);
	}
}
