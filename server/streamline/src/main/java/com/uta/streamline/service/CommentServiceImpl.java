package com.uta.streamline.service;

import com.uta.streamline.dto.CommentDetails;
import com.uta.streamline.entities.Comment;
import com.uta.streamline.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class CommentServiceImpl {
    private CommentRepository commentRepository;

    public CommentDetails createComment(CommentDetails commentDetails) {
        Comment comment = new Comment();
        comment.setCommentText(commentDetails.getCommentText());
        comment.setTicket(commentDetails.getTicket());
        comment.setTimestamp(commentDetails.getTimestamp());
        comment.setUser(commentDetails.getUser());
        commentDetails.setCommentId(commentRepository.save(comment).getCommentId());
        return commentDetails;
    }

    public CommentDetails updateComment(CommentDetails commentDetails) {
        Comment comment = new Comment();
        comment.setCommentText(commentDetails.getCommentText());
        comment.setTicket(commentDetails.getTicket());
        comment.setTimestamp(commentDetails.getTimestamp());
        comment.setUser(commentDetails.getUser());
        comment.setCommentId(commentDetails.getCommentId());
        commentRepository.save(comment);
        return commentDetails;
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
