package com.univrouen.backend.security;


import com.univrouen.backend.entite.Jwt;
import com.univrouen.backend.service.AuthService;
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

import java.io.IOException;
@Slf4j


@Service
public class JwtFilter extends OncePerRequestFilter {
    private AuthService authService;


    private JwtService jwtService;


    public JwtFilter(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = null, username = null,authorization = request.getHeader("Authorization");
        Boolean isTokenExpired = true;
        Jwt tokenDansLaBDD = null;
        if(authorization != null && authorization.startsWith("Bearer")){
            token = authorization.substring(7);
            tokenDansLaBDD = this.jwtService.tokenByValue(token);
            isTokenExpired = jwtService.isTokenExpired(token);
            username = jwtService.extractUsername(token);
        }


        //si le username !=null et que aucune authentification n'est en cours
        if(isTokenExpired == false && username != null
                &&  tokenDansLaBDD.getUserDto().getMail().equals(username)
                && SecurityContextHolder.getContext().getAuthentication() ==  null){
            log.info("il est ici");
            //ici on utilise UserDetails au lieu de Utilisateur car on est dans la sécurité
            UserDetails user = authService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
            //on dit a spring que l'utilisateur est authentifié (la partie de verification du token est faite avec succès)
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        filterChain.doFilter(request,response);



    }
}

