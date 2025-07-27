package com.traingo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.traingo.entities.CoachType;
import com.traingo.entities.Schedule;
import com.traingo.entities.SeatAvailability;


@Repository
public interface SeatAvailabilityRepository  extends JpaRepository<SeatAvailability, Long>{

	SeatAvailability findByScheduleAndCoachType(Schedule schedule, CoachType coachType);
}
