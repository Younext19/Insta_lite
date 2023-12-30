package com.univrouen.backend.service.interfaces;
import com.univrouen.backend.config.RequestConfig.RegisterRequest;
import com.univrouen.backend.config.ResponseConfig.UserResponseBody;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<UserResponseBody> getAllUsers();

    UserResponseBody getUserById(int id);

    void deleteById(int id);

    UserResponseBody updateUser(Long id, RegisterRequest userDtoRequest);
}