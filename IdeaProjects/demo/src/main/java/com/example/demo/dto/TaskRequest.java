package com.example.demo.dto;

import com.example.demo.model.Priority;
import com.example.demo.model.Status;
import java.time.LocalDateTime;

public record TaskRequest(
        String title,
        String description,
        Status status,
        Priority priority,
        LocalDateTime dueDate
) {}