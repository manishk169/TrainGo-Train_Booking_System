package com.traingo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.traingo.entities.User;
import com.traingo.responsewrapper.MyResponseWrapper;
import com.traingo.services.UserService;

@RestController
@CrossOrigin("*")
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	MyResponseWrapper responseWrapper;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user)
	{
		return userService.registerUser(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user)
	{
		return userService.loginUser(user);
	}
	
}
