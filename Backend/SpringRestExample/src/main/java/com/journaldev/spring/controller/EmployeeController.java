package com.journaldev.spring.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.journaldev.spring.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the User service.
 */
@Controller
public class EmployeeController {
	
	private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	//Map to store employees, ideally we should use database
	Map<Integer, User> userData = new HashMap<Integer, User>();
	
	@RequestMapping(value = EmpRestURIConstants.DUMMY_user, method = RequestMethod.GET)
	public @ResponseBody
	User getDummyUser() {
		logger.info("Start getDummyEmployee");
		User emp = new User();
		emp.setId(9999);
		emp.setName("Dummy");
		emp.setProf(0);
		userData.put(9999, emp);
		return emp;
	}
	
	@RequestMapping(value = EmpRestURIConstants.GET_user, method = RequestMethod.GET)
	public @ResponseBody
	User getEmployee(@PathVariable("id") int UserId) {
		logger.info("Start getUser. ID="+UserId);
		
		return userData.get(UserId);
	}
	
	@RequestMapping(value = EmpRestURIConstants.GET_ALL_users, method = RequestMethod.GET)
	public @ResponseBody List<User> getAllUsers() {
		logger.info("Start getAllUsers.");
		List<User> users = new ArrayList<User>();
		Set<Integer> UserIdKeys = userData.keySet();
		for(Integer i : UserIdKeys){
			users.add(userData.get(i));
		}
		return users;
	}
	
	@RequestMapping(value = EmpRestURIConstants.CREATE_user, method = RequestMethod.POST)
	public @ResponseBody
	User createUser(@RequestBody User user) {
		logger.info("Start createUser.");
		user.setProf(new Date());
		userData.put(user.getId(), user);
		return user;
	}
	
	@RequestMapping(value = EmpRestURIConstants.DELETE_user, method = RequestMethod.PUT)
	public @ResponseBody
	User deleteUser(@PathVariable("id") int userId) {
		logger.info("Start deleteUser.");
		User user = userData.get(userId);
		userData.remove(userId);
		return user;
	}
	
}
