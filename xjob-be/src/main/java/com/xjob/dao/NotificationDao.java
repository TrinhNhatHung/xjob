package com.xjob.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.Notification;

@Repository
public class NotificationDao extends EntityDao<Notification>{
	
	public List<Notification> getByReceiverId(String uid, Integer limit, Integer page){
		String SQL = "SELECT * FROM notification\r\n"
				+ "WHERE uid_to = :uid\r\n"
				+ "ORDER BY send_at desc\r\n";
		if (limit != null && page != null) {
			SQL	+= "LIMIT :limit\r\n"
					+ "OFFSET :offset";
		}
		NativeQuery<Notification> query = openSession().createNativeQuery(SQL, Notification.class)
				.setParameter("uid", uid);
		if (limit != null && page != null) {
			query.setParameter("limit", limit)
			.setParameter("offset", (page - 1) * limit);
		}
		return query.getResultList();
	}
}
