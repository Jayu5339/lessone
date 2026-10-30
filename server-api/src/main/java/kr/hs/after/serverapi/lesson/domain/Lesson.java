package kr.hs.after.serverapi.lesson.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Lesson {
    private Long id;
    private Long instructorId;
    private String name;
    private String description;
    private String bankName;
    private String accountHolder;
    private String accountNumber;
    private Integer periodWeeks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
