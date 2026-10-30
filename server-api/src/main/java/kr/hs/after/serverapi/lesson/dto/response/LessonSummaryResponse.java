package kr.hs.after.serverapi.lesson.dto.response;

import java.util.List;

public record LessonSummaryResponse(Long id, String name, List<LocationItem> locations) {

    public record LocationItem(String type, String region, String addressDetail) {
    }
}
