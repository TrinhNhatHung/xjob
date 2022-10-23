package com.xjob.persistence;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Table(name = "job_status")
@Entity(name = "job_status")
@Setter
@Getter
public class JobStatus {
	
	@EmbeddedId
	private Id jobStatusId;
	
	@Column(name = "create_at")
	@CreationTimestamp
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime createAt;
	
	@Column(name = "update_at")
	@UpdateTimestamp
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime updateAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("jobId")
	@JoinColumn(name = "job_id",referencedColumnName = "job_id")
	private Job job;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("statusId")
	@JoinColumn(name = "status_id",referencedColumnName = "status_id")
	private Status status;

	public static class Id implements Serializable {

		private static final long serialVersionUID = 1832919694139080251L;

		@Column(name = "job_id")
		private Integer jobId;

		@Column(name = "status_id")
		private Integer statusId;

		public Id() {
			super();
		}

		public Integer getJobId() {
			return jobId;
		}

		public void setJobId(Integer jobId) {
			this.jobId = jobId;
		}

		public Integer getStatusId() {
			return statusId;
		}

		public void setStatusId(Integer statusId) {
			this.statusId = statusId;
		}

	}
}
