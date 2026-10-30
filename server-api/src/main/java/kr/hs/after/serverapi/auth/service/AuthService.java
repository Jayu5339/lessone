package kr.hs.after.serverapi.auth.service;

import kr.hs.after.serverapi.auth.dto.request.LoginRequest;
import kr.hs.after.serverapi.auth.dto.request.SignupRequest;
import kr.hs.after.serverapi.auth.dto.response.LoginResponse;
import kr.hs.after.serverapi.common.exception.ApiException;
import kr.hs.after.serverapi.member.domain.Member;
import kr.hs.after.serverapi.member.mapper.MemberMapper;
import kr.hs.after.serverapi.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public void signup(SignupRequest request) {
        if (memberMapper.existsByUsername(request.username())) {
            throw new ApiException(HttpStatus.CONFLICT, "Username already exists");
        }
        if (memberMapper.existsByPhone(request.phone())) {
            throw new ApiException(HttpStatus.CONFLICT, "Phone number already registered");
        }

        Member member = new Member();
        member.setName(request.name());
        member.setPhone(request.phone());
        member.setUsername(request.username());
        member.setPassword(passwordEncoder.encode(request.password()));
        memberMapper.insert(member);
    }

    public LoginResponse login(LoginRequest request) {
        Member member = memberMapper.findByUsername(request.username());

        if (member == null || !passwordEncoder.matches(request.password(), member.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        String token = jwtProvider.createAccessToken(member.getId());
        return new LoginResponse(token, "Bearer", jwtProvider.getExpiresInSeconds());
    }
}
