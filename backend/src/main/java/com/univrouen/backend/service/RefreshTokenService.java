package com.univrouen.backend.service;

import com.univrouen.backend.dto.userConfigResponse.AuthenticationResponse;
import com.univrouen.backend.entite.RefreshToken;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.repository.RefreshTokenRepository;
import com.univrouen.backend.repository.UserRepository;
import com.univrouen.backend.security.JwtService;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;



@NoArgsConstructor()
@AllArgsConstructor
@Service
public class RefreshTokenService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private JwtService jwtService;


    public RefreshToken createRefreshToken(int userDto_id){

        UserDto userDto  = userRepository.findById(userDto_id).orElseThrow(()->
                new RuntimeException("User not found"));

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .revoked(false)
                .user(userDto)
                .expiryDate(Instant.now().plusMillis(30 *60 *1000))
                .build();
        return this.refreshTokenRepository.save(refreshToken);
    }

    public AuthenticationResponse refreshToken(Map<String, String> refreshTokenRequest){
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenRequest.get("refresh")).orElseThrow(
                () -> new RuntimeException("le refresh token n'existe pas"));
        if(refreshToken ==  null){
            throw new RuntimeException("le token est null");
        }

        Instant nowInstant = Instant.now();
        if(refreshToken.getExpiryDate().isBefore(nowInstant)){
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException("le refresh token est expiré");
        }
        Map<String, String> generatedMap =  jwtService.generate(refreshToken.getUser().getMail());
        return
                AuthenticationResponse.builder()
                        .refreshToken(refreshToken.getToken())
                        .accessToken(generatedMap.get(JwtService.BEARER))
                        .build();
    }
}

