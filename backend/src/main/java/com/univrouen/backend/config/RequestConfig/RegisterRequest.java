package com.univrouen.backend.config.RequestConfig;


import com.univrouen.backend.config.CONSTANT.RoleType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    @NotBlank(message = "fullname is required")
    private String fullname;
    @NotBlank(message = "pseudo is required")
    private String pseudo;
    @NotBlank(message = "mail is required")
    @Email(message = "mail format is not valid")
    private String mail;
    @NotBlank(message = "password is required")
    private String password;
    private String imgUrl;

    private RoleType role;

    private boolean hasPrivileges;


}
