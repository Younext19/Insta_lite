package com.univrouen.backend.service;


import com.univrouen.backend.config.mapper.ImageMapper;
import com.univrouen.backend.dto.ResponseConfig.ImageResponse;
import com.univrouen.backend.entite.ImageEntity;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.repository.ImageRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;

import java.awt.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Slf4j
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
                .fullnameUser(userDto.getFullname())
                .pseudoUser(userDto.getPseudo())
                .build();

        }

    private String generateNameFile(String name){
        String newName;
        String extension = StringUtils.getFilenameExtension(name);
        newName = System.currentTimeMillis() + "." + extension;
        return  newName;
    }

    public List<ImageResponse> getAllImages() {

        List<ImageEntity> images = this.imageRepository.findAll();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            UserDto userDto = (UserDto) authentication.getPrincipal();
            if(userDto.isHasPrivileges()){
                return imageMapper.toImageResponseList(images);
            } else {
              return  imageMapper.toImageResponseList(images.stream()
                        .filter(imageEntity -> !imageEntity.isPrivate()).toList());
            }
        }
        else {
            return  imageMapper.toImageResponseList(images.stream()
                    .filter(imageEntity -> !imageEntity.isPrivate()).toList());
        }
    }
}
