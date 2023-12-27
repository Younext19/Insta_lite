package com.univrouen.backend.controllers;


import com.univrouen.backend.config.ResponseConfig.ImageResponse;
import com.univrouen.backend.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("images")
public class ImageController {


    private ImageService imageService;


    //C
    @PostMapping("/upload")
    public ResponseEntity<ImageResponse> upload(@RequestParam("image") MultipartFile image,@RequestParam("title") String title,
                                                @RequestParam("isPrivate") boolean isPrivate) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.imageService.uploadImage(image, title,isPrivate));
    }

    //R
    @GetMapping
    public ResponseEntity<List<ImageResponse>> getAllImages(){
        return ResponseEntity.status(HttpStatus.OK).body(this.imageService.getAllImages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageResponse> getUserById(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body(this.imageService.getImageById(id));
    }

    //U
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR')")

    @PatchMapping ("/update/{id}")
    public ResponseEntity<ImageResponse> updateImage(@PathVariable Long id, @RequestParam ("title") String title,
                                                     @RequestParam ("isPrivate") boolean isPrivate,
                                                     @RequestParam("image") MultipartFile image) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(this.imageService.updateImage(id,title,isPrivate,image));

    }


    //D
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR')")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteById(@PathVariable int id) throws AccessDeniedException {
        this.imageService.deleteById(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }










//    @PostMapping
//    public Image

}

