package com.univrouen.backend.security;


import com.univrouen.backend.config.CONSTANT.Constant;
import com.univrouen.backend.service.AuthService;
import com.univrouen.backend.service.UserService;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Slf4j

@Service
public class JwtFilter extends OncePerRequestFilter {
    private UserService userService;
    private HandlerExceptionResolver handlerExceptionResolver;
    private JwtService jwtService;


    public JwtFilter(HandlerExceptionResolver handlerExceptionResolver,UserService authService, JwtService jwtService) {
        this.handlerExceptionResolver = handlerExceptionResolver;
        this.userService = authService;
        this.jwtService = jwtService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = null, username = null, authorization = request.getHeader(Constant.AUTHORIZATION);
            Boolean isTokenExpired = true;
            if (authorization != null && authorization.startsWith(Constant.BEARER)) {
                token = authorization.substring(7);
                isTokenExpired = jwtService.isTokenExpired(token);
                username = jwtService.extractUsername(token);
            }
            //si le username !=null et que aucune authentification n'est en cours
            if (isTokenExpired == false && username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails user = userService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
            filterChain.doFilter(request, response);
        } catch (Exception exception){
            handlerExceptionResolver.resolveException(request,response,null,exception);
        }


    }
}

