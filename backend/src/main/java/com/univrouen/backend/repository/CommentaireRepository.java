package com.univrouen.backend.repository;

import com.univrouen.backend.entite.Commentaire;
import com.univrouen.backend.entite.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Integer> {

}
