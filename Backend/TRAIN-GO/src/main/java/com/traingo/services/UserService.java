package com.traingo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.traingo.entities.User;
import com.traingo.repositories.UserRepository;
import com.traingo.responsewrapper.MyResponseWrapper;

@Service
public class UserService {


	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MyResponseWrapper responseWrapper;

    
    //register
	public ResponseEntity<?> registerUser(User user)
	{
		Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
		if(existingUser.isPresent())
		{
			responseWrapper.setMessage("User Already Exists!");
		    responseWrapper.setData(null);
		    return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
		}
		else {
			User savedUser =  userRepository.save(user);
			responseWrapper.setMessage("User Registered!");
		    responseWrapper.setData(savedUser);
		    return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
		}
		
	}
	
	
	//login
	public ResponseEntity<?> loginUser(User user)
	{
		Optional<User> existingUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		
		if(existingUser.isPresent())
		{
			responseWrapper.setData(existingUser);
			responseWrapper.setMessage("Logged In!");
			return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
		}
		else {
			responseWrapper.setData(null);
			responseWrapper.setMessage("User doesn't Exists!");
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}
	
}
