package com.univrouen.backend.config.mapper;

import com.univrouen.backend.dto.RequestConfig.ImageRequest;
import com.univrouen.backend.dto.ResponseConfig.ImageResponse;
import com.univrouen.backend.entite.ImageEntity;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ImageMapper {

    public abstract ImageEntity toImageEntity(ImageRequest image);

    public  ImageResponse toImageResponse(ImageEntity image){
        return ImageResponse.builder()
                .pseudoUser(image.getUser().getPseudo())
                .fullnameUser(image.getUser().getFullname())
                .creationDate(image.getCreationDate())
                .title(image.getTitle())
                .isPrivate(image.isPrivate())
                .name(image.getName())
                .build();
    }

    public  List<ImageResponse> toImageResponseList(List<ImageEntity> imageEntities) {
        List<ImageResponse> imageResponses = new ArrayList<>();
        for (ImageEntity img : imageEntities) {
            imageResponses.add(ImageResponse.builder()
                    .pseudoUser(img.getUser().getPseudo())
                    .fullnameUser(img.getUser().getFullname())
                    .creationDate(img.getCreationDate())
                    .title(img.getTitle())
                    .isPrivate(img.isPrivate())
                    .name(img.getName())
                    .build());
        }
        return imageResponses;
    }

}
