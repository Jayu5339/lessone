package kr.hs.after.serverapi.lesson.dto.request;


import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalTime;
import java.util.List;

public record CreateLessonRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name must be 100 characters or less")
        String name,

        @NotBlank(message = "Description is required")
        @Size(max = 2000, message = "Description must be 2000 characters or less")
        String description,

        @NotBlank(message = "Bank name is required")
        @Size(max = 30, message = "Bank name must be 30 characters or less")
        String bankName,

        @NotBlank(message = "Account holder is required")
        @Size(max = 50, message = "Account holder must be 50 characters or less")
        String accountHolder,

        @NotBlank(message = "Account number is required")
        @Pattern(regexp = "^[0-9-]{8,30}$", message = "Account number must be digits and hyphens")
        String accountNumber,

        @Min(value = 1, message = "Period weeks must be at least 1")
        @Max(value = 52, message = "Period weeks must be 52 or less")
        Integer periodWeeks,

        @NotEmpty(message = "At least one location is required")
        @Valid
        List<LocationItem> locations,

        @Valid
        List<PriceItem> prices,

        @NotEmpty(message = "At least one availability is required")
        @Valid
        List<AvailabilityItem> availabilities,

        @NotEmpty(message = "At least one duration is required")
        List<@NotNull @Min(value = 10, message = "Duration must be at least 10 minutes")
        @Max(value = 480, message = "Duration must be 480 minutes or less") Integer> durations
) {
    public record LocationItem(
            @NotBlank(message = "Location type is required")
            @Pattern(regexp = "^(STUDIO|VISIT)$", message = "Location type must be STUDIO or VISIT")
            String type,

            @NotBlank(message = "Region is required")
            @Size(max = 100, message = "Region must be 100 characters or less")
            String region,

            @Size(max = 200, message = "Address detail must be 200 characters or less")
            String addressDetail
    ) {
    }

    public record PriceItem(
            @NotBlank(message = "Price name is required")
            @Size(max = 50, message = "Price name must be 50 characters or less")
            String name,

            @NotNull(message = "Price is required")
            @Min(value = 0, message = "Price must be 0 or more")
            Integer price
    ) {
    }

    public record AvailabilityItem(
            @NotNull(message = "Day of week is required")
            @Min(value = 1, message = "Day of week must be 1 (Mon) to 7 (Sun)")
            @Max(value = 7, message = "Day of week must be 1 (Mon) to 7 (Sun)")
            Integer dayOfWeek,

            @NotNull(message = "Start time is required")
            LocalTime startTime,

            @NotNull(message = "End time is required")
            LocalTime endTime
    ) {
    }
}
