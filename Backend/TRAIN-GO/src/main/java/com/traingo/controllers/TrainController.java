package com.traingo.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.traingo.entities.Train;
import com.traingo.responsewrapper.MyResponseWrapper;
import com.traingo.services.TrainService;

@CrossOrigin("*")
@RestController
public class TrainController {

   


	@Autowired
	TrainService trainService;
	
	@Autowired
	MyResponseWrapper responseWrapper;

	
	@PostMapping("/trains")
	public ResponseEntity<?> addTrain(@RequestBody Train train){
		return trainService.addTrain(train);
	}

	@GetMapping("/trains")
	public ResponseEntity<?> getAllTrains()
	{
		return trainService.getAllTrains();
	}
	
	@GetMapping("/trains/{trainId}")
	public ResponseEntity<?> getTrainById(@PathVariable long trainId)
	{
		return trainService.getTrainById(trainId);
	}
	
	
	@PutMapping("/trains/{trainId}/add-coachtype/{coachTypeId}")
	public ResponseEntity<?> addCoachToTrain(@PathVariable long trainId,  @PathVariable long coachTypeId)
	{
		return trainService.addCoachToTrain(trainId, coachTypeId);
	}
	
	@PutMapping("/trains/{trainId}")
	public ResponseEntity<?> updateTrain(@PathVariable long trainId, @RequestBody Train train)
	{
		return trainService.updateTrain(trainId, train);
	}
	
	
	@DeleteMapping("/trains/{trainId}")
	public ResponseEntity<?> deleteTrain(@PathVariable long trainId)
	{
		return trainService.deleteTrain(trainId);
	}
	
	
	//search trains 
	@GetMapping("/search")
	public ResponseEntity<?> searchTrains(
	        @RequestParam String source,
	        @RequestParam String destination,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate,
	        @RequestParam String coachType) {
	    
	    return trainService.searchTrains(source, destination, travelDate, coachType);
	}

}
