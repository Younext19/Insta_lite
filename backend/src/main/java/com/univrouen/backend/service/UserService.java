package com.univrouen.backend.service;


import com.univrouen.backend.config.mapper.UserMapper;
import com.univrouen.backend.dto.ResponseConfig.UserResponseBody;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

//        if(user != null){
//            List<Jwt> jwtList = jwtRepository.findByUserDto(user);
//            jwtRepository.deleteAll(jwtList);
//        }
        this.userRepository.deleteById(id);
    }

    public UserDto loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByMail(username).orElseThrow(() -> new UsernameNotFoundException("Utilisateur inconnu"));

    }
}
