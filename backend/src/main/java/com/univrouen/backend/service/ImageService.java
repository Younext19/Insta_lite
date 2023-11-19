package com.univrouen.backend.service;


import com.univrouen.backend.config.mapper.ImageMapper;
import com.univrouen.backend.dto.RequestConfig.ImageRequest;
import com.univrouen.backend.dto.ResponseConfig.ImageResponse;
import com.univrouen.backend.entite.ImageEntity;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.repository.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.net.URI;
import java.util.Date;


@AllArgsConstructor
@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private UserService userService;
    private Path fileStorageLocation;

    public ImageService(){
        this.fileStorageLocation = Paths.get("src/main/resources/static/images").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException();
        }
    }

    public ImageResponse uploadImage(MultipartFile image, String title, boolean isPrivate) throws IOException {
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(imageRepository.findImageByTitle(title).isPresent()) {
            throw new RuntimeException("image deja existe dans la base de données");
        }
        String fileName = generateNameFile(image.getOriginalFilename());

        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        ImageEntity imageEntity = ImageEntity.builder()
                .title(title)
                .isPrivate(isPrivate)
                .user(userDto)
                .creationDate(new Date())
                .imgUrl(targetLocation.toString())
                .build();
        Files.copy(image.getInputStream(), targetLocation);
        this.imageRepository.save(imageEntity);
        return ImageResponse.builder()
                .id(imageEntity.getId())
                .title(imageEntity.getTitle())
                .isPrivate(imageEntity.isPrivate())
                .fullname(userDto.getFullname())
                .mail(userDto.getMail())
                .build();

        }

    private String generateNameFile(String name){
        String newName;
        String extension = StringUtils.getFilenameExtension(name);
        newName = System.currentTimeMillis() + "." + extension;
        return  newName;
    }
}
