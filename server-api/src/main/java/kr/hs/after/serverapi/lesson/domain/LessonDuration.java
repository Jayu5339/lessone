package kr.hs.after.serverapi.lesson.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonDuration {
    private Long id;
    private Long lessonId;
    private Integer minutes;
}
