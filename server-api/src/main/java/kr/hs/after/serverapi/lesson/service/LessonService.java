package kr.hs.after.serverapi.lesson.service;

import kr.hs.after.serverapi.common.exception.ApiException;
import kr.hs.after.serverapi.lesson.domain.Lesson;
import kr.hs.after.serverapi.lesson.domain.LessonAvailability;
import kr.hs.after.serverapi.lesson.domain.LessonDuration;
import kr.hs.after.serverapi.lesson.domain.LessonLocation;
import kr.hs.after.serverapi.lesson.domain.LessonPrice;
import kr.hs.after.serverapi.lesson.dto.request.CreateLessonRequest;
import kr.hs.after.serverapi.lesson.dto.request.CreateLessonRequest.AvailabilityItem;
import kr.hs.after.serverapi.lesson.dto.response.CreateLessonResponse;
import kr.hs.after.serverapi.lesson.dto.response.LessonDetailResponse;
import kr.hs.after.serverapi.lesson.dto.response.LessonSearchResponse;
import kr.hs.after.serverapi.lesson.dto.response.LessonSummaryResponse;
import kr.hs.after.serverapi.lesson.mapper.LessonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonMapper lessonMapper;

    @Transactional
    public CreateLessonResponse create(Long memberId, CreateLessonRequest request) {
        validateAvailabilities(request.availabilities());

        Lesson lesson = new Lesson();
        lesson.setInstructorId(memberId);
        lesson.setName(request.name());
        lesson.setDescription(request.description());
        lesson.setBankName(request.bankName());
        lesson.setAccountHolder(request.accountHolder());
        lesson.setAccountNumber(request.accountNumber());
        lesson.setPeriodWeeks(request.periodWeeks() != null ? request.periodWeeks() : 4);
        lessonMapper.insertLesson(lesson);

        for (var item : request.locations().stream().distinct().toList()) {
            boolean studio = "STUDIO".equals(item.type());
            if (studio && (item.addressDetail() == null || item.addressDetail().isBlank())) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Address detail is required for STUDIO");
            }
            LessonLocation location = new LessonLocation();
            location.setLessonId(lesson.getId());
            location.setType(item.type());
            location.setRegion(item.region());
            location.setAddressDetail(studio ? item.addressDetail() : null);
            lessonMapper.insertLocation(location);
        }

        if (request.prices() != null) {
            for (var item : request.prices()) {
                LessonPrice price = new LessonPrice();
                price.setLessonId(lesson.getId());
                price.setName(item.name());
                price.setPrice(item.price());
                lessonMapper.insertPrice(price);
            }
        }

        for (var item : request.availabilities()) {
            LessonAvailability availability = new LessonAvailability();
            availability.setLessonId(lesson.getId());
            availability.setDayOfWeek(item.dayOfWeek());
            availability.setStartTime(item.startTime());
            availability.setEndTime(item.endTime());
            lessonMapper.insertAvailability(availability);
        }

        for (Integer minutes : request.durations().stream().distinct().toList()) {
            LessonDuration duration = new LessonDuration();
            duration.setLessonId(lesson.getId());
            duration.setMinutes(minutes);
            lessonMapper.insertDuration(duration);
        }

        return new CreateLessonResponse(lesson.getId());
    }

    public List<LessonSummaryResponse> getMyLessons(Long memberId) {
        return lessonMapper.findByInstructorId(memberId).stream()
                .map(l -> new LessonSummaryResponse(
                        l.getId(), l.getName(),
                        lessonMapper.findLocationsByLessonId(l.getId()).stream()
                                .map(loc -> new LessonSummaryResponse.LocationItem(
                                        loc.getType(), loc.getRegion(), loc.getAddressDetail()))
                                .toList()))
                .toList();
    }

    public List<LessonSearchResponse> search(String keyword, int size) {
        String k = keyword == null ? null : keyword.trim();
        int limit = Math.max(1, Math.min(size, 30));

        return lessonMapper.search(k, limit).stream()
                .map(l -> new LessonSearchResponse(
                        l.getId(),
                        l.getName(),
                        l.getDescription(),
                        lessonMapper.findInstructorNameById(l.getInstructorId()),
                        lessonMapper.findLocationsByLessonId(l.getId()).stream()
                                .map(LessonLocation::getRegion)
                                .distinct()
                                .toList(),
                        lessonMapper.findPricesByLessonId(l.getId()).stream()
                                .map(LessonPrice::getPrice)
                                .min(Integer::compare)
                                .orElse(null)))
                .toList();
    }

    // end must be after start, and ranges on the same day must not overlap
    private void validateAvailabilities(List<AvailabilityItem> items) {
        for (AvailabilityItem item : items) {
            if (!item.endTime().isAfter(item.startTime())) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "End time must be after start time");
            }
        }
        for (int day = 1; day <= 7; day++) {
            final int d = day;
            List<AvailabilityItem> sameDay = items.stream()
                    .filter(i -> i.dayOfWeek() == d)
                    .sorted(Comparator.comparing(AvailabilityItem::startTime))
                    .toList();
            for (int i = 1; i < sameDay.size(); i++) {
                if (sameDay.get(i).startTime().isBefore(sameDay.get(i - 1).endTime())) {
                    throw new ApiException(HttpStatus.BAD_REQUEST, "Availabilities on the same day must not overlap");
                }
            }
        }
    }

    public LessonDetailResponse getDetail(Long id) {
        Lesson lesson = lessonMapper.findById(id);
        if (lesson == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Lesson not found");
        }
        return new LessonDetailResponse(
                lesson.getId(),
                lesson.getName(),
                lesson.getDescription(),
                lessonMapper.findInstructorNameById(lesson.getInstructorId()),
                lesson.getPeriodWeeks(),
                lessonMapper.findLocationsByLessonId(id).stream()
                        .map(l -> new LessonDetailResponse.LocationItem(l.getType(), l.getRegion()))
                        .toList(),
                lessonMapper.findPricesByLessonId(id).stream()
                        .map(p -> new LessonDetailResponse.PriceItem(p.getName(), p.getPrice()))
                        .toList(),
                lessonMapper.findAvailabilitiesByLessonId(id).stream()
                        .map(a -> new LessonDetailResponse.AvailabilityItem(
                                a.getDayOfWeek(), a.getStartTime(), a.getEndTime()))
                        .toList(),
                lessonMapper.findDurationsByLessonId(id).stream()
                        .map(LessonDuration::getMinutes)
                        .toList()
        );
    }
}