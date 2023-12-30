package com.univrouen.backend.service.interfaces;
import com.univrouen.backend.config.RequestConfig.RegisterRequest;
import com.univrouen.backend.config.ResponseConfig.AuthenticationResponse;
import com.univrouen.backend.config.ResponseConfig.UserResponseBody;
public interface AuthService {
    UserResponseBody signUp(RegisterRequest userDtoRequest);

    AuthenticationResponse generate(String username);
}
