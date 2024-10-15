package dev.mtk14m.quickstart.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Entity
public record Content(
        @Id
        Integer Id,
        @NotBlank
        String title,
        String desc,
        Status status,
        Type contentType,
        LocalDateTime dateCreated,
        LocalDateTime dateupdated,
        String url
){}