package com.uta.streamline.controller;

import com.uta.streamline.dto.TicketDetails;
import com.uta.streamline.service.TicketServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ticket")
@AllArgsConstructor
public class TicketController {
    private TicketServiceImpl ticketService;

    @PostMapping("/createOrUpdateTicket")
    public TicketDetails createOrUpdateTicket(@RequestBody TicketDetails ticketDetails) {
        return ticketService.createOrUpdate(ticketDetails);
    }

    @DeleteMapping("/deleteTicket/{ticketId}")
    public void deleteTicket(@PathVariable String ticketId) {
        ticketService.deleteTicket(Long.parseLong(ticketId));
    }

    @GetMapping("/getTicketDetails/{ticketId}")
    public TicketDetails getTicketDetails(@PathVariable String ticketId) {
        return ticketService.getTicketByTicketId(Long.parseLong(ticketId));
    }

    @GetMapping("/getTicketsByAssignee/{userId}")
    public List<TicketDetails> getTicketsByAssignee(@PathVariable String userId) {
        return ticketService.getTicketsByAssignee(Long.parseLong(userId));
    }

    @GetMapping("/getTicketsByAssignedTo/{userId}")
    public List<TicketDetails> getTicketsByAssignedTo(@PathVariable String userId) {
        return ticketService.getTicketsByAssignedTo(Long.parseLong(userId));
    }
}
