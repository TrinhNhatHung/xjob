package com.xjob.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.xjob.persistence.Proposal;

@Component
public class ProposalResponse {

	public List<Map<String,Object>> responseProposalList(List<Proposal> proposals){
		
		List<Map<String,Object>> result = new ArrayList<>();
		for(Proposal proposal : proposals) {
			Map<String,Object> map = new HashMap<>();
			map.put("uid", proposal.getUser().getUid());
			map.put("jobId", proposal.getProposalId().getJobId());
			map.put("firstName", proposal.getUser().getFirstName());
			map.put("lastName", proposal.getUser().getLastName());
			map.put("letter", proposal.getLetter());
			List<String> skills = proposal.getUser().getUserSkills().stream()
				.map(userSkill -> userSkill.getSkill().getSkillName())
				.collect(Collectors.toList());
			map.put("skills", skills);
			result.add(map);
		}
		return result;
	}
}
