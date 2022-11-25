package com.xjob.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.xjob.persistence.Experience;
import com.xjob.persistence.Skill;
import com.xjob.persistence.User;
import com.xjob.persistence.UserSkill;

@Component
public class UserResponse {
	
	public Map<String, Object> responseFreelancerInfo(User user){
		Map<String, Object> map = new HashMap<>();
		map.put("email", user.getEmail());
		map.put("firstName", user.getFirstName());
		map.put("lastName", user.getLastName());
		map.put("mainSkill", user.getMainSkill());
		map.put("introduction", user.getIntroduction());
		map.put("hourlyRate", user.getHourlyRate());
		List<Skill> skills = new ArrayList<>();
		for (UserSkill userSkill : user.getUserSkills()) {
			skills.add(userSkill.getSkill());
		}
		map.put("skills", skills);
		
		List<Experience> experiences = user.getExperiences();
		map.put("experiences", experiences);
		
		return map;
	}
}
