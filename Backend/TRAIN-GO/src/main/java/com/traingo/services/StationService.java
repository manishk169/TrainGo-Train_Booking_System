package com.traingo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.traingo.entities.Station;
import com.traingo.repositories.StationRepository;
import com.traingo.responsewrapper.MyResponseWrapper;


@Service
public class StationService {


	@Autowired
	StationRepository stationRepository;
	
	@Autowired
	MyResponseWrapper responseWrapper;

	public ResponseEntity<?> addStation(Station station)
	{
		Station savedStation =  stationRepository.save(station);
		responseWrapper.setData(savedStation);
		responseWrapper.setMessage("Following station Added");
		return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
	}
	
	
	public ResponseEntity<?> getAllStations()
	{
		List<Station> allStations = stationRepository.findAll();
		
		if(allStations.isEmpty())
		{
			responseWrapper.setData(null);
			responseWrapper.setMessage("No Trains Found");
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
		else {
			responseWrapper.setData(allStations);
			responseWrapper.setMessage("Following Trains Found");
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
	}
	
	
	public ResponseEntity<?> getStationById(long stationId)
	{
		Optional<Station> station = stationRepository.findById(stationId);
		
		if(station.isPresent())
		{
	        responseWrapper.setData(station);
	        responseWrapper.setMessage("Train found with ID: " + stationId);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
		else {
	        responseWrapper.setData(null);
	        responseWrapper.setMessage("No Train found with ID: " + stationId);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> deleteStation(long stationId)
	{
		Optional<Station> station = stationRepository.findById(stationId);
		
		if(!station.isPresent())
		{
			responseWrapper.setMessage("No such Station Found with Id : "+ stationId);
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
		else {
			stationRepository.deleteById(stationId);
			responseWrapper.setMessage("Following Station deleted successfully!");
			responseWrapper.setData(station);
			return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
			
			
		}
		
	}
	
}
