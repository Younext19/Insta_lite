package com.univrouen.backend.config.mapper;

import com.univrouen.backend.dto.RequestConfig.ImageRequest;
import com.univrouen.backend.entite.ImageEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class ImageMapper {

    public abstract ImageEntity toImageEntity(ImageRequest image);


}
