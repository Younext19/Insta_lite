package com.univrouen.backend.service;


import com.univrouen.backend.config.CONSTANT.RoleType;
import com.univrouen.backend.config.CONSTANT.Constant;
import com.univrouen.backend.config.mapper.ImageMapper;
import com.univrouen.backend.config.ResponseConfig.ImageResponse;
import com.univrouen.backend.entite.ImageEntity;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.ImageNotFoundException;
import com.univrouen.backend.exception.InstaException;
import com.univrouen.backend.repository.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.UrlResource;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Slf4j
@Service
public class ImageService {



    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private UserService userService;
    private Path fileStorageLocation;
    private final Environment environment;
    private String host;


    @Autowired
    public ImageService(ImageRepository imageRepository, ImageMapper imageMapper, UserService userService, Environment environment){
        this.environment = environment;
        this.fileStorageLocation = Paths.get("src/main/resources/static/images").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException();
        }
        this.instantiateHost();
        }

    public ImageResponse uploadImage(MultipartFile image, String title, boolean isPrivate) throws IOException {
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String extractName = image.getOriginalFilename();
        String extension = StringUtils.getFilenameExtension(extractName);

        if(!Constant.EXTENSIONS.contains(extension)){
            throw new InstaException("L'extension :  '" + extension + " n'est pas autorisée");
        }
        String fileName = generateNameFile(extractName,extension);
        String extractNameUnique = generateOriginNameFile(extension);
        Date date = new Date();
        ImageEntity imageEntity = ImageEntity.builder()
                .title(title)
                .isPrivate(isPrivate)
                .user(userDto)
                .originName(extractNameUnique)
                .nameBdd(fileName)
                .creationDate(date)
                .build();
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        Files.copy(image.getInputStream(), targetLocation);
        this.imageRepository.save(imageEntity);
        return ImageResponse.builder()
                .title(imageEntity.getTitle())
                .isPrivate(imageEntity.isPrivate())
                .fullnameUser(userDto.getFullname())
                .pseudoUser(userDto.getPseudo())
                .creationDate(date)
                .originName(this.host+extractNameUnique)
                .build();

        }


    public List<ImageResponse> getAllImages() {
        List<ImageEntity> images = this.imageRepository.findAll();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            UserDto userDto = (UserDto) authentication.getPrincipal();
            if(userDto.getRole().equals(RoleType.ROLE_ADMINISTRATEUR) || userDto.isHasPrivileges()){
                return imageMapper.toImageResponseList(images);
            }
            return  imageMapper.toImageResponseList(images.stream()
                            .filter(imageEntity -> !imageEntity.isPrivate()).toList()
            );
        }
        return imageMapper.toImageResponseList(images.stream()
                    .filter(imageEntity -> !imageEntity.isPrivate()).toList());
    }


    public ImageResponse updateImage(String name, String title, boolean isPrivate, MultipartFile newImage) throws IOException {
        ImageEntity imageFromBdd = imageRepository.findByOriginName(name)
                .orElseThrow(() -> new ImageNotFoundException("L'image " + name + " n'existe pas ou une erreur dans le chargement "));

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDto == null || (!(userDto.getRole().equals(RoleType.ROLE_ADMINISTRATEUR)) && !imageFromBdd.getUser().getMail().equals(userDto.getMail()))) {
            throw new SecurityException("Vous devez être le créateur de l'image ou un administrateur pour la modifier.");
        }
        if (title != null && !title.trim().isEmpty()) {
            imageFromBdd.setTitle(title);
        }
        imageFromBdd.setPrivate(isPrivate);
        if (newImage != null && !newImage.isEmpty()) {
            String originalFilename = newImage.getOriginalFilename();
            String extension = StringUtils.getFilenameExtension(originalFilename);

            if (!Constant.EXTENSIONS.contains(extension)) {
                throw new InstaException("L'extension : '" + extension + "' n'est pas autorisée");
            }

            String newFileName = generateNameFile(originalFilename, extension);
            Path targetLocation = this.fileStorageLocation.resolve(newFileName);

            Path oldImage = this.fileStorageLocation.resolve(imageFromBdd.getNameBdd());
            if (Files.exists(oldImage)) {
                Files.delete(oldImage);
            }
            Files.copy(newImage.getInputStream(), targetLocation);
            imageFromBdd.setNameBdd(newFileName);
        }

        imageRepository.save(imageFromBdd);

        return ImageResponse.builder()
                .title(imageFromBdd.getTitle())
                .isPrivate(imageFromBdd.isPrivate())
                .fullnameUser(userDto.getFullname())
                .pseudoUser(userDto.getPseudo())
                .creationDate(imageFromBdd.getCreationDate())
                .originName(this.host + imageFromBdd.getOriginName())
                .build();
    }



    public ImageResponse getImageByName(String name) {
        ImageEntity image = this.imageRepository.findByOriginName(name)
                .orElseThrow(() -> new ImageNotFoundException("L'image " + name + " n'existe pas ou une erreur dans le chargement "));
        return imageMapper.toImageResponse(image);
    }

    public void deleteByName(String name) throws AccessDeniedException {
        ImageEntity imageEntity = imageRepository.findByOriginName(name)
                .orElseThrow(() -> new ImageNotFoundException("L'image " + name + " n'existe pas ou une erreur lors de la suppression"));;
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(imageEntity.getUser().getMail().equals(userDto.getMail()) || userDto.getRole().equals(RoleType.ROLE_ADMINISTRATEUR)){
            deleteImageFromFolder(imageEntity);
            imageRepository.delete(imageEntity);
        }else{
            throw new AccessDeniedException("");
        }
    }

    public Resource downloadByName(String name) throws Exception {
            ImageEntity imageEntity = imageRepository.findByOriginName(name)
                    .orElseThrow(() -> new ImageNotFoundException("L'image " + name + " n'existe pas ou une erreur dans le chargement "));
            Path image = this.fileStorageLocation.resolve(imageEntity.getNameBdd());
            Resource resource = new UrlResource(image.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;

            } else {
                throw new ImageNotFoundException("L'image " + name + " n'existe pas ou une erreur dans le chargement ");
            }
    }

    private void deleteImageFromFolder(ImageEntity imageEntity){
        Path imagePath = this.fileStorageLocation.resolve(imageEntity.getNameBdd());
        try{
            Files.delete(imagePath);
        }catch(IOException exception){
            throw new InstaException("L'image n'a pas pu être supprimé");
        }
    }

    private void instantiateHost(){
        String port = environment.getProperty("server.port");
        String address = environment.getProperty("server.address");

        this.host = "http://" + address + ":" + port + "/images/download/";
    }

    private String generateNameFile(String name, String extension){
        String newName;
        newName = Long.toString(System.nanoTime()) + "-" + UUID.randomUUID().toString() +  "." + extension;
        return newName;
    }

    private String generateOriginNameFile(String extension){
        String newName = UUID.randomUUID().toString() + "." + extension;
        return newName;
    }
}
