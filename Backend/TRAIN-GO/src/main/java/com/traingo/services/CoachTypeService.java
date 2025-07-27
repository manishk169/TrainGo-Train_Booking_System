package com.traingo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.traingo.entities.CoachType;
import com.traingo.repositories.CoachTypeRepository;
import com.traingo.responsewrapper.MyResponseWrapper;

@RestController
public class CoachTypeService {

	@Autowired
	CoachTypeRepository coachTypeRepository;

	@Autowired
	MyResponseWrapper responseWrapper;

	public ResponseEntity<?> addCoachType(CoachType coachType)
	{
		CoachType coachtype = coachTypeRepository.save(coachType);

		responseWrapper.setMessage("Following CoachType added : ");
		responseWrapper.setData(coachtype);
		return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getAllCoachTypes()
	{
		List<CoachType> allCoachTypes = coachTypeRepository.findAll();
		
		if(allCoachTypes.isEmpty())
		{
			responseWrapper.setMessage("No CoachTypes Found : ");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
		else {
			responseWrapper.setMessage("Following CoachTypes Found : ");
			   responseWrapper.setData(allCoachTypes);
			   return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
	}
	
	public ResponseEntity<?> getCoachTypeById(long coachTypeId)
	{
		Optional<CoachType> coachType = coachTypeRepository.findById(coachTypeId);
		if(coachType.isPresent())
		{
			responseWrapper.setMessage("Following CoachType Found : ");
			responseWrapper.setData(coachType);
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
		else {
			responseWrapper.setMessage("No CoachTypes Found : ");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}
	
	
}
