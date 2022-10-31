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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xjob.persistence.Job;
import com.xjob.response.JobResponse;
import com.xjob.service.JobService;
import com.xjob.util.ResponseUtil;

@RestController
@CrossOrigin
@RequestMapping("/job")
public class JobApi {
	
	@Autowired
	private JobService jobService;
	
	@Autowired
	private JobResponse jobResponse;
	
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
}
