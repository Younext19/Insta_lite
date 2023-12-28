package com.univrouen.backend.controllers;


import com.univrouen.backend.config.RequestConfig.RegisterRequest;
import com.univrouen.backend.config.ResponseConfig.UserResponseBody;
import com.univrouen.backend.service.AuthService;
import com.univrouen.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor

@Slf4j
@RestController
@RequestMapping(path = "/users")
public class UserController {

    private UserService userService;

    private AuthService authService;


    //C
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR')")
    @PostMapping("/addUser")
    public ResponseEntity<UserResponseBody> signUp(@RequestBody RegisterRequest userDtoRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signUp(userDtoRequest));
    }


    //R
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR')")
    @GetMapping
    public ResponseEntity<List<UserResponseBody>> getAllUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.getAllUsers());

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseBody> getUserById(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.getUserById(id));
    }



    //U
    @PatchMapping("/update/{id}")
    public ResponseEntity<UserResponseBody> updateUser(@PathVariable Long id,@RequestBody RegisterRequest userDtoRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateUser(id,userDtoRequest));
    }



    //D
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR','ROLE_UTILISATEUR')")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteById(@PathVariable int id){
        this.userService.deleteById(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }





}


