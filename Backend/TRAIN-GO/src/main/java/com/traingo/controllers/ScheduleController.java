package com.traingo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.traingo.entities.Schedule;
import com.traingo.responsewrapper.MyResponseWrapper;
import com.traingo.services.ScheduleService;

@RestController
@CrossOrigin("*")
public class ScheduleController {

	@Autowired
	ScheduleService scheduleService;
	
	@Autowired
	MyResponseWrapper responseWrapper;
	
	
	@PostMapping("/schedules/{trainId}")
	public ResponseEntity<?> addSchedule(@PathVariable long trainId, @RequestBody Schedule schedule)
	{
		return scheduleService.addSchedule(trainId, schedule);
	}
	
	
	@GetMapping("/schedules")
	public ResponseEntity<?> getAllSchedules()
	{
		return scheduleService.getAllSchedules();
	}
	
	@GetMapping("/schedules/{scheduleId}")
	public ResponseEntity<?> getScheduleById(@PathVariable long scheduleId)
	{
		return scheduleService.getScheduleById(scheduleId);
	}

	
	
	@GetMapping("/schedules/train/{trainId}")
	public ResponseEntity<?> getScheduleByTrain(@PathVariable long trainId)
	{
	  return scheduleService.getScheduleByTrain(trainId);	
	}

	@PutMapping("/schedules/{scheduleId}")
	private ResponseEntity<?> updateSchedule(@PathVariable long scheduleId, @RequestBody Schedule schedule)
	{
		return scheduleService.updateSchedule(scheduleId, schedule);
	}

	@DeleteMapping("/schedules/{scheduleId}")
	public ResponseEntity<?> deleteSchedule(@PathVariable long scheduleId)
	{
		return scheduleService.deleteSchedule(scheduleId);
	}

}
