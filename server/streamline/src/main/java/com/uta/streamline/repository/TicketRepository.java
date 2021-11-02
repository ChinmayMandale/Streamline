package com.uta.streamline.repository;

import com.uta.streamline.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository <Ticket, Long> {
    Optional<List<Ticket>> findTicketByAssignedTo(Long userId);
    Optional<List<Ticket>> findTicketByAssignee(Long userId);
}