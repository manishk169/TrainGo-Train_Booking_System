	package com.traingo.entities;
	
	import java.util.List;
	
	import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
	
	import jakarta.persistence.CascadeType;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;
	import jakarta.persistence.OneToMany;
	import jakarta.persistence.SequenceGenerator;
	import lombok.Data;
	
	@Entity
	@Data
	public class Booking {
	
		@Id
		@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "booking_seq")
		@SequenceGenerator(name = "booking_seq", sequenceName = "booking_sequence", initialValue = 5001, allocationSize = 1)
		private Long id;
	
		@ManyToOne
		@JoinColumn(name = "user_id")
		@JsonIgnoreProperties("bookings") // ignore bookings list while serializing user
		private User user;
	
		@ManyToOne
		@JoinColumn(name = "schedule_id")
		private Schedule schedule;
	
		@ManyToOne
		@JoinColumn(name = "coach_type_id")
		@JsonIgnoreProperties({"trains"}) 
		private CoachType coachType;
	
		private int numberOfPassengers;
	
		private double totalFare;
	
		private String bookingStatus; // e.g., CONFIRMED, CANCELLED
	
		@OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
		@JsonIgnoreProperties("booking")  // prevent recursion
		private List<Passenger> passengers;
	
	
	}
