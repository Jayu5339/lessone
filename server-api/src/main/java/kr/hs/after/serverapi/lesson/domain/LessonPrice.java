package kr.hs.after.serverapi.lesson.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonPrice {
    private Long id;
    private Long lessonId;
    private String name;
    private Integer price;
}
