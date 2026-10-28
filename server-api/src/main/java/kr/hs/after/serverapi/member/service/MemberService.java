package kr.hs.after.serverapi.member.service;

import kr.hs.after.serverapi.common.exception.ApiException;
import kr.hs.after.serverapi.member.domain.Member;
import kr.hs.after.serverapi.member.dto.request.UpdateMeRequest;
import kr.hs.after.serverapi.member.dto.response.MeResponse;
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

    public MeResponse updateMe(Long memberId, UpdateMeRequest request) {
        if (request.name() == null && request.username() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Nothing to update");
        }
        if (memberMapper.findById(memberId) == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Member not found");
        }
        if (request.username() != null
                && memberMapper.existsByUsernameExcludingId(request.username(), memberId)) {
            throw new ApiException(HttpStatus.CONFLICT, "Username already exists");
        }
        memberMapper.updateProfile(memberId, request.name(), request.username());
        return getMe(memberId);
    }
}
