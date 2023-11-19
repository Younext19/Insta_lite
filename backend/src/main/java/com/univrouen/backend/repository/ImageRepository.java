package com.univrouen.backend.repository;

import com.univrouen.backend.entite.ImageEntity;
import org.hibernate.boot.beanvalidation.IntegrationException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
    Optional<ImageEntity> findImageByTitle(String title);
}
