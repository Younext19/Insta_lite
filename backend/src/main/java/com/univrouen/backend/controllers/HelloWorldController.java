package com.univrouen.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/test")
public class HelloWorldController {

    @GetMapping(path="nikmok")
    String helloWorld() {
        return "Hello fff!";
    }

}