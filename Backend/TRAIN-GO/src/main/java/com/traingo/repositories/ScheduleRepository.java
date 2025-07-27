package com.traingo.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.traingo.entities.Schedule;
import com.traingo.entities.Train;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByTrain(Train train);
    
    Optional<Schedule> findByTrainIdAndTravelDate(Long trainId, LocalDate travelDate);


    // For "All" or "All Classes"
    List<Schedule> findByTravelDateAndTrain_Source_StationCodeIgnoreCaseAndTrain_Destination_StationCodeIgnoreCase(
        LocalDate travelDate, String source, String destination
    );

    // When coach type is selected (e.g., SLEEPER, 3A, etc.)
    List<Schedule> findByTravelDateAndTrain_Source_StationCodeIgnoreCaseAndTrain_Destination_StationCodeIgnoreCaseAndTrain_CoachTypes_TypeNameIgnoreCase(
        LocalDate travelDate, String source, String destination, String coachType
    );
    
    
}
