package kr.hs.after.serverapi.lesson.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class LessonAvailability {
    private Long id;
    private Long lessonId;
    private Integer dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
}
