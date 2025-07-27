package com.traingo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.traingo.entities.Passenger;

@Repository
public interface PassengerRepository  extends JpaRepository<Passenger, Long>{

}
