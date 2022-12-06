package com.xjob.util;

import org.springframework.stereotype.Component;

@Component
public class NotificationUtil {
	
	public String createProposalNotification(String uidFromLastName, String jobTitle) {
		return uidFromLastName + " muốn ứng tuyển vào dự án " + "\"" + jobTitle + "\"";
	}
	
	public String createHiringNotification (String uidFromLastName, String jobTitle) {
		return uidFromLastName + " đồng ý cho bạn  tham gia dự án " + "\"" + jobTitle + "\"";
	}
}
