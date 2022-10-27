package com.xjob.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xjob.constant.BusinessConst;
import com.xjob.persistence.Proposal;
import com.xjob.response.ProposalResponse;
import com.xjob.service.ProposalService;

@RestController
@CrossOrigin
@RequestMapping("/proposal")
public class ProposalApi {
	
	@Autowired
	private ProposalService proposalService;
	
	@Autowired
	private ProposalResponse proposalResponse;
	
	@GetMapping("/applicants")
	public ResponseEntity<?> getProposalListByJob(@RequestParam(name = "jobId") Integer jobId){
		try {
			List<Proposal> proposals = proposalService.getProposalListByJobId(jobId, BusinessConst.PROPOSAL_PROPOSAL);
			List<Map<String, Object>> data = proposalResponse.responseProposalList(proposals);
			Map<String,Object> result = new HashMap<>();
			result.put("proposals", data);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
