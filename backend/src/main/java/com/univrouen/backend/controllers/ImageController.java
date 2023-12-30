package com.univrouen.backend.controllers;


import com.univrouen.backend.config.FileTypeDetector;
import com.univrouen.backend.config.ResponseConfig.ImageResponse;
import com.univrouen.backend.service.ImageService;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.Resource;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.Base64;
import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("images")
public class ImageController {


    private ImageService imageService;


    //C
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR')")
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

    @GetMapping("/{name}")
    public ResponseEntity<ImageResponse> getImageByName(@PathVariable String name){
        return ResponseEntity.status(HttpStatus.OK).body(this.imageService.getImageByName(name));
    }

    //U
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR')")
    @PatchMapping ("/update/{name}")
    public ResponseEntity<ImageResponse> updateImage(@PathVariable String name, @RequestParam ("title") String title,
                                                     @RequestParam ("isPrivate") boolean isPrivate,
                                                     @RequestParam("image") MultipartFile image) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(this.imageService.updateImage(name,title,isPrivate,image));

    }


    //D
    @PreAuthorize("hasAnyAuthority('ROLE_ADMINISTRATEUR')")
    @DeleteMapping("/{name}")
    public ResponseEntity deleteByName(@PathVariable String name) throws AccessDeniedException {
        this.imageService.deleteByName(name);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }



    @GetMapping("/download/{name}")
    public ResponseEntity<String> downloadByName(@PathVariable String name) throws Exception {
        Resource image = imageService.downloadByName(name);
        String mimeType;
        try {
            mimeType = FileTypeDetector.determineFileType(image.getFile());
        } catch (IOException ex) {
            throw new RuntimeException("Impossible de determiner le type du fichier " + name);
        }

        byte[] fileContent = FileUtils.readFileToByteArray(image.getFile());

        return ResponseEntity.ok(Base64.getEncoder().encodeToString(fileContent));
    }
}


