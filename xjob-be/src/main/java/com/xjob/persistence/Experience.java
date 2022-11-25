package com.xjob.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "experience")
@Entity(name = "experience")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Experience {

	@Id
	@Column(name = "experience_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer experienceId;

	@Column(name = "skill_name")
	private String skillName;

	@Column(name = "company_name")
	private String companyName;

	@Column(name = "detail")
	private String detail;

	@Column(name = "experience_from")
	private Integer experienceFrom;

	@Column(name = "experience_to")
	private Integer experienceTo;

	@Column(name = "uid")
	private String uid;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "uid", referencedColumnName = "uid", insertable = false, updatable = false)
	@JsonIgnore
	private User user;
}
