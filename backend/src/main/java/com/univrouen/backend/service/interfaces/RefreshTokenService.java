package com.univrouen.backend.service.interfaces;
import com.univrouen.backend.config.RequestConfig.RefreshTokenRequest;
import com.univrouen.backend.config.ResponseConfig.RefreshTokenResponse;
import com.univrouen.backend.entite.RefreshToken;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(int userDto_id);

    RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}