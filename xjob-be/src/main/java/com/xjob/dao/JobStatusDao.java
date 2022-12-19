package com.xjob.dao;

import org.springframework.stereotype.Repository;

import com.xjob.constant.BusinessConst;
import com.xjob.persistence.Job;
import com.xjob.persistence.JobStatus;
import com.xjob.persistence.JobStatus.Id;
import com.xjob.persistence.Status;

@Repository
public class JobStatusDao extends EntityDao<JobStatus>{
	
	public void closeJob(Integer jobId) {
		JobStatus jobStatus = new JobStatus();
		Job job = new Job();
		job.setJobId(jobId);
		jobStatus.setJob(job);
		Status status = new Status();
		status.setStatusId(BusinessConst.JOB_STATUS_CLOSE);
		jobStatus.setStatus(status);
		Id id = new Id();
		id.setJobId(jobId);
		id.setStatusId(BusinessConst.JOB_STATUS_CLOSE);
		jobStatus.setJobStatusId(id);
		super.insert(jobStatus);
	}
}
