package com.traingo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.traingo.entities.CoachType;
import com.traingo.entities.Schedule;
import com.traingo.entities.SeatAvailability;
import com.traingo.entities.Train;
import com.traingo.repositories.ScheduleRepository;
import com.traingo.repositories.SeatAvailabilityRepository;
import com.traingo.repositories.TrainRepository;
import com.traingo.responsewrapper.MyResponseWrapper;

@Service
public class ScheduleService {


	@Autowired
	ScheduleRepository scheduleRepository;

	@Autowired
	TrainRepository trainRepository;

	@Autowired
	SeatAvailabilityRepository seatAvailabilityRepository;

	
	@Autowired
	MyResponseWrapper responseWrapper;



	public ResponseEntity<?> addSchedule(long trainId, Schedule schedule) {
		Optional<Train> train = trainRepository.findById(trainId);
		if (train.isPresent()) {
			schedule.setTrain(train.get()); // set the trainId to the train
			Schedule savedSchedule = scheduleRepository.save(schedule); // saved the schedule
			
		     // 🔁 Automatically create seat availability
	        initializeSeatAvailability(savedSchedule);
	        
			responseWrapper.setMessage("Schedule Added to the Train with TrainId : " + trainId);
			responseWrapper.setData(savedSchedule);
			return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
		} else {
			responseWrapper.setMessage("Train doesn't exists with TrainId : " + trainId);
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getAllSchedules() {
		List<Schedule> allSchedules = scheduleRepository.findAll();
		if (allSchedules.isEmpty()) {
			responseWrapper.setMessage("No Schedules found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		} else {
			responseWrapper.setMessage("Following Schedules Found ");
			responseWrapper.setData(allSchedules);
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
	}
	
	
	public ResponseEntity<?> getScheduleById(long scheduleId)
	{
		Optional<Schedule> schedule =  scheduleRepository.findById(scheduleId);
		if(schedule.isPresent())
		{
			responseWrapper.setMessage("Following Schedules Found ");
			responseWrapper.setData(schedule);
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
		else {
			responseWrapper.setMessage("No Schedules Found with Id "+ scheduleId);
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getScheduleByTrain(long trainId) {
		Optional<Train> train = trainRepository.findById(trainId);
		if (train.isPresent()) {
	        List<Schedule> schedules = scheduleRepository.findByTrain(train.get());
	        String trainName = train.get().getTrainName();

	        if (schedules.isEmpty()) {
	            responseWrapper.setMessage("Train found with ID: " + trainId + " and Name: " + trainName + 
	                ", but no schedule is assigned to it.");
	            responseWrapper.setData(null);
	            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	        } else {
	            responseWrapper.setMessage("All Schedules of " + trainName);
	            responseWrapper.setData(schedules);
	            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	        }
	    } else {
	        responseWrapper.setMessage("No train found with Train-ID: " + trainId);
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
	    }
	}
	
	
	
	//creates fare as per coach class or coachtype
	private void initializeSeatAvailability(Schedule schedule) {
	    Train train = schedule.getTrain();
	    double baseFare = schedule.getBaseFare();

	    for (CoachType coachType : train.getCoachTypes()) {
	        SeatAvailability seatAvailability = new SeatAvailability();
	        seatAvailability.setSchedule(schedule);
	        seatAvailability.setCoachType(coachType);
	        seatAvailability.setAvailableSeats(coachType.getTotalSeats());

	        String type = coachType.getTypeName().toLowerCase();
	        double fare;

	        if (type.contains("sleeper") || type.contains("sl")) {
	            fare = baseFare * 1.0;
	        } else if (type.contains("3a") || type.contains("ac 3")) {
	            fare = baseFare * 1.8;
	        } else if (type.contains("2a") || type.contains("ac 2")) {
	            fare = baseFare * 2.2;
	        } else if (type.contains("1a") || type.contains("first ac")) {
	            fare = baseFare * 2.8;
	        } else if (type.contains("2s") || type.contains("second sitting")) {
	            fare = baseFare * 0.6;
	        } else if (type.contains("cc") || type.contains("chair car")) {
	            fare = baseFare * 1.3;
	        } else {
	            fare = baseFare; 
	        }

	        seatAvailability.setFare(fare);
	        seatAvailabilityRepository.save(seatAvailability);
	    }
	}
	
	
	
	//update the schedule
	public ResponseEntity<?> updateSchedule(long scheduleId, Schedule schedule)
	{
	 	Optional<Schedule> existingSchedule = scheduleRepository.findById(scheduleId);
	 	
	 	if(existingSchedule.isEmpty())
	 	{
	 		responseWrapper.setData("Schedule with Id: " +scheduleId+" doesn't exists");
	 		responseWrapper.setData(null);
	 	   return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
	 	}
	 	else {
	 	    Schedule oldSchedule = existingSchedule.get();

	 	   Optional<Schedule> conflictingSchedule = scheduleRepository.findByTrainIdAndTravelDate(
	 	            oldSchedule.getTrain().getId(), schedule.getTravelDate());
	 	   
	 	  if (conflictingSchedule.isPresent() && conflictingSchedule.get().getId() != scheduleId) {
	 	        responseWrapper.setMessage("A schedule for this train already exists on this date.");
	 	        responseWrapper.setData(null);
	 	        return new ResponseEntity<>(responseWrapper, HttpStatus.CONFLICT);
	 	    }
	 		
	 		schedule.setId(scheduleId);
	 		schedule.setTrain(oldSchedule.getTrain());
	 		Schedule updatedSchedule = scheduleRepository.save(schedule);
	 		
	 		responseWrapper.setData("Schedule with Id: " +scheduleId+" Updated Successfully");
	 		responseWrapper.setData(updatedSchedule);
	 		return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
	 	}
	}
	
	//delete the train
	public ResponseEntity<?> deleteSchedule(long scheduleId)
	{
		
		Optional<Schedule> schedule =  scheduleRepository.findById(scheduleId);
		if(schedule.isPresent())
		{
			scheduleRepository.deleteById(scheduleId);
			responseWrapper.setMessage("Schedule with " +scheduleId+" Deleted!");
			responseWrapper.setData(schedule);
			return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
		}
		else {
			responseWrapper.setMessage("Schedule doesn't exists");
			responseWrapper.setData(schedule);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}
	
	
}
