package com.univrouen.backend.config.ResponseConfig;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.univrouen.backend.config.CONSTANT.RoleType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {


    private int id;
    private String mail;
    private RoleType role;
    private boolean hasPrivileges;
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;

}
