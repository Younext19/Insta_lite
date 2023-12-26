package com.univrouen.backend.controllers;


import com.univrouen.backend.dto.AthentificationDTO;
import com.univrouen.backend.dto.RequestConfig.RefreshTokenRequest;
import com.univrouen.backend.dto.RequestConfig.RegisterRequest;
import com.univrouen.backend.dto.ResponseConfig.AuthenticationResponse;
import com.univrouen.backend.dto.ResponseConfig.RefreshTokenResponse;
import com.univrouen.backend.dto.ResponseConfig.UserResponseBody;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.Error;
import com.univrouen.backend.security.JwtService;
import com.univrouen.backend.service.AuthService;
import com.univrouen.backend.service.RefreshTokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@AllArgsConstructor
@Slf4j
@RestController
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    @Autowired
    private AuthService authService;
    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/inscription")
    public ResponseEntity<UserResponseBody> signUp(@RequestBody RegisterRequest userDtoRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signUp(userDtoRequest));
    }

    @PostMapping("/connexion")
    public ResponseEntity connexion(@RequestBody AthentificationDTO athentificationDTO) {
        Authentication authenticate = null;
        try {
            authenticate = authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(athentificationDTO.username(), athentificationDTO.password()
                   ));
       } catch (BadCredentialsException e){
            String msgError = "l'email ou le mot de passe est incorrect";
            //pour faire un objet json :  message : msgError
            Error error = Error.builder().message(msgError).build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        if(authenticate.isAuthenticated()){
            return ResponseEntity.ok(this.authService.generate(athentificationDTO.username()));
        }
        return null;
    }

//    @PostMapping(path = "deconnexion")
//    public void logout() {
//        this.jwtService.logout();
//    }
//
    @PostMapping(path = "refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(this.refreshTokenService.refreshToken(refreshTokenRequest));
    }
}

