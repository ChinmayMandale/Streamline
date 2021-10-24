package com.uta.streamline.entities;

import com.uta.streamline.enums.Priority;
import com.uta.streamline.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    private Date createDate;
    private int estimatedTime;
    private int actualTime;
    @Enumerated (EnumType.STRING)
    private Status status;
    private Date dueDate;
    @OneToOne
    @JoinColumn (name = "userId")
    private User assignee;
    @OneToOne
    @JoinColumn (name = "userId")
    private User assignedTo;
    private String summary;
    private String description;
    @Enumerated (EnumType.STRING)
    private Priority priority;
}
