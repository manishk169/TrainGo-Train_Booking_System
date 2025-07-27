package com.traingo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.traingo.entities.CoachType;

@Repository
public interface CoachTypeRepository extends JpaRepository<CoachType, Long> {

}
