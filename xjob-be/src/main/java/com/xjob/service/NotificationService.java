package com.xjob.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xjob.dao.NotificationDao;
import com.xjob.persistence.Notification;

@Service
public class NotificationService {

	@Autowired
	private NotificationDao notificationDao;

	public List<Notification> getByReceiverId(String uid, Integer limit, Integer page) {
		return notificationDao.getByReceiverId(uid, limit, page);
	}
	
	@Transactional
	public void insert(Notification notification) {
		notificationDao.insert(notification);
	}
}
