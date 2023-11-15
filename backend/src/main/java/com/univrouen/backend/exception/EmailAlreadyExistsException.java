package com.univrouen.backend.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException(){
        super("Email already exists on Bdd !!");
    }

    public EmailAlreadyExistsException(String message){
        super(message);
    }

}
