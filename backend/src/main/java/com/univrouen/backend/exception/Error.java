package com.univrouen.backend.exception;


import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class Error {
    private String message;

    public Error(String message) {
        this.message = message;
    }
}