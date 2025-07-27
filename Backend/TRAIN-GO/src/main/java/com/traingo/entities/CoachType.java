package com.traingo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
public class CoachType {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "coach_type_seq")
    @SequenceGenerator(name = "coach_type_seq", sequenceName = "coach_type_sequence", initialValue = 301, allocationSize = 1)
    private Long id;

    @Column(unique = true, nullable = false)
    private String typeName;  

    private int totalSeats;

    @ManyToMany(mappedBy = "coachTypes")
    @JsonIgnoreProperties("coachTypes")
    private List<Train> trains;
}
