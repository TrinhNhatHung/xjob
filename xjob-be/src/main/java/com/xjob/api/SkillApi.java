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
import org.springframework.web.bind.annotation.RestController;

import com.xjob.persistence.Skill;
import com.xjob.service.SkillService;

@RestController
@CrossOrigin
@RequestMapping("/skill")
public class SkillApi {
	
	@Autowired
	private SkillService skillService;
	
	@GetMapping("/popular-skills")
	public ResponseEntity<?> getPopularSkills(){
		try {
			List<Skill> skills = skillService.getSkillList();
			Map<String, Object> data = new HashMap<>();
			data.put("skills", skills);
			return new ResponseEntity<Object>(data,HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
