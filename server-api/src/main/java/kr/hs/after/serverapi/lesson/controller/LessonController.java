package kr.hs.after.serverapi.lesson.controller;

import jakarta.validation.Valid;
import kr.hs.after.serverapi.lesson.dto.request.CreateLessonRequest;
import kr.hs.after.serverapi.lesson.dto.response.CreateLessonResponse;
import kr.hs.after.serverapi.lesson.dto.response.LessonDetailResponse;
import kr.hs.after.serverapi.lesson.dto.response.LessonSearchResponse;
import kr.hs.after.serverapi.lesson.dto.response.LessonSummaryResponse;
import kr.hs.after.serverapi.lesson.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @PostMapping
    public ResponseEntity<CreateLessonResponse> create(@AuthenticationPrincipal Long memberId,
                                                       @Valid @RequestBody CreateLessonRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(lessonService.create(memberId, request));
    }

    @GetMapping
    public List<LessonSearchResponse> search(@RequestParam(required = false) String keyword,
                                             @RequestParam(defaultValue = "10") int size) {
        return lessonService.search(keyword, size);
    }

    @GetMapping("/me")
    public ResponseEntity<List<LessonSummaryResponse>> myLessons(@AuthenticationPrincipal Long memberId) {
        return ResponseEntity.ok(lessonService.getMyLessons(memberId));
    }

    @GetMapping("/{id}")
    public LessonDetailResponse getDetail(@PathVariable Long id) {
        return lessonService.getDetail(id);
    }
}