package com.traingo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.traingo.entities.CoachType;
import com.traingo.entities.Schedule;
import com.traingo.entities.Station;
import com.traingo.entities.Train;
import com.traingo.repositories.CoachTypeRepository;
import com.traingo.repositories.ScheduleRepository;
import com.traingo.repositories.StationRepository;
import com.traingo.repositories.TrainRepository;
import com.traingo.responsewrapper.MyResponseWrapper;

@Service
public class TrainService {

	@Autowired
	TrainRepository trainRepository;
	
	@Autowired
	CoachTypeRepository coachTypeRepository;
	
	@Autowired
	ScheduleRepository scheduleRepository;
	
	@Autowired
	StationRepository stationRepository;
	
	@Autowired
	MyResponseWrapper responseWrapper;
	
	public ResponseEntity<?> addTrain(Train train){
		
		Train savedTrain =trainRepository.save(train);
		responseWrapper.setMessage("Following Train added Successfully");
		responseWrapper.setData(savedTrain);
		return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
	}
	
	
	public ResponseEntity<?> getAllTrains()
	{
		List<Train> allTrains = trainRepository.findAll();
		
		if(allTrains.isEmpty())
		{
			responseWrapper.setMessage("No Trains Found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
		else {
			responseWrapper.setMessage("Following Trains Found");
			responseWrapper.setData(allTrains);
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
	}
	
	public ResponseEntity<?> getTrainById(long trainId)
	{
		Optional<Train> train = trainRepository.findById(trainId);
		
		if(train.isPresent())
		{
	        responseWrapper.setMessage("Train found with ID: " + trainId);
	        responseWrapper.setData(train);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
		else {
	        responseWrapper.setMessage("No Train found with ID: " + trainId);
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> updateTrain(long trainId, Train train)
	{
		Optional<Train> existingTrain = trainRepository.findById(trainId);
		if(existingTrain.isPresent())
		{
			train.setId(trainId);
			train.setSource(existingTrain.get().getSource());
			train.setDestination(existingTrain.get().getDestination());
			train.setCoachTypes(existingTrain.get().getCoachTypes());
			train.setSchedules(existingTrain.get().getSchedules());
			
			
			Train updatedTrain = trainRepository.save(train);
			responseWrapper.setMessage("Train Updated with ID: " + trainId);
	        responseWrapper.setData(updatedTrain);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
		}
		else {
			responseWrapper.setMessage("No Train found with ID: " + trainId);
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> deleteTrain(long trainId)
	{
		Optional<Train> train = trainRepository.findById(trainId);
		if(!(train.isPresent()))
		{
			responseWrapper.setMessage("Train doesn't exists");
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
		else {
			trainRepository.deleteById(trainId);
			responseWrapper.setMessage("Train deleted with trainId : " + trainId);
	        responseWrapper.setData(train);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
		}
	}
	
	public ResponseEntity<?> addCoachToTrain(long trainId, long coachTypeId)
	{
		Optional<Train> train = trainRepository.findById(trainId);
	    Optional<CoachType> coachType = coachTypeRepository.findById(coachTypeId);

	    if (train.isEmpty()) {
	        responseWrapper.setMessage("No Train found with ID: " + trainId);
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
	    }

	    if (coachType.isEmpty()) {
	        responseWrapper.setMessage("No Coach found with ID: " + coachTypeId);
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
	    }

	    Train Fetchedtrain = train.get();
	    CoachType Fetchedcoach = coachType.get();

	    // Checks if coach already exists in the train
	    if (!Fetchedtrain.getCoachTypes().contains(Fetchedcoach)) {
	    	Fetchedtrain.getCoachTypes().add(Fetchedcoach);
	        trainRepository.save(Fetchedtrain); 
	    }
	    
	    responseWrapper.setMessage("Coach ID " + coachTypeId + " successfully added to Train ID " + trainId);
	    responseWrapper.setData(train);
	    return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
	}
	
	
	
	
	//search trains functionality
	public ResponseEntity<?> searchTrains(String sourceName, String destinationName, LocalDate travelDate, String coachType) {
	    Station sourceStation = stationRepository.findByStationNameIgnoreCase(sourceName);
	    Station destinationStation = stationRepository.findByStationNameIgnoreCase(destinationName);

	    if (sourceStation == null || destinationStation == null) {
	        responseWrapper.setMessage("Invalid source or destination station name.");
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
	    }

	    String sourceCode = sourceStation.getStationCode();
	    String destinationCode = destinationStation.getStationCode();

	    List<Schedule> matchedSchedules;

	    if (coachType.equalsIgnoreCase("All") || coachType.equalsIgnoreCase("All Classes")) {
	        matchedSchedules = scheduleRepository
	            .findByTravelDateAndTrain_Source_StationCodeIgnoreCaseAndTrain_Destination_StationCodeIgnoreCase(
	                travelDate, sourceCode, destinationCode);
	    } else {
	        matchedSchedules = scheduleRepository
	            .findByTravelDateAndTrain_Source_StationCodeIgnoreCaseAndTrain_Destination_StationCodeIgnoreCaseAndTrain_CoachTypes_TypeNameIgnoreCase(
	                travelDate, sourceCode, destinationCode, coachType);
	    }

	    if (matchedSchedules.isEmpty()) {
	        responseWrapper.setMessage("No trains found for the given search criteria.");
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
	    }

	    responseWrapper.setMessage("Matching trains found.");
	    responseWrapper.setData(matchedSchedules);
	    return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}

}
