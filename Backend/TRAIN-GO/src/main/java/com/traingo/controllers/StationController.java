package com.traingo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.traingo.entities.Station;
import com.traingo.responsewrapper.MyResponseWrapper;
import com.traingo.services.StationService;


@RestController
@CrossOrigin("*")
public class StationController {
	
	@Autowired
	StationService stationService;
	
	@Autowired
	MyResponseWrapper responseWrapper;
	
	@PostMapping("/stations")
	public ResponseEntity<?> addStation(@RequestBody Station station)
	{
		return stationService.addStation(station);
	}
	
	@GetMapping("/stations")
	public ResponseEntity<?> getAllStations()
	{
		return stationService.getAllStations();
	}
	
	@GetMapping("/stations/{stationId}")
	public ResponseEntity<?> getStationById(@PathVariable long stationId)
	{
		return stationService.getStationById(stationId);
	}
	
	@DeleteMapping("/stations/{stationId}")
	public ResponseEntity<?> deleteStation(@PathVariable long stationId)
	{
		return stationService.deleteStation(stationId);
	}
		
}
