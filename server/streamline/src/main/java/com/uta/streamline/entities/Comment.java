package com.uta.streamline.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    private Timestamp timestamp;
    private String commentText;
    @ManyToOne
    @JoinColumn (name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn (name = "ticket_id", nullable = false)
    private Ticket ticket;
}
