package com.univrouen.backend.exception.handler;

import com.univrouen.backend.exception.EmailAlreadyExistsException;
import org.springframework.http.HttpStatus;
import com.univrouen.backend.exception.Error;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Error> handleException(
            EmailAlreadyExistsException e) {

        Error error = Error.builder().message(e.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }


}
