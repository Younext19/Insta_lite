package com.univrouen.backend.service.interfaces;

import com.univrouen.backend.config.ResponseConfig.ImageResponse;
import org.springframework.core.io.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    ImageResponse uploadImage(MultipartFile image, String title, boolean isPrivate) throws IOException;

    List<ImageResponse> getAllImages();

    ImageResponse updateImage(String name, String title, boolean isPrivate, MultipartFile newImage) throws IOException;

    ImageResponse getImageByName(String name);

    void deleteByName(String name) throws AccessDeniedException;

    Resource downloadByName(String name) throws Exception;
}
