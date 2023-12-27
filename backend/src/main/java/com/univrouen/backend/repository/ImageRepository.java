package com.univrouen.backend.repository;

import com.univrouen.backend.entite.ImageEntity;
import org.hibernate.boot.beanvalidation.IntegrationException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
    Optional<ImageEntity> findImageByTitle(String title);

    ImageEntity findById(Long id);
}
