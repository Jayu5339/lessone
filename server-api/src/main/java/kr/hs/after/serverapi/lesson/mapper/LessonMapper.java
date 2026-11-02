package kr.hs.after.serverapi.lesson.mapper;

import kr.hs.after.serverapi.lesson.domain.Lesson;
import kr.hs.after.serverapi.lesson.domain.LessonAvailability;
import kr.hs.after.serverapi.lesson.domain.LessonDuration;
import kr.hs.after.serverapi.lesson.domain.LessonLocation;
import kr.hs.after.serverapi.lesson.domain.LessonPrice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LessonMapper {

    // insert
    void insertLesson(Lesson lesson);

    void insertLocation(LessonLocation location);

    void insertPrice(LessonPrice price);

    void insertAvailability(LessonAvailability availability);

    void insertDuration(LessonDuration duration);

    // lesson
    Lesson findById(Long id);

    List<Lesson> findByInstructorId(Long instructorId);

    String findInstructorNameById(Long memberId);

    // lesson details
    List<LessonLocation> findLocationsByLessonId(Long lessonId);

    List<LessonPrice> findPricesByLessonId(Long lessonId);

    List<LessonAvailability> findAvailabilitiesByLessonId(Long lessonId);

    List<LessonDuration> findDurationsByLessonId(Long lessonId);

    // lesson search
    List<Lesson> search(@Param("keyword") String keyword, @Param("size") int size);
}