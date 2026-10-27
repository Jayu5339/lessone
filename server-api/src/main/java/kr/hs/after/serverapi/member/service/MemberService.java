package kr.hs.after.serverapi.member.service;

import kr.hs.after.serverapi.common.exception.ApiException;
import kr.hs.after.serverapi.member.domain.Member;
import kr.hs.after.serverapi.member.dto.MeResponse;
import kr.hs.after.serverapi.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public MeResponse getMe(Long memberId) {
        Member member = memberMapper.findById(memberId);
        if (member == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Member not found");
        }
        return new MeResponse(member.getRole(), member.getStatus(),
                member.getName(), member.getUsername(), member.getPhone(), member.getCreatedAt());
    }
}
