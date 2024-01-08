package com.univrouen.backend.config.ResponseConfig;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentaireResponse {

    private String name;
    private String desc;

}
