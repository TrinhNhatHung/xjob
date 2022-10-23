package com.xjob.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.xjob.persistence.Job;
import com.xjob.persistence.JobSkill;

@Component
public class JobResponse {
	
	public List<Map<String, Object>> responseJobList(List<Job> jobs){
		List<Map<String, Object>> jobMapList = new ArrayList<>();
		for (Job job : jobs) {
			Map<String, Object> jobMap = new HashMap<>();
			jobMap.put("jobId", job.getJobId());
			jobMap.put("title", job.getTitle());
			jobMap.put("detail", job.getDetail());
			jobMap.put("hireAmount", job.getHireAmount());
			jobMap.put("hiredAmount", job.getHiredAmount());
			jobMap.put("hourPerWeek", job.getHourPerWeek());
			jobMap.put("paymentKind", job.getPaymentKind());
			jobMap.put("termClass", job.getTermClass());
			jobMap.put("termFrom", job.getTermFrom());
			jobMap.put("termTo", job.getTermTo());
			jobMap.put("price", job.getPrice());
			jobMap.put("createAt", job.getCreateAt());
			jobMap.put("updateAt", job.getUpdateAt());
			List<String> skills = new ArrayList<>();
			for(JobSkill jobSkill : job.getJobSkills()) {
				skills.add(jobSkill.getSkill().getSkillName());
			}
			jobMap.put("skills", skills);
			jobMapList.add(jobMap);
		}
		return jobMapList;
	}
}
