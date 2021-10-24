package com.uta.streamline.dto;

import com.uta.streamline.entities.User;
import com.uta.streamline.enums.Priority;
import com.uta.streamline.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDetails {
    private long ticketId;
    private Date createDate;
    private int estimatedTime;
    private int actualTime;
    private String status;
    private Date dueDate;
    private User assignee;
    private User assignedTo;
    private String summary;
    private String description;
    private String priority;
}
