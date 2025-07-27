package com.traingo.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "train_seq")
    @SequenceGenerator(name = "train_seq", sequenceName = "train_sequence", initialValue = 1, allocationSize = 1)
    private long id;

    private String trainNumber;
    private String trainName;
    private String trainType;

    @ManyToOne
    @JoinColumn(name = "source_station_id")
    private Station source;

    @ManyToOne
    @JoinColumn(name = "destination_station_id")
    private Station destination;

    
    @ManyToMany
    @JoinTable(
        name = "train_coach_type",
        joinColumns = @JoinColumn(name = "train_id"),
        inverseJoinColumns = @JoinColumn(name = "coach_type_id"))
    @JsonIgnoreProperties("trains")
    private List<CoachType> coachTypes;

    @OneToMany(mappedBy = "train", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("train")
    private List<Schedule> schedules;
}
