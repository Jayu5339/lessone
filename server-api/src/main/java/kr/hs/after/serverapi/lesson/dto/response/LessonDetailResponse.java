package kr.hs.after.serverapi.lesson.dto.response;

import java.time.LocalTime;
import java.util.List;

public record LessonDetailResponse(
        Long id,
        String name,
        String description,
        String instructorName,
        Integer periodWeeks,
        List<LocationItem> locations,
        List<PriceItem> prices,
        List<AvailabilityItem> availabilities,
        List<Integer> durations
) {
    public record LocationItem(String type, String region) {}
    public record PriceItem(String name, Integer price) {}
    public record AvailabilityItem(Integer dayOfWeek, LocalTime startTime, LocalTime endTime) {}
}
