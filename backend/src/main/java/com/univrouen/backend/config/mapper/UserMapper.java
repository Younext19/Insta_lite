package com.univrouen.backend.config.mapper;


import com.univrouen.backend.dto.RequestConfig.RegisterRequest;
import com.univrouen.backend.dto.ResponseConfig.UserResponseBody;
import com.univrouen.backend.entite.UserDto;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public abstract class UserMapper {
    public abstract UserResponseBody toUserResponseBody(UserDto userDto);

    public abstract UserDto toUserEntity(RegisterRequest registerRequest);

    public abstract List<UserResponseBody> toUserResponseBodyList(List<UserDto> userDtos);

}

