package com.univrouen.backend.security;

import com.univrouen.backend.config.CONSTANT.Constant;
import com.univrouen.backend.entite.RefreshToken;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.service.AuthService;
import com.univrouen.backend.service.RefreshTokenService;
import com.univrouen.backend.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class JwtService {

    public static final String TOKEN_INVALIDE = "Token invalide";

    @Autowired
    private UserService userService;

//    public Jwt tokenByValue(String value) {
//        return this.jwtRepository.findByValueAndDesactiveAndExpire(
//                value,
//                false,
//                false
//        ).orElseThrow(() -> new RuntimeException("Token invalide ou inconnu"));
//    }



//    private void disableTokens(UserDto user) {
//        final List<Jwt> jwtList = this.jwtRepository.findUser(user.getMail()).peek(
//                jwt -> {
//                    jwt.setDesactive(true);
//                    jwt.setExpire(true);
//                }
//        ).collect(Collectors.toList());
//
//        this.jwtRepository.saveAll(jwtList);
//    }


    public String generate(String username) {
        UserDto userDto = (UserDto) userService.loadUserByUsername(username);
        return this.generateJwtByUser(userDto);
    }


    public String extractUsername(String token) {
        return this.getClaim(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }

    private Date getExpirationDateFromToken(String token) {
        return this.getClaim(token, Claims::getExpiration);
    }

    private <T> T getClaim(String token, Function<Claims, T> function) {
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(this.getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateJwtByUser(UserDto user) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + 30 * 60 * 1000;

        final Map<String, Object> claims = Map.of(
                "fullname", user.getFullname(),
                Claims.EXPIRATION, new Date(expirationTime),
                Claims.SUBJECT, user.getMail()
        );

        final String bearer = Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(user.getMail())
                .setClaims(claims)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        return bearer;
    }

    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(Constant.ENCRIPTION_KEY);
        return Keys.hmacShaKeyFor(decoder);
    }

}
