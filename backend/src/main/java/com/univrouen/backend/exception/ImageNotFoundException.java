package com.univrouen.backend.exception;

public class ImageNotFoundException extends RuntimeException {
    public ImageNotFoundException() {
        super("L'image n'exsite pas ");
    }

    public ImageNotFoundException(String message) {
        super(message);
    }
}
