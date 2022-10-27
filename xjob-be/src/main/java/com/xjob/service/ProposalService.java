package com.xjob.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xjob.dao.ProposalDao;
import com.xjob.persistence.Proposal;

@Service
public class ProposalService {
	
	@Autowired
	private ProposalDao proposalDao;
	
	public List<Proposal> getProposalListByJobId(Integer jobId, String...kinds){
		return proposalDao.getProposalListByJobId(jobId, kinds);
	}
}
