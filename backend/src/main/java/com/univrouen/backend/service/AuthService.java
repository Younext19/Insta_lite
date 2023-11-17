package com.univrouen.backend.service;
import com.univrouen.backend.RoleType;

import com.univrouen.backend.config.mapper.UserMapper;
import com.univrouen.backend.dto.RequestConfig.RegisterRequest;
import com.univrouen.backend.dto.ResponseConfig.AuthenticationResponse;
import com.univrouen.backend.dto.ResponseConfig.UserResponseBody;
import com.univrouen.backend.entite.RefreshToken;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.EmailAlreadyExistsException;
import com.univrouen.backend.repository.AuthRepository;
import com.univrouen.backend.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
//    @Autowired
//    private ValidationService validationService;

    public UserResponseBody signUp(RegisterRequest userDtoRequest){

        if(userDtoRequest.getMail().indexOf("@") == -1 ){
            throw new RuntimeException("Votre mail est invalide");
        }
        if(!userDtoRequest.getMail().contains(".")){
            throw new RuntimeException("Votre mail est invalide");
        }

        Optional<UserDto> optionalUtilisateur = this.authRepository.findByMail(userDtoRequest.getMail());
        if(optionalUtilisateur.isPresent()){
            throw new EmailAlreadyExistsException("A user with the email '" + userDtoRequest.getMail() + "' already exists.");
        }
        UserDto user =  userMapper.toUserEntity(userDtoRequest);

        String mdpCrypte = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(mdpCrypte);
        user.setRole(RoleType.ROLE_UTILISATEUR);
        UserResponseBody userSaved = userMapper.toUserResponseBody(this.authRepository.save(user));
        return userSaved;
    }

//    public void activation(Map<String, String> activation) {
//        Validation validation=  this.validationService.lireEnFontionDuCode(activation.get("code"));
//        if(Instant.now().isAfter(validation.getExpiration())){
//            throw new RuntimeException("Votre code est expiré");
//        }
//        UserDto utilisateurActive =  this.authRepository.findById(validation.getUserDto().getId()).orElseThrow(() -> new RuntimeException("Utilisateur inconnu"));
//        utilisateurActive.setActif(true);
//        authRepository.save(utilisateurActive);
//    }


    //chercher un utilisateur dans la bse de données en fonction de son email
    //il recupere toutes les infos et il compare des mdps car ils sont cryptés



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

}
