package com.univrouen.backend.config.RequestConfig;


import com.univrouen.backend.entite.ImageEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentaireRequest {

    private String description;
    private String imageName;

}
