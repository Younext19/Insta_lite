package com.univrouen.backend.dto.ResponseConfig;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.univrouen.backend.RoleType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {


    private int id;
    private String mail;
    private RoleType role;
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;

}
