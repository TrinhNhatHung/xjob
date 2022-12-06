package com.xjob.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xjob.constant.BusinessConst;
import com.xjob.persistence.Job;
import com.xjob.persistence.Notification;
import com.xjob.persistence.Proposal;
import com.xjob.persistence.Proposal.Id;
import com.xjob.persistence.User;
import com.xjob.response.ProposalResponse;
import com.xjob.service.JobService;
import com.xjob.service.NotificationService;
import com.xjob.service.ProposalService;
import com.xjob.service.UserService;
import com.xjob.util.NotificationUtil;

@RestController
@CrossOrigin
@RequestMapping("/proposal")
public class ProposalApi {
	
	@Autowired
	private ProposalService proposalService;
	
	@Autowired
	private ProposalResponse proposalResponse;
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private JobService jobService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private NotificationUtil notificationUtil;
	
	@Autowired
    private SimpMessagingTemplate messagingTemplate;
	
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
	
	@PostMapping("/post-proposal")
	public ResponseEntity<?> postProposal (@RequestParam(name = "letter") String letter,
			@RequestParam(name = "jobId") Integer jobId){
		String uid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			Proposal proposal = new Proposal();
			Id proposalId = new Id();
			proposalId.setUid(uid);
			proposalId.setJobId(jobId);
			proposalId.setKind(BusinessConst.PROPOSAL_PROPOSAL);
			proposal.setProposalId(proposalId);
			proposal.setLetter(letter);
			
			Job job = new Job();
			job.setJobId(jobId);
			User user =  new User();
			user.setUid(uid);
			proposal.setJob(job);
			proposal.setUser(user);
			
			proposalService.insert(proposal);
			
			Notification notification = new Notification();
			notification.setUidFrom(uid);
			job = jobService.getById(jobId);
			notification.setUidTo(job.getAuthorId().getUid());
			user = userService.getById(uid);
			String content = notificationUtil.createProposalNotification(user.getLastName(), job.getTitle());
			notification.setContent(content);
			notificationService.insert(notification);
			
			messagingTemplate.convertAndSend("/topic/notifications/" + job.getAuthorId().getUid(), content);
			return new ResponseEntity<Object>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/hiring")
	public ResponseEntity<?> hiring(@RequestParam(name = "uid") String uid,
			@RequestParam(name = "letter") String letter,
			@RequestParam(name = "jobId") Integer jobId){
		String uidFrom = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			Proposal proposal = new Proposal();
			Id proposalId = new Id();
			proposalId.setUid(uid);
			proposalId.setJobId(jobId);
			proposalId.setKind(BusinessConst.PROPOSAL_HIRED);
			proposal.setProposalId(proposalId);
			proposal.setLetter(letter);
			
			Job job = new Job();
			job.setJobId(jobId);
			User user =  new User();
			user.setUid(uid);
			proposal.setJob(job);
			proposal.setUser(user);
			
			proposalService.insert(proposal);
			
			Notification notification = new Notification();
			notification.setUidFrom(uidFrom);
			notification.setUidTo(uid);
			user = userService.getById(uidFrom);
			job = jobService.getById(jobId);
			String content = notificationUtil.createHiringNotification(user.getLastName(), job.getTitle());
			notification.setContent(content);
			notificationService.insert(notification);
			
			messagingTemplate.convertAndSend("/topic/notifications/" + uid, content);
			return new ResponseEntity<Object>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
