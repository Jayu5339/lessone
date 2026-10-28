package kr.hs.after.serverapi.member.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.hs.after.serverapi.member.domain.MemberRole;
import kr.hs.after.serverapi.member.domain.MemberStatus;

import java.time.LocalDateTime;

public record MeResponse(
        MemberRole role,
        MemberStatus status,
        String name,
        String username,
        String phone,

        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime createdAt
) {
}
