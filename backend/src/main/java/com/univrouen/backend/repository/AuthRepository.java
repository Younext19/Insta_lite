package com.univrouen.backend.repository;

import com.univrouen.backend.entite.UserDto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends CrudRepository<UserDto, Integer> {

    Optional<UserDto> findByMail(String mail);
}
