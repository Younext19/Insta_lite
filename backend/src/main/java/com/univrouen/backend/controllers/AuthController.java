package com.univrouen.backend.controllers;


import com.univrouen.backend.dto.AthentificationDTO;
import com.univrouen.backend.dto.userConfigResponse.UserResponseBody;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.Error;
import com.univrouen.backend.security.JwtService;
import com.univrouen.backend.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @PostMapping("/inscription")
    public ResponseEntity<UserResponseBody> signUp(@RequestBody UserDto userDto) {
        UserResponseBody newUser = this.authService.signUp(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

//    @PostMapping("/activation")
//    public void validation(@RequestBody Map<String,String> activation) {
//
//        this.authService.activation(activation);
//    }
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
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.jwtService.generate(athentificationDTO.username()));
        }
        return null;
    }

    @PostMapping(path = "deconnexion")
    public void logout() {
        this.jwtService.logout();
    }

    @PostMapping(path = "refresh-token")
    public @ResponseBody Map<String, String> refreshToken(@RequestBody Map<String, String> refreshTokenRequest) {
        return this.jwtService.refreshToken(refreshTokenRequest);
    }
}

