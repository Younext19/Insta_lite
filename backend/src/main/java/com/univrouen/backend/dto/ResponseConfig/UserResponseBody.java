package com.univrouen.backend.dto.ResponseConfig;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseBody {

    private int id;
    private String pseudo;
    private String mail;
    private String fullname;
    private String role;
}
