package com.traingo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.traingo.entities.Station;

@Repository
public interface StationRepository extends JpaRepository<Station, Long>{

	Station findByStationNameIgnoreCase(String sourceName);

	
}
