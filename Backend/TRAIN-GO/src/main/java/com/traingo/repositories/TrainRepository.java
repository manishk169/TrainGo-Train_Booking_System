package com.traingo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.traingo.entities.Train;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {
    boolean existsByTrainNumber(String trainNumber);
}
