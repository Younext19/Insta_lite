package com.univrouen.backend.service;
import com.univrouen.backend.RoleType;

import com.univrouen.backend.config.mapper.AuthMapper;
import com.univrouen.backend.config.mapper.UserMapper;
import com.univrouen.backend.dto.userConfigResponse.UserResponseBody;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.EmailAlreadyExistsException;
import com.univrouen.backend.repository.AuthRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;



@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
//    @Autowired
//    private ValidationService validationService;

    public UserResponseBody signUp(UserDto user){
        if(user.getMail().indexOf("@") == -1 ){
            throw new RuntimeException("Votre mail est invalide");
        }
        if(!user.getMail().contains(".")){
            throw new RuntimeException("Votre mail est invalide");
        }

        Optional<UserDto> optionalUtilisateur = this.authRepository.findByMail(user.getMail());
        if(optionalUtilisateur.isPresent()){
            throw new EmailAlreadyExistsException("A user with the email '" + user.getMail() + "' already exists.");
        }
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
    @Override
    public UserDto loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.authRepository.findByMail(username).orElseThrow(() -> new UsernameNotFoundException("Utilisateur inconnu"));

    }
}
