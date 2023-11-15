package com.univrouen.backend.repository;

import com.univrouen.backend.entite.Jwt;
import com.univrouen.backend.entite.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface JwtRepository extends JpaRepository<Jwt, Integer> {
    Optional<Jwt> findByValueAndDesactiveAndExpire(String value, boolean desactive, boolean expire);

    @Query("FROM Jwt j WHERE j.expire = :expire AND j.desactive = :desactive AND j.userDto.mail = :mail")
    Optional<Jwt> findUserDtoValidToken(@Param("mail") String mail, @Param("desactive") boolean desactive, @Param("expire") boolean expire);

    @Query("FROM Jwt j WHERE j.userDto.mail = :mail")
    Stream<Jwt> findUser(@Param("mail") String mail);

    @Query("FROM Jwt j WHERE j.refreshToken.value = :value")
    Optional<Jwt> findByRefreshToken(@Param("value") String value);

    void deleteAllByExpireAndDesactive(boolean expire, boolean desactive);

    List<Jwt> findByUserDto(UserDto userDto);
}