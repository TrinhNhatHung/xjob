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

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "proposal")
@Entity(name = "proposal")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Proposal {
	
	@EmbeddedId
	private Id proposalId;
	
	@Column(name = "letter")
	private String letter;
	
	@Column(name = "create_at")
	@CreationTimestamp
	private LocalDateTime createAt;
	
	@Column(name = "update_at")
	@UpdateTimestamp
	private LocalDateTime updateAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("uid")
	@JoinColumn(name = "uid", referencedColumnName = "uid")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("jobId")
	@JoinColumn(name = "job_id", referencedColumnName = "job_id")
	private Job job;

	public static class Id implements Serializable {

		private static final long serialVersionUID = -8949264031123316020L;
		
		@Column(name = "uid")
		private String uid;
		
		@Column(name = "job_id")
		private Integer jobId;
		
		@Column(name = "kind")
		private String kind;

		public String getUid() {
			return uid;
		}

		public void setUid(String uid) {
			this.uid = uid;
		}

		public Integer getJobId() {
			return jobId;
		}

		public void setJobId(Integer jobId) {
			this.jobId = jobId;
		}

		public String getKind() {
			return kind;
		}

		public void setKind(String kind) {
			this.kind = kind;
		}

	}
}
