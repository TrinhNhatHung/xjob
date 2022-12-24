package com.xjob.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.xjob.constant.BusinessConst;
import com.xjob.persistence.Job;
import com.xjob.persistence.JobSkill;
import com.xjob.persistence.JobStatus;
import com.xjob.persistence.JobStatus.Id;
import com.xjob.persistence.Proposal;
import com.xjob.persistence.Skill;

@Component
public class JobResponse {
	
	public List<Map<String, Object>> responseJobList(List<Job> jobs){
		List<Map<String, Object>> jobMapList = new ArrayList<>();
		for (Job job : jobs) {
			Map<String, Object> jobMap = convertJobToMap(job);
			jobMapList.add(jobMap);
		}
		return jobMapList;
	}
	
	public Map<String, Object> responseJob(Job job){
		Map<String,Object> jobMap = new HashMap<>();
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
		List<Skill> skills = new ArrayList<>();
		for(JobSkill jobSkill : job.getJobSkills()) {
			skills.add(jobSkill.getSkill());
		}
		jobMap.put("skills", skills);
		List<Proposal> proposals = job.getProposals();
		long proposalCount = proposals.stream()
				.filter(proposal -> BusinessConst.PROPOSAL_PROPOSAL.equals(proposal.getProposalId().getKind()))
				.count();
		jobMap.put("proposals", proposalCount);
		long hiredCount = proposals.stream()
				.filter(proposal -> BusinessConst.PROPOSAL_HIRED.equals(proposal.getProposalId().getKind()))
				.count();
		jobMap.put("hired", hiredCount);
		return jobMap;
	}
	
	private Map<String,Object> convertJobToMap (Job job){
		Map<String,Object> jobMap = new HashMap<>();
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
		List<Proposal> proposals = job.getProposals();
		long proposalCount = proposals.stream()
				.filter(proposal -> BusinessConst.PROPOSAL_PROPOSAL.equals(proposal.getProposalId().getKind()))
				.count();
		jobMap.put("proposals", proposalCount);
		long hiredCount = proposals.stream()
				.filter(proposal -> BusinessConst.PROPOSAL_HIRED.equals(proposal.getProposalId().getKind()))
				.count();
		jobMap.put("hired", hiredCount);
		List<JobStatus> jobStatusList = job.getJobStatus();
		JobStatus jobStatus = new JobStatus();
		Id id = new Id();
		id.setStatusId(0);
		jobStatus.setJobStatusId(id);
		for (JobStatus jobStatus2 : jobStatusList) {
			if (jobStatus.getJobStatusId().getStatusId() < jobStatus2.getJobStatusId().getStatusId()) {
				jobStatus = jobStatus2;
			}
		}
		try {
			jobMap.put("status", jobStatus.getStatus().getStatusName());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return jobMap;
	}
}
