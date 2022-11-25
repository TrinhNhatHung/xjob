package com.xjob.persistence;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "notification")
@Table(name = "notification")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Notification {
	
	@Id
	@Column(name = "notification_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer notificationId;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "uid_from")
	private String uidFrom;
	
	@Column(name = "uid_to")
	private String uidTo;
	
	@Column(name = "send_at")
	@CreationTimestamp
	private LocalDateTime sendAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "uid_from", referencedColumnName = "uid",insertable = false, updatable = false)
	private User userFrom;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "uid_to", referencedColumnName = "uid",insertable = false, updatable = false)
	private User userTo;
	
}
