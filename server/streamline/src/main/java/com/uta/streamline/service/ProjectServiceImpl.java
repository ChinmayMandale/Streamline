package com.uta.streamline.service;

import com.uta.streamline.dto.ProjectDetails;
import com.uta.streamline.entities.Project;
import com.uta.streamline.entities.Ticket;
import com.uta.streamline.entities.User;
import com.uta.streamline.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl {
    private ProjectRepository projectRepository;

    public ProjectDetails createProject(ProjectDetails projectDetails) {
        Project project = new Project();
        project.setProjectName(projectDetails.getProjectName());
        projectDetails.setProjectId(projectRepository.save(project).getProjectId());
        return projectDetails;
    }

    public ProjectDetails updateProject(ProjectDetails projectDetails) {
        Project project = projectRepository.getById(projectDetails.getProjectId());
        project.setProjectName(projectDetails.getProjectName());
        project.setTickets(projectDetails.getTickets());
        project.setUsers(projectDetails.getUsers());
        projectRepository.save(project);
        return projectDetails;
    }
    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectByProjectName(String projectName) {
        return projectRepository.findByProjectName(projectName);
    }

    public Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId).get();
    }

    public List<User> getUsersByProjectId(Long projectId) {
        Optional<Project> optional = projectRepository.findById(projectId);
        return optional.get().getUsers();
    }

    public List<Ticket> getTicketsByProjectId(Long projectId) {
        Optional<Project> optional = projectRepository.findById(projectId);
        return optional.get().getTickets();
    }
}
