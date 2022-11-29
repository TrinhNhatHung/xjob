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

@Entity(name = "user_history")
@Table(name = "user_history")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserHistory {
	
	@Id
	@Column(name = "user_history_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userHistoryId;
	
	@Column(name = "keyword")
	private String keyword;
	
	@Column(name = "kind")
	private String kind;
	
	@Column(name = "uid")
	private String uid;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "uid", referencedColumnName = "uid", insertable = false, updatable = false)
	 @JsonIgnore
	private User user;
}
