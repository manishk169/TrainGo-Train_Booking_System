package com.traingo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.traingo.entities.CoachType;
import com.traingo.responsewrapper.MyResponseWrapper;
import com.traingo.services.CoachTypeService;

@RestController
@CrossOrigin("*")
public class CoachTypeController {
	
	@Autowired
	CoachTypeService coachTypeService;
	
	@Autowired
	MyResponseWrapper responseWrapper;

	@PostMapping("/coachtypes")
	public ResponseEntity<?> addCoachType(@RequestBody CoachType coachType) 
	{
		return coachTypeService.addCoachType(coachType);
	}
	
	@GetMapping("/coachtypes")
	public ResponseEntity<?> getAllCoachTypes()
	{
		return coachTypeService.getAllCoachTypes();
	}
	
	@GetMapping("/coachtypes/{coachTypeId}")
	public ResponseEntity<?> getCoachTypeById(@PathVariable long coachTypeId)
	{
		return coachTypeService.getCoachTypeById(coachTypeId);
	}
	

}
