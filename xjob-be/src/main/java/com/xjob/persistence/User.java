package com.xjob.persistence;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "user")
@Entity(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {
	@Id
	@Column(name = "uid")
	private String uid;

	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "main_skill")
	private String mainSkill;
	
	@Column(name = "introduction")
	private String introduction;
	
	@Column(name = "hourly_rate")
	private Integer hourlyRate;
	
	@Column(name = "status")
	private Boolean status;
	
	@Column(name = "verified")
	private Boolean verified;
	
	@Column(name = "verify_code")
	private String verifyCode;

	@CreationTimestamp
	@Column(name = "create_at")
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime createAt;
	
	@UpdateTimestamp
	@Column(name = "update_at")
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime updateAt;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id", referencedColumnName = "role_id")
	private Role role;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<UserSkill> userSkills;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<Experience> experiences;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<UserHistory> userHistories;
}
