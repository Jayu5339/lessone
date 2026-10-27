package kr.hs.after.serverapi.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank(message = "Username is required")
        @Pattern(regexp = "^[a-zA-Z0-9_]{4,20}$",
                message = "Username must be 4-20 characters (letters, numbers, underscore)")
        String username,

        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 50, message = "Password must be 8-50 characters")
        String password,

        @NotBlank(message = "Name is required")
        @Size(max = 50, message = "Name must be 50 characters or less")
        String name,

        @NotBlank(message = "Phone is required")
        @Pattern(regexp = "^01[0-9]{8,9}$", message = "Phone must be digits only (e.g. 01012345678)")
        String phone
) {
}
