package com.univrouen.backend.controllers;


import com.univrouen.backend.config.RequestConfig.CommentaireRequest;
import com.univrouen.backend.config.ResponseConfig.CommentaireResponse;
import com.univrouen.backend.entite.Commentaire;
import com.univrouen.backend.service.CommentaireService;
import jakarta.ws.rs.GET;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("comments")
public class CommentaireController {


    @Autowired
    private CommentaireService commentaireService;

/*    @GET
    public CommentaireResponse getAllcomments(CommentaireRequest commentaireRequest){
        ResponseEntity.status(HttpStatus.OK).body(this.commentaireService.getAllcomments(commentaireRequest));
    }*/


    @PostMapping("/add")
    public ResponseEntity addCommentaire(@RequestBody CommentaireRequest commentaireRequest){
        commentaireService.addCommentaire(commentaireRequest);
        return ResponseEntity.ok().build();
    }
}
