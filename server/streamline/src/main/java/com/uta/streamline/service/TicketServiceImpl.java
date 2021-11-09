package com.uta.streamline.service;

import com.uta.streamline.dto.TicketDetails;
import com.uta.streamline.entities.Ticket;
import com.uta.streamline.enums.Priority;
import com.uta.streamline.enums.Status;
import com.uta.streamline.repository.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TicketServiceImpl {
    private final TicketRepository ticketRepository;

    public TicketDetails create(TicketDetails ticketDetails) {
        Ticket ticket = new Ticket();

        ticket.setAssignee(ticketDetails.getAssignee());
        ticket.setAssignedTo(ticketDetails.getAssignedTo());
        ticket.setCreateDate(ticketDetails.getCreateDate());
        ticket.setDescription(ticketDetails.getDescription());
        ticket.setDueDate(ticketDetails.getDueDate());
        ticket.setEstimatedTime(ticketDetails.getEstimatedTime());
        ticket.setActualTime(ticketDetails.getActualTime());
        ticket.setPriority(Priority.HIGH);
        ticket.setStatus(Status.OPEN);
        ticket.setSummary(ticketDetails.getSummary());

        Ticket createdTicket = ticketRepository.save(ticket);
        ticketDetails.setTicketId(createdTicket.getTicketId());
        return ticketDetails;
    }

    public TicketDetails createOrUpdate(TicketDetails ticketDetails) {
        Ticket ticket = null;
        if (!Objects.isNull(ticketDetails.getTicketId())) {
            ticket = ticketRepository.getById(ticketDetails.getTicketId());
        }
        else {
            ticket = new Ticket();
        }
        ticket.setAssignee(ticketDetails.getAssignee());
        ticket.setAssignedTo(ticketDetails.getAssignedTo());
        ticket.setCreateDate(ticketDetails.getCreateDate());
        ticket.setDescription(ticketDetails.getDescription());
        ticket.setDueDate(ticketDetails.getDueDate());
        ticket.setEstimatedTime(ticketDetails.getEstimatedTime());
        ticket.setActualTime(ticketDetails.getActualTime());
        ticket.setPriority(Priority.valueOf(ticketDetails.getPriority()));
        ticket.setStatus(Status.valueOf(ticketDetails.getStatus()));
        ticket.setSummary(ticketDetails.getSummary());

        Ticket createdTicket = ticketRepository.save(ticket);
        ticketDetails.setTicketId(createdTicket.getTicketId());
        return ticketDetails;
    }

    public List<TicketDetails> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        List<TicketDetails> ticketDetailsList = new ArrayList<>();
        for (Ticket ticket : tickets) {
            ticketDetailsList.add(mapTicketToTicketDetails(ticket));
        }
        return ticketDetailsList;
    }

    public List<TicketDetails> getTicketsByAssignee(Long userId) {
        Optional<List<Ticket>> ticketsOptional = ticketRepository.findTicketByAssignee(userId);
        List<TicketDetails> ticketDetailsList = new ArrayList<>();
        for (Ticket ticket : ticketsOptional.get()) {
            ticketDetailsList.add(mapTicketToTicketDetails(ticket));
        }
        return ticketDetailsList;
    }

    public List<TicketDetails> getTicketsByAssignedTo(Long userId) {
        Optional<List<Ticket>> ticketsOptional = ticketRepository.findTicketByAssignedTo(userId);
        List<TicketDetails> ticketDetailsList = new ArrayList<>();
        for (Ticket ticket : ticketsOptional.get()) {
            ticketDetailsList.add(mapTicketToTicketDetails(ticket));
        }
        return ticketDetailsList;
    }

    public TicketDetails getTicketByTicketId(Long ticketId) {
        Ticket ticket = ticketRepository.getById(ticketId);
        return mapTicketToTicketDetails(ticket);
    }

    public void deleteTicket(Long ticketId) {
        ticketRepository.deleteById(ticketId);
    }

    private TicketDetails mapTicketToTicketDetails(Ticket ticket) {
        TicketDetails ticketDetails = new TicketDetails();
        ticketDetails.setTicketId(ticket.getTicketId());
        ticketDetails.setActualTime(ticket.getActualTime());
        ticketDetails.setEstimatedTime(ticket.getEstimatedTime());
        ticketDetails.setAssignedTo(ticket.getAssignedTo());
        ticketDetails.setAssignee(ticket.getAssignee());
        ticketDetails.setPriority(ticket.getPriority().name());
        ticketDetails.setStatus(ticket.getStatus().name());
        ticketDetails.setDescription(ticket.getDescription());
        ticketDetails.setSummary(ticket.getSummary());
        ticketDetails.setDueDate(ticket.getDueDate());
        return ticketDetails;
    }
}
