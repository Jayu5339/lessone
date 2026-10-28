package kr.hs.after.serverapi.member.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateMeRequest(
        @Size(max = 50)
        String name,

        @Pattern(regexp = "^[a-zA-Z0-9_]{4,20}$")
        String username
) {
}
