package com.univrouen.backend.config.RequestConfig;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageRequest {
    private String title;
    private boolean isPrivate;
}
