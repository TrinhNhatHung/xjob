package com.xjob.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xjob.persistence.Job;
import com.xjob.persistence.User;
import com.xjob.response.JobResponse;
import com.xjob.response.UserResponse;
import com.xjob.service.JobService;
import com.xjob.service.UserService;
import com.xjob.util.ResponseUtil;

@RestController
@CrossOrigin
@RequestMapping("/job")
public class JobApi {
	
	@Autowired
	private JobService jobService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JobResponse jobResponse;
	
	@Autowired
	private UserResponse userResponse;
	
	@GetMapping("/job-by-author")
	public ResponseEntity<?> getJobListByAuthor(@RequestParam(name = "limit", required = false) Integer limit,
			@RequestParam(name = "page", required = false) Integer page){
		String uid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			List<Job> jobs = jobService.getByAuthor(uid, limit, page);
			Map<String, Object> data = new HashMap<>();
			Map<String, Object> result = new HashMap<>();
			data.put("jobs", jobResponse.responseJobList(jobs));
			result = ResponseUtil.createResponse(true, data, null);
			return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/jobs")
	public ResponseEntity<?> getJobList(@RequestParam(name = "limit", required = false) Integer limit,
			@RequestParam(name = "page", required = false) Integer page){
		try {
			List<Job> jobs = jobService.get(limit, page);
			Map<String, Object> data = new HashMap<>();
			Map<String, Object> result = new HashMap<>();
			data.put("jobs", jobResponse.responseJobList(jobs));
			result = ResponseUtil.createResponse(true, data, null);
			return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/best-matchs")
	public ResponseEntity<?> getBestMatchJobList(@RequestParam(name = "limit", required = false) Integer limit,
			@RequestParam(name = "page", required = false) Integer page){
		
		if (page == null) {
			page = 1;
		}
		
		if (limit == null) {
			limit = 3;
		}
		String uid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			List<Job> jobs = jobService.getBestMatch(uid, page, limit);
			Map<String, Object> data = new HashMap<>();
			Map<String, Object> result = new HashMap<>();
			data.put("jobs", jobResponse.responseJobList(jobs));
			result = ResponseUtil.createResponse(true, data, null);
			return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/search")
	public ResponseEntity<?> getJobBySearch (@RequestParam(name = "search") String search,
										@RequestParam(name = "limit", required = false) Integer limit,
										@RequestParam(name = "page", required = false) Integer page){
		if (page == null) {
			page = 1;
		}
		
		if (limit == null) {
			limit = 10;
		}
		
		try {
			List<Job> jobs = jobService.getBySearch(search, page, limit);
			Map<String, Object> data = new HashMap<>();
			Map<String, Object> result = new HashMap<>();
			data.put("jobs", jobResponse.responseJobList(jobs));
			result = ResponseUtil.createResponse(true, data, null);
			return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/job-detail")
	public ResponseEntity<?> getJobDetail(@RequestParam(name = "jobId") Integer jobId){
		String uid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			Job job = jobService.getByIdAndUid(jobId, uid);
			if (job == null) {
				Map<String, Object> result = new HashMap<>();
				result.put("job", null);
				return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
			} else {
				Map<String, Object> data = jobResponse.responseJob(job);
				Map<String, Object> result = new HashMap<>();
				result.put("job", data);
				return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/post-job")
	public ResponseEntity<?> postJob(@RequestParam(name = "title") String title,
			@RequestParam(name = "detail") String detail,
			@RequestParam(name = "skills") List<String> skills,
			@RequestParam(name = "paymentKind") String paymentKind,
			@RequestParam(name = "price") Integer price,
			@RequestParam(name = "termClass", required = false) String termClass,
			@RequestParam(name = "termFrom", required = false) Integer termFrom,
			@RequestParam(name = "termTo", required = false) Integer termTo,
			@RequestParam(name = "hourPerWeek", required = false) Integer hourPerWeek){
		String uid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			Job job = new Job();
			job.setTitle(title);
			job.setDetail(detail);
			job.setPaymentKind(paymentKind);
			job.setPrice(price);
			job.setTermClass(termClass);
			job.setTermFrom(termFrom);
			job.setTermTo(termTo);
			job.setHourPerWeek(hourPerWeek);
			job.setHireAmount(0);
			job.setHiredAmount(0);
			User user = new User();
			user.setUid(uid);
			job.setAuthorId(user);
			Integer insertedJobId = jobService.postjob(job, skills);
			Map<String, Object> result = new HashMap<>();
			result.put("jobId", insertedJobId);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/hirings")
	public ResponseEntity<?> getHiringByJob(@RequestParam(name = "jobId") Integer jobId){
		try {
			List<User> users = userService.getHiredUserByJob(jobId);
			List<Map<String, Object>>data = userResponse.responseFreelancerInfoList(users);
			Map<String, Object> result = new HashMap<>();
			result.put("users", data);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
