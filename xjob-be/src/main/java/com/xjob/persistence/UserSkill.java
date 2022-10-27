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

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "user_skill")
@Entity(name = "user_skill")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserSkill {

	@EmbeddedId
	private Id userSkillId;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("skillId")
	@JoinColumn(name = "skill_id", referencedColumnName = "skill_id")
	private Skill skill;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("uid")
	@JoinColumn(name = "uid", referencedColumnName = "uid")
	private User user;

	public static class Id implements Serializable {

		private static final long serialVersionUID = 6234863104621942768L;
		@Column(name = "uid")
		private String uid;
		@Column(name = "skill_id")
		private Integer skillId;

		public Id() {
			super();
		}

		public Id(String uid, Integer skillId) {
			super();
			this.uid = uid;
			this.skillId = skillId;
		}

		public String getUid() {
			return uid;
		}

		public void setUid(String uid) {
			this.uid = uid;
		}

		public Integer getSkillId() {
			return skillId;
		}

		public void setSkillId(Integer skillId) {
			this.skillId = skillId;
		}

	}
}
