package com.univrouen.backend.config.RequestConfig;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RefreshTokenRequest {
    private String refresh;
}
