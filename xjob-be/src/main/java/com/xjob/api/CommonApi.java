package com.xjob.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xjob.service.CommonService;

@RestController
@CrossOrigin
@RequestMapping("/common")
public class CommonApi {
	
	@Autowired
	private CommonService commonService;
	
	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashboard(){
		try {
			Map<String,Object> map = commonService.getDashboard();
			return new ResponseEntity<Object>(map, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
