package com.uta.streamline.service;

import com.uta.streamline.entities.Notification;
import com.uta.streamline.entities.Project;
import com.uta.streamline.entities.Ticket;
import com.uta.streamline.entities.User;
import com.uta.streamline.enums.NotificationType;
import com.uta.streamline.enums.Status;
import com.uta.streamline.repository.NotificationRepository;
import com.uta.streamline.repository.ProjectRepository;
import com.uta.streamline.repository.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class NotificationServiceImpl {
    private NotificationRepository notificationRepository;
    private CommentServiceImpl commentService;
    private TicketRepository ticketRepository;
    private ProjectRepository projectRepository;
    private UserServiceImpl userService;

    public void createNotification(NotificationType notificationType, String text, User user) {
        List<Notification> notificationList = notificationRepository.findByNotificationTypeAndUser(notificationType, user);
        if (!notificationExists(notificationList, text)) {
            Notification notification = new Notification();
            notification.setNotificationType(notificationType);
            notification.setCreateDate(new Date());
            notification.setNotificationText(text);
            notification.setUser(user);
            notificationRepository.save(notification);
        }
    }

    private boolean notificationExists(List<Notification> notificationList, String text) {
        for (Notification notification : notificationList) {
            if (notification.getNotificationText().equalsIgnoreCase(text)) {
                return true;
            }
        }
        return false;
    }

    public List<Notification> getNotificationsByUser(String userName) {
        User user = userService.findByUsername(userName);
        Project project = projectRepository.findById(user.getProjectId()).get();
        List<Ticket> tickets = ticketRepository.findTicketByAssignedTo(user).get();
        createApproachingDeadlineNotification(tickets, user);
        List<Notification> notificationList = notificationRepository.findByUser(user);
        return notificationList;
    }

    private void createApproachingDeadlineNotification(List<Ticket> tickets, User user) {
        for (Ticket ticket : tickets) {
            if ((ticket.getStatus().equals(Status.OPEN) || ticket.getStatus().equals(Status.IN_PROGRESS) ||
                    ticket.getStatus().equals(Status.TEST)) && approachingDeadline(ticket)) {
                String text = "Ticket due on " + ticket.getDueDate().toString() + " : Ticket "+
                        ticket.getTicketId() + " and with status " + ticket.getStatus();
                createNotification(NotificationType.DEADLINE, text, user);
            }
        }
    }

    private boolean approachingDeadline(Ticket ticket) {
        Date dueDate = ticket.getDueDate();
        Date date = new Date();
        long diffInMilli = Math.abs(date.getTime() - dueDate.getTime());
        long diff = TimeUnit.DAYS.convert(diffInMilli, TimeUnit.MILLISECONDS);
        if (diff <= 1) {
            return true;
        }
        return false;
    }
}
