package com.traingo.entities;

import java.time.LocalDate;
import java.time.LocalTime;
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
public class Schedule {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "schedule_seq")
    @SequenceGenerator(name = "schedule_seq", sequenceName = "schedule_sequence", initialValue = 501, allocationSize = 1)
    private long id;

    private LocalDate travelDate;

    private LocalTime departureTime;

    private LocalTime arrivalTime;

    private double baseFare;

    @ManyToOne
    @JoinColumn(name = "train_id")
    @JsonIgnoreProperties("schedules")
    private Train train;
    
    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("schedule")
    private List<SeatAvailability> seatAvailabilityList;
}
