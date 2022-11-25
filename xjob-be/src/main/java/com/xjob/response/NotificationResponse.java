package com.xjob.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.xjob.persistence.Notification;

@Component
public class NotificationResponse {
	
	public List<Map<String,Object>> responseNotificationList(List<Notification> notifications){
		List<Map<String, Object>> result = new ArrayList<>();
		for (Notification notification : notifications) {
			Map<String, Object> map = responseNotification(notification);
			result.add(map);
		}
		return result;
	}
	
	public Map<String, Object> responseNotification(Notification notification){
		Map<String, Object> map = new HashMap<>();
		map.put("notificationId", notification.getNotificationId());
		map.put("content", notification.getContent());
		map.put("uidFrom", notification.getUidFrom());
		map.put("userFromLastName", notification.getUserFrom().getLastName());
		map.put("userFromFirstName", notification.getUserFrom().getFirstName());
		map.put("uidTo", notification.getUidTo());
		map.put("userToLastName", notification.getUserTo().getLastName());
		map.put("userToFirstName", notification.getUserTo().getFirstName());
		map.put("sendAt", notification.getSendAt());
		return map;
	}
}
