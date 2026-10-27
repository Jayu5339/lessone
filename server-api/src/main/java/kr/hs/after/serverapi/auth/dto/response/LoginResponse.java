package kr.hs.after.serverapi.auth.dto.response;

public record LoginResponse(
        String accessToken,
        String tokenType,
        long expiresIn
) {
}
