package com.univrouen.backend.dto.ResponseConfig;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageResponse {

    private long id;
    private String title;
    private boolean isPrivate;
    private String fullname;
    private String mail;
}
