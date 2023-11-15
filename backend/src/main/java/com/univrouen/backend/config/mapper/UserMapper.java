package com.univrouen.backend.config.mapper;


import com.univrouen.backend.dto.userConfigResponse.UserResponseBody;
import com.univrouen.backend.entite.UserDto;
import org.apache.catalina.User;
import org.mapstruct.Mapper;


import java.util.List;
import java.util.stream.Collectors;



@Mapper(componentModel = "spring")
public abstract class UserMapper {
    public abstract UserResponseBody toUserResponseBody(UserDto userDto);

    public abstract List<UserResponseBody> toUserResponseBodyList(List<UserDto> userDtos);

}

