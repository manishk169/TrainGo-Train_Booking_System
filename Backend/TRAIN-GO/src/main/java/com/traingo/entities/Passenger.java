package com.traingo.entities;

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
public class Passenger {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "passenger_seq")
    @SequenceGenerator(name = "passenger_seq", sequenceName = "passenger_sequence", initialValue = 9001, allocationSize = 1)
    private Long id;

    private String name;
    private int age;
    private String gender;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
