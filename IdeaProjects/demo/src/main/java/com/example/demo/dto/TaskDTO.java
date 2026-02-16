package com.example.demo.dto;

import com.example.demo.model.Priority;
import com.example.demo.model.Status;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDTO {
    private String title;
    private String description;
    private Status status;
    private Priority priority;
    private LocalDateTime dueDate;
}