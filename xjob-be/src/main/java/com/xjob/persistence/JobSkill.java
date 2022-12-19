package com.xjob.persistence;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Table(name = "job_skill")
@Entity(name = "job_skill")
@Setter
@Getter
public class JobSkill {
	
	@EmbeddedId
	private Id jobSkillId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("jobId")
	@JoinColumn(name = "job_id", referencedColumnName = "job_id")
	private Job job;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("skillId")
	@JoinColumn(name = "skill_id", referencedColumnName = "skill_id")
	private Skill skill;

	public static class Id implements Serializable{

		private static final long serialVersionUID = 1701608452841764733L;

		@Column(name = "skill_id")
		private Integer skillId;
		
		@Column(name = "job_id")
		private Integer jobId;
		
		public Id() {
			super();
		}

		public Id(Integer skillId, Integer jobId) {
			super();
			this.skillId = skillId;
			this.jobId = jobId;
		}

		public Integer getSkillId() {
			return skillId;
		}

		public void setSkillId(Integer skillId) {
			this.skillId = skillId;
		}

		public Integer getJobId() {
			return jobId;
		}

		public void setJobId(Integer jobId) {
			this.jobId = jobId;
		}
		
	}
}
