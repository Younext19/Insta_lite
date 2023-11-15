package com.univrouen.backend.dto.userConfigResponse;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseBody {
    private String pseudo;
    private String mail;
    private String fullname;
    private String role;
}
