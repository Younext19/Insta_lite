package com.univrouen.backend.service;


import com.univrouen.backend.RoleType;
import com.univrouen.backend.config.CONSTANT.Constant;
import com.univrouen.backend.config.mapper.ImageMapper;
import com.univrouen.backend.config.ResponseConfig.ImageResponse;
import com.univrouen.backend.entite.ImageEntity;
import com.univrouen.backend.entite.UserDto;
import com.univrouen.backend.exception.InstaException;
import com.univrouen.backend.repository.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.rmi.RemoteException;
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
        Date date = new Date();
        ImageEntity imageEntity = ImageEntity.builder()
                .title(title)
                .isPrivate(isPrivate)
                .user(userDto)
                .name(this.host+fileName)
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
                .name(this.host+fileName)
                .build();

        }


    private String generateNameFile(String name, String extension){
        String newName;
        newName = System.currentTimeMillis() + UUID.randomUUID().toString() +  "." + extension;
        return newName;
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
                        .filter(imageEntity -> !imageEntity.isPrivate()).toList()
                      );
            }
        }
        else {
            return  imageMapper.toImageResponseList(images.stream()
                    .filter(imageEntity -> !imageEntity.isPrivate()).toList());
        }
    }


    public ImageResponse updateImage(Long id, String title, boolean isPrivate, MultipartFile image) throws IOException {
        ImageEntity imageFromBdd = imageRepository.findById(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)){
            UserDto userDto = (UserDto) authentication.getPrincipal();
            if(imageFromBdd.getUser().getMail().equals(userDto.getMail()) || userDto.getRole().equals(RoleType.ROLE_ADMINISTRATEUR)) {
                if (title != null && !title.isEmpty() && !title.isBlank()) {
                    imageFromBdd.setTitle(title);
                }
                if (!image.isEmpty() && !image.getOriginalFilename().isBlank() || !image.getOriginalFilename().isEmpty()) {
                    Path targetLocation = this.fileStorageLocation.resolve(image.getOriginalFilename());
                    Files.copy(image.getInputStream(), targetLocation);
                    this.imageRepository.save(imageFromBdd);
                    return ImageResponse.builder()
                            .creationDate(new Date())
                            .isPrivate(isPrivate)
                            .title(title)
                            .fullnameUser(userDto.getFullname())
                            .pseudoUser(userDto.getPseudo())
                            .build();
                } else {
                    throw new RuntimeException("erreur dans les infos saisies");
                }
            } else {
                throw new RemoteException("faut etre le createur de l'image ou un admin pour modifier !");
            }

        } else {
            throw new RemoteException("faut etre connecté et  createur de l'image ou un admin pour modifier !");

        }

    }



    private void instantiateHost(){
        String port = environment.getProperty("server.port");
        String address = environment.getProperty("server.address");

        this.host = "http://" + address + ":" + port + "/images/";
    }

    public ImageResponse getImageById(int id) {
        ImageEntity image = this.imageRepository.findById((id)).orElseThrow(()->
                new UsernameNotFoundException("Image with id  =  " + id + "does not exist")

        );
        return imageMapper.toImageResponse(image);
    }

    public void deleteById(int id) throws AccessDeniedException {
        ImageEntity imageEntity = imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found with this id: " + id));

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(imageEntity.getUser().getMail().equals(userDto.getMail()) || userDto.getRole().equals(RoleType.ROLE_ADMINISTRATEUR)){
            deleteImageFromFolder(imageEntity);
            imageRepository.delete(imageEntity);
        }else{
            throw new AccessDeniedException("");
        }
    }

    private void deleteImageFromFolder(ImageEntity imageEntity){
        Path imagePath = this.fileStorageLocation.resolve(imageEntity.getName());
        try{
            Files.delete(imagePath);
        }catch(IOException exception){
            throw new InstaException("L'image n'a pas pu être supprimé");
        }
    }

    }
