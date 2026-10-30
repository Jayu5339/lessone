package kr.hs.after.serverapi.lesson.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonLocation {
    private Long id;
    private Long lessonId;
    private String type;
    private String region;
    private String addressDetail;
}
