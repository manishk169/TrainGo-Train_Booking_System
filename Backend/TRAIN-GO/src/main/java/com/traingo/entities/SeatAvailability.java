package com.traingo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
public class SeatAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seat_avail_seq")
    @SequenceGenerator(name = "seat_avail_seq", sequenceName = "seat_avail_sequence", initialValue = 2001, allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    @JsonIgnoreProperties("seatAvailabilityList")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "coach_type_id")
    @JsonIgnoreProperties("trains")
    private CoachType coachType;

    private int availableSeats;

    private double fare;
}



