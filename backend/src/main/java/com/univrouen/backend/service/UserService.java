package com.univrouen.backend.service;


import com.univrouen.backend.RoleType;
import com.univrouen.backend.config.mapper.UserMapper;
import com.univrouen.backend.dto.RequestConfig.RegisterRequest;
import com.univrouen.backend.dto.ResponseConfig.UserResponseBody;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.InstaException;
import com.univrouen.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Service
public class UserService  implements UserDetailsService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<UserResponseBody> getAllUsers(){
        return  userMapper.toUserResponseBodyList(this.userRepository.findAll());
    }

    public UserResponseBody getUserById(int id) {
        UserDto user = this.userRepository.findById((id)).orElseThrow(()->
                new UsernameNotFoundException("User with id  =  " + id + "does not exist")

        );
        return userMapper.toUserResponseBody(user);
    }


    public void deleteById(int id) {
        UserDto user = this.userRepository.findById((id)).orElseThrow(()->
                new UsernameNotFoundException("User with id  =  " + id + " does not exist")

        );
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(userDto.getMail().equals(user.getMail()) || userDto.getRole().equals(RoleType.ROLE_ADMINISTRATEUR)){
            this.userRepository.deleteById(id);

        } else
            throw new InstaException("Vous ne pouvez supprimer que votre compte!");
    }

    public UserDto loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByMail(username).orElseThrow(() -> new UsernameNotFoundException("Utilisateur inconnu"));
    }

    public UserResponseBody updateUser(@PathVariable Long id, RegisterRequest userDtoRequest) {

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDto userFromBdd = userRepository.findById(Math.toIntExact(id))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if(userDto.getMail().equals(userFromBdd.getMail()) || userDto.getRole().equals(RoleType.ROLE_ADMINISTRATEUR)) {
            if (userRepository.findByMail(userDtoRequest.getMail()).isPresent() && !userDtoRequest.getMail().equals(userDto.getMail())) {
                throw new InstaException("Un utilisateur est déja inscrit avec ce mail  !!");
            }
            if(userDtoRequest.getMail() != null){
                userFromBdd.setMail(userDtoRequest.getMail());
            }
            if(userDtoRequest.getFullname() != null){
                userFromBdd.setFullname(userDtoRequest.getFullname());
            }
            if(userDtoRequest.getPseudo() != null){
                userFromBdd.setPseudo(userDtoRequest.getPseudo());
            }
            if(userDtoRequest.getPassword() != null){
                String mdpCrypte = this.passwordEncoder.encode(userDtoRequest.getPassword());
                userFromBdd.setPassword(mdpCrypte);
            }
            if(userDtoRequest.getRole() != null) {
                userFromBdd.setRole(userDto.getRole());
            }
            userFromBdd.setHasPrivileges(userDtoRequest.isHasPrivileges());
            this.userRepository.save(userFromBdd);

            return this.userMapper.toUserResponseBody(userFromBdd);
        } else
            throw new InstaException("Vous n'avez pas le droit de modifier un autre compte que le votre!");
    }
}
