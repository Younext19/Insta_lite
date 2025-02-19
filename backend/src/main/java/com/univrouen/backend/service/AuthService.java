package com.univrouen.backend.service;
import com.univrouen.backend.config.CONSTANT.RoleType;

import com.univrouen.backend.config.mapper.UserMapper;
import com.univrouen.backend.config.RequestConfig.RegisterRequest;
import com.univrouen.backend.config.ResponseConfig.AuthenticationResponse;
import com.univrouen.backend.config.ResponseConfig.UserResponseBody;
import com.univrouen.backend.entite.RefreshToken;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.InstaException;
import com.univrouen.backend.exception.SignUpException;
import com.univrouen.backend.repository.AuthRepository;
import com.univrouen.backend.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Service
public class AuthService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private RefreshTokenService refreshTokenService;


    public UserResponseBody signUp(RegisterRequest userDtoRequest){

        if (!EmailValidator.getInstance().isValid(userDtoRequest.getMail())) {
            throw new SignUpException("Votre email est invalide.");
        }

        Optional<UserDto> optionalUtilisateur = this.authRepository.findByMail(userDtoRequest.getMail());
        if(optionalUtilisateur.isPresent()){
            throw new InstaException("Un utilisateur est déja inscrit avec mail '" + userDtoRequest.getMail());
        }
        UserDto user =  userMapper.toUserEntity(userDtoRequest);
        if (!isPasswordStrong(userDtoRequest.getPassword())) {
            throw new SignUpException("Votre mot de passe n'est pas assez fort.");
        }
        String mdpCrypte = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(mdpCrypte);
        if(userDtoRequest.getRole() != null) {
            user.setRole(userDtoRequest.getRole());
        } else
            user.setRole(RoleType.ROLE_UTILISATEUR);
        UserResponseBody userSaved = userMapper.toUserResponseBody(this.authRepository.save(user));
        return userSaved;
    }


    public AuthenticationResponse generate(String username) {
        UserDto userDto = (UserDto) userService.loadUserByUsername(username);
        RefreshToken refreshToken =  refreshTokenService.createRefreshToken(userDto.getId());
        String jwt = jwtService.generateJwtByUser(userDto);
        String refreshTokeValue = refreshToken.getToken();
        return
                AuthenticationResponse.builder()
                        .id(userDto.getId())
                        .mail(username)
                        .role(userDto.getRole())
                        .accessToken(jwt)
                        .refreshToken(refreshTokeValue)
                        .build();
    }


    private boolean isPasswordStrong(String password) {
        return password.length() >= 8 && password.matches(".*[a-zA-Z]+.*") && password.matches(".*[0-9]+.*");
    }
}
