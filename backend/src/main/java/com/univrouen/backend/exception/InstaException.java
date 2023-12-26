package com.univrouen.backend.exception;

public class InstaException extends RuntimeException {

    public InstaException(){
        super("Email already exists on Bdd !!");
    }

    public InstaException(String message){
        super(message);
    }

}
