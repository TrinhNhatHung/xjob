package com.xjob.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xjob.persistence.Role;
import com.xjob.persistence.User;
import com.xjob.service.RoleService;
import com.xjob.service.UserService;
import com.xjob.util.JwtUtil;
import com.xjob.util.ResponseUtil;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserApi {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;
	
	@GetMapping("/check-login")
	public ResponseEntity<?> checkLogin(@RequestParam(name = "uid") String uid){
		try {
			User user = userService.checkLogin(uid);
			if (user != null) {
				Map<String, Object> jwtClaim = new HashMap<>();
				jwtClaim.put("uid", user.getUid());
				jwtClaim.put("email", user.getEmail());
				jwtClaim.put("password", user.getPassword());
				String token = jwtUtil.createToken(jwtClaim);
				
				Map<String, Object> data = new HashMap<>();
				data.put("token", token);
				data.put("isAuthen", true);
				data.put("role", user.getRole().getRoleName());
				data.put("email", user.getEmail());
				data.put("lastName", user.getLastName());
				data.put("firstName", user.getLastName());		
				Map<String, Object> result = new HashMap<String, Object>();
				result = ResponseUtil.createResponse(true, data, null);
				return new ResponseEntity<Map<String,Object>>(result, HttpStatus.OK);
			} else {
				return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		}
		
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signupAccount(@RequestParam(name = "uid") String uid,
			@RequestParam(name = "firstName") String firstName,
			@RequestParam(name = "lastName") String lastName,
			@RequestParam(name = "email") String email,
			@RequestParam(name = "password") String password,
			@RequestParam(name = "role") String roleName){
		try {
			User user = new User();
			user.setUid(uid);
			user.setEmail(email);
			user.setPassword(password);
			user.setLastName(lastName);
			user.setFirstName(firstName);
			user.setVerified(false);
			user.setStatus(true);
			
			Role role = roleService.getByRoleName(roleName);
			user.setRole(role);
			boolean resultSignup = userService.signUp(user);
			if (resultSignup) {
				Map<String, Object> jwtClaim = new HashMap<>();
				jwtClaim.put("uid", user.getUid());
				jwtClaim.put("email", user.getEmail());
				jwtClaim.put("password", user.getPassword());
				String token = jwtUtil.createToken(jwtClaim);
				
				Map<String, Object> data = new HashMap<>();
				data.put("isSuccess", true);
				data.put("token", token);
				data.put("isAuthen", true);
				data.put("role", user.getRole().getRoleName());
				data.put("uid", user.getUid());
				data.put("email", user.getEmail());
				data.put("lastName", user.getLastName());
				data.put("firstName", user.getLastName());		
				Map<String, Object> result = new HashMap<String, Object>();
				result = ResponseUtil.createResponse(true, data, null);
				return new ResponseEntity<Map<String,Object>>(result, HttpStatus.OK);
			} else {
				Map<String, Object> data = new HashMap<>();
				data.put("isSuccess", false);
				data.put("isAuthen", false);	
				Map<String, Object> result = new HashMap<String, Object>();
				result = ResponseUtil.createResponse(true, data, null);
				return new ResponseEntity<Map<String,Object>>(result, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
