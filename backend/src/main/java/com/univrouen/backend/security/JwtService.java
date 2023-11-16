package com.univrouen.backend.security;

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
    public static final String BEARER = "bearer";
    public static final String REFRESH = "refresh";
    public static final String TOKEN_INVALIDE = "Token invalide";
    private final String ENCRIPTION_KEY = "608f36e92dc66d97d5933f0e6371493cb4fc05b1aa8f8de64014732472303a7c";

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


    public Map<String, String> generate(String username) {
        UserDto userDto = (UserDto) userService.loadUserByUsername(username);
        return this.generateJwtByUser(userDto);
        //this.disableTokens(userDto);

//        final Map<String, String> jwtMap = new java.util.HashMap<>(jwtService.generateJwtByUser(userDto));
//
//        jwtMap.put(REFRESH,  refreshTokenService.createRefreshToken(userDto.getId()).getToken());
//        return jwtMap;
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

    public Map<String, String> generateJwtByUser(UserDto user) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + 30 * 60 * 1000;

        final Map<String, Object> claims = Map.of(
                "name", user.getFullname(),
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
        return Map.of(BEARER, bearer);
    }

    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(ENCRIPTION_KEY);
        return Keys.hmacShaKeyFor(decoder);
    }

//    public void logout() {
//        UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Jwt jwt = this.jwtRepository.findUserDtoValidToken(
//                user.getMail(),
//                false,
//                false
//        ).orElseThrow(() -> new RuntimeException(TOKEN_INVALIDE));
//        jwt.setExpire(true);
//        jwt.setDesactive(true);
//        jwt.getRefreshToken().setExpire(true);
//        this.jwtRepository.save(jwt);
//    }

//    @Scheduled(cron = "@daily")
//    public void removeUselessJwt() {
//        log.info("Suppression des token à {}", Instant.now());
//        this.jwtRepository.deleteAllByExpireAndDesactive(true, true);
//    }

//    public Map<String, String> refreshToken(Map<String, String> refreshTokenRequest) {
//        final Jwt jwt = this.jwtRepository.findByRefreshToken(refreshTokenRequest.get(REFRESH)).orElseThrow(() -> new RuntimeException(TOKEN_INVALIDE));
//        if(jwt.getRefreshToken().isExpire() || jwt.getRefreshToken().getExpiration().isBefore(Instant.now())) {
//            throw new RuntimeException(TOKEN_INVALIDE);
//        }
//        this.disableTokens(jwt.getUserDto());
//        return this.generate(jwt.getUserDto().getMail());
//    }
}
