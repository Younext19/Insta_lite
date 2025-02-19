package com.univrouen.backend.repository;

import com.univrouen.backend.entite.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<UserDto,Integer> {

    Optional<UserDto>  findByMail(String username);
}
