package com.traingo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.traingo.entities.Booking;
import com.traingo.entities.CoachType;
import com.traingo.entities.Passenger;
import com.traingo.entities.Schedule;
import com.traingo.entities.SeatAvailability;
import com.traingo.entities.User;
import com.traingo.repositories.BookingRepository;
import com.traingo.repositories.CoachTypeRepository;
import com.traingo.repositories.ScheduleRepository;
import com.traingo.repositories.SeatAvailabilityRepository;
import com.traingo.repositories.UserRepository;
import com.traingo.responsewrapper.MyResponseWrapper;

@Service
public class BookingService {

	@Autowired
	BookingRepository bookingRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	ScheduleRepository scheduleRepository;

	@Autowired
	CoachTypeRepository coachTypeRepository;

	@Autowired
	SeatAvailabilityRepository seatAvailabilityRepository;

	@Autowired
	MyResponseWrapper responseWrapper;

	public ResponseEntity<?> addBooking(long userId, long scheduleId, long coachTypeId, List<Passenger> passengers) {
		User user = userRepository.findById(userId).get();

		Schedule schedule = scheduleRepository.findById(scheduleId).get();

		CoachType coachtype = coachTypeRepository.findById(coachTypeId).get();

		SeatAvailability seatavaliability = seatAvailabilityRepository.findByScheduleAndCoachType(schedule, coachtype);

		int totalPassengers = passengers.size();

		if (seatavaliability.getAvailableSeats() < totalPassengers) {
			responseWrapper.setMessage("Not enough seats avaliable");
			return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
		}

		seatavaliability.setAvailableSeats(seatavaliability.getAvailableSeats() - totalPassengers);
		seatAvailabilityRepository.save(seatavaliability);

		Booking booking = new Booking();
		booking.setUser(user);
		booking.setSchedule(schedule);
		booking.setCoachType(coachtype);
		booking.setNumberOfPassengers(totalPassengers);
		booking.setTotalFare(totalPassengers * seatavaliability.getFare());
		booking.setBookingStatus("CONFIRMED");

		for (Passenger p : passengers) {
			p.setBooking(booking);
		}

		booking.setPassengers(passengers);

		Booking savedBooking = bookingRepository.save(booking);

		responseWrapper.setMessage("Booking SuccessFul");
		responseWrapper.setData(savedBooking);
		return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getAllBookings() {
		List<Booking> allBookings = bookingRepository.findAll();
		if (allBookings.isEmpty()) {
			responseWrapper.setMessage("No Bookings Found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		} else {
			responseWrapper.setMessage("Following Bookings Found");
			responseWrapper.setData(allBookings);
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		}
	}

	public ResponseEntity<?> getBookingsByUser(long userId) {
		List<Booking> bookings = bookingRepository.findByUserId(userId);

		if (!bookings.isEmpty()) {
			responseWrapper.setMessage("Following Bookings Found for User with userId " + userId);
			responseWrapper.setData(bookings);
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);

		} else {
			responseWrapper.setMessage("No Booking Found for User with userId " + userId);
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getBookingById(long bookingId) {
		Optional<Booking> booking = bookingRepository.findById(bookingId);
		if (booking.isPresent()) {
			responseWrapper.setMessage("Following booking found for booking id "+ bookingId);
			responseWrapper.setData(booking);
			return new ResponseEntity<>(responseWrapper, HttpStatus.FOUND);
		} else {
			responseWrapper.setMessage("No Booking Found for booking id " + bookingId);
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
		}
	}

}
