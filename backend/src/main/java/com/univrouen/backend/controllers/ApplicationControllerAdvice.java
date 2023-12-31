package com.univrouen.backend.controllers;
import com.univrouen.backend.exception.ImageNotFoundException;
import com.univrouen.backend.exception.InstaException;
import com.univrouen.backend.exception.RefreshTokenException;
import com.univrouen.backend.exception.SignUpException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.reflect.MalformedParameterizedTypeException;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ApplicationControllerAdvice {


    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = BadCredentialsException.class)
    public @ResponseBody ProblemDetail badCredentialsException(BadCredentialsException badCredentialsException){
        final ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED,"identifiant ou mot de passe n'est pas valide"
        );
        problemDetail.setProperty("erreur","nous n'avons pas pu vous identifié");
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = SignatureException.class)
    public @ResponseBody ProblemDetail jwtException(SignatureException signatureException){
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED,"Token non valide"
        );
        problemDetail.setProperty("erreur","nous n'avons pas pu vérifié votre jwt");
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = MalformedJwtException.class)
    public @ResponseBody ProblemDetail jwtException(MalformedJwtException malformedJwtException){
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED,"Token non valide"
        );
        problemDetail.setProperty("erreur","nous n'avons pas pu vérifié votre jwt");
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = ExpiredJwtException.class)
    public @ResponseBody ProblemDetail jwtException(ExpiredJwtException expiredJwtException){
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED,"Token non valide"
        );
        problemDetail.setProperty("erreur","Le token que vous avez saisie n'est plus valide");
        return problemDetail;
    }


    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(value = AccessDeniedException.class)
    public @ResponseBody ProblemDetail accessDeniedException(AccessDeniedException accessDeniedException){
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.FORBIDDEN,"Droits requises"
        );
        problemDetail.setProperty("erreur","Vous n'avez pas le droit d'accéder à effectuer cette action");
        return problemDetail;

    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(InstaException.class)
    public @ResponseBody ProblemDetail handleException(
            InstaException e) {
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.CONFLICT,"conflit detecté"
        );
        problemDetail.setProperty("erreur",e.getMessage());
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ImageNotFoundException.class)
    public @ResponseBody ProblemDetail handleException(
            ImageNotFoundException e) {
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND,"la ressource n'a pas été trouvé"
        );
        problemDetail.setProperty("erreur",e.getMessage());
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = RefreshTokenException.class)
    public @ResponseBody ProblemDetail jwtException(RefreshTokenException refreshTokenException){
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED,"refresh token non valide"
        );
        problemDetail.setProperty("erreur",refreshTokenException.getMessage());
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = SignUpException.class)
    public @ResponseBody ProblemDetail jwtException(SignUpException signUpException){
        final ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,"mot de passe n'est pas bien formé"
        );
        problemDetail.setProperty("erreur",signUpException.getMessage());
        return problemDetail;
    }


}
