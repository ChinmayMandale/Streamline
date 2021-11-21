package com.uta.streamline.dto;

import com.uta.streamline.entities.Project;
import com.uta.streamline.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDetails {
    private Long commentId;
    private Timestamp timestamp;
    private String commentText;
    private User user;
    private Project project;
}
