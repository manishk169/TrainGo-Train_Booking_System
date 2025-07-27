package com.traingo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.traingo.entities.Passenger;
import com.traingo.responsewrapper.MyResponseWrapper;
import com.traingo.services.BookingService;

@RestController
@CrossOrigin("*")
public class BookingController {

	@Autowired
	BookingService bookingService;
	
	@Autowired
	MyResponseWrapper responseWrapper;
	
	
	@PostMapping("/bookings/{userId}/{scheduleId}/{coachTypeId}")
	public ResponseEntity<?> addBooking(@PathVariable long userId, @PathVariable long scheduleId, @PathVariable long coachTypeId, @RequestBody List<Passenger> passengers)
	{
		return bookingService.addBooking(userId, scheduleId, coachTypeId, passengers);
	}
	
	@GetMapping("/bookings")
	public ResponseEntity<?> getAllBookings()
	{
		return bookingService.getAllBookings();
	}
	
	@GetMapping("/bookings/{userId}")
	public ResponseEntity<?> getBookingsByUser(@PathVariable long userId)
	{
		return bookingService.getBookingsByUser(userId);
	}
	
	@GetMapping("/bookings/viewticket/{bookingId}")
	public ResponseEntity<?> getBookingById(@PathVariable long bookingId) 
	{
		return bookingService.getBookingById(bookingId);
	}
	

}
