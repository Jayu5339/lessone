package kr.hs.after.serverapi.member.controller;

import jakarta.validation.Valid;
import kr.hs.after.serverapi.member.dto.request.UpdateMeRequest;
import kr.hs.after.serverapi.member.dto.response.MeResponse;
import kr.hs.after.serverapi.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MeResponse> me(@AuthenticationPrincipal Long memberId) {
        return ResponseEntity.ok(memberService.getMe(memberId));
    }

    @PatchMapping("/me")
    public ResponseEntity<MeResponse> updateMe(@AuthenticationPrincipal Long memberId,
                                               @Valid @RequestBody UpdateMeRequest request) {
        return ResponseEntity.ok(memberService.updateMe(memberId, request));
    }
}
