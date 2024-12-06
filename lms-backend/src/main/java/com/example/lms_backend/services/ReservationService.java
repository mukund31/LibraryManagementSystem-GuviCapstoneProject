package com.example.lms_backend.services;

import com.example.lms_backend.models.Reservation;
import com.example.lms_backend.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation saveReservation(Reservation reservation) {
        reservation.setReservationDate(new Date());
        reservation.setStatus("Reserved");
        return reservationRepository.save(reservation);
    }
}
