package com.univrouen.backend.dto.ResponseConfig;


import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ImageResponse {

    private Date creationDate;
    private String title;
    private boolean isPrivate;
    private String fullnameUser;
    private String pseudoUser;
    private String urlImage;
}
