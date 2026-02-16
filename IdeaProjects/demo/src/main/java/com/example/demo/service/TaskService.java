package com.example.demo.service;

import com.example.demo.dto.TaskRequest;
import com.example.demo.model.Task;
import com.example.demo.model.User;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Task> getMyTasks() {
        User user = getCurrentUser();
        return taskRepository.findByUser(user);
    }

    public Task createTask(TaskRequest request) {
        User user = getCurrentUser();
        Task task = Task.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status() != null ? request.status() : com.example.demo.model.Status.TODO)
                .priority(request.priority() != null ? request.priority() : com.example.demo.model.Priority.LOW)
                .dueDate(request.dueDate())
                .user(user)
                .build();
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        task.setTitle(request.title());
        task.setDescription(request.description());
        if (request.status() != null) task.setStatus(request.status());
        if (request.priority() != null) task.setPriority(request.priority());
        task.setDueDate(request.dueDate());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().equals(getCurrentUser())) {
            throw new RuntimeException("Unauthorized");
        }
        taskRepository.delete(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
