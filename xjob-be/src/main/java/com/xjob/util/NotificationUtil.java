package com.xjob.util;

import org.springframework.stereotype.Component;

@Component
public class NotificationUtil {
	
	public String createProposalNotification(String uidFromLastName, String jobTitle) {
		return uidFromLastName + " want to apply for " + "\"" + jobTitle + "\"";
	}
}
