package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.DayOfWeek;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusinessHour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idx;

    @ManyToOne
    private Store store;

    private String dayOfWeek;

    private String openAt;

    private String closeAt;

    private String reservationInterval;

    private boolean isDayOff;

}
