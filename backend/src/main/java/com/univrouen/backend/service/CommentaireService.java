package com.univrouen.backend.service;

import com.univrouen.backend.config.RequestConfig.CommentaireRequest;
import com.univrouen.backend.entite.Commentaire;
import com.univrouen.backend.entite.ImageEntity;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.ImageNotFoundException;
import com.univrouen.backend.repository.CommentaireRepository;
import com.univrouen.backend.repository.ImageRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Slf4j


@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private ImageRepository imageRepository;

/*    public void deleteCommentaire(Long commentaireId) {
        commentaireRepository.deleteById(commentaireId);
    }*/

    public void addCommentaire(CommentaireRequest commentaireRequest){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info(commentaireRequest.getImageName());
        log.info(commentaireRequest.getDescription());

        ImageEntity imageEntity = imageRepository.findByOriginName(commentaireRequest.getImageName())
                .orElseThrow(() -> new ImageNotFoundException("L'image " + commentaireRequest.getImageName() + " n'existe pas ou une erreur est survenue"));

        Commentaire commentaire = Commentaire.builder()
                .image(imageEntity)
                .description(commentaireRequest.getDescription())
                .user(userDto)
                .build();

        commentaireRepository.save(commentaire);
    }

/*    public CommentaireResponse getAllcomments(CommentaireRequest commentaireRequest) {
    }*/
}
