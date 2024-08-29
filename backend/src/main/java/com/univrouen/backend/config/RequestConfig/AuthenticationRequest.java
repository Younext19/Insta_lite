package com.univrouen.backend.config.RequestConfig;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {
    String mail;
    String password;
}
