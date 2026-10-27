package kr.hs.after.serverapi.member.controller;

import kr.hs.after.serverapi.member.dto.MeResponse;
import kr.hs.after.serverapi.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MeResponse> me(@AuthenticationPrincipal Long memberId) {
        return ResponseEntity.ok(memberService.getMe(memberId));
    }
}
