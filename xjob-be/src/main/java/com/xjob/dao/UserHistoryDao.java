package com.xjob.dao;

import java.util.List;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.xjob.persistence.UserHistory;

@Repository
public class UserHistoryDao extends EntityDao<UserHistory> {

	public List<UserHistory> getByUid(String uid) {
		final String SQL = "SELECT * FROM user_history WHERE uid = :uid";
		NativeQuery<UserHistory> query = openSession().createNativeQuery(SQL, UserHistory.class)
					.setParameter("uid", uid);
		return query.getResultList();
	}
}
