package com.univrouen.backend.dto.RequestConfig;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshTokenRequest {
    private String refresh;
}
