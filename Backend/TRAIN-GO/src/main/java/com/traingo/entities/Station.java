package com.traingo.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "station_seq")
    @SequenceGenerator(name = "station_seq", sequenceName = "station_sequence", initialValue = 401, allocationSize = 1)
    private long id;
    
    @Column(unique = true, nullable = false)
    private String stationCode;

    private String stationName;
}
