package kr.hs.after.serverapi.lesson.dto.response;

import java.util.List;

public record LessonSearchResponse(
        Long id,
        String name,
        String description,
        String instructorName,
        List<String> regions,
        Integer minPrice
) {
}
