package com.univrouen.backend.controllers;


import com.univrouen.backend.dto.ResponseConfig.UserResponseBody;
import com.univrouen.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor

@Slf4j
@RestController
@RequestMapping(path = "/users")
public class UserController {

    private UserService userService;
    @GetMapping
    public ResponseEntity<List<UserResponseBody>> getAllUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.getAllUsers());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteById(@PathVariable int id){
        this.userService.deleteById(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseBody> getUserById(@PathVariable int id){
       return ResponseEntity.status(HttpStatus.OK).body(this.userService.getUserById(id));
    }




}


