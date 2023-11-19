package com.univrouen.backend.controllers;


import com.univrouen.backend.dto.RequestConfig.ImageRequest;
import com.univrouen.backend.dto.ResponseConfig.ImageResponse;
import com.univrouen.backend.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@AllArgsConstructor
@RestController
@RequestMapping("images")
public class ImageController {


    private ImageService imageService;



    @PostMapping("upload")
    public ResponseEntity<ImageResponse> upload(@RequestParam("image") MultipartFile image,@RequestParam("title") String title,
    @RequestParam("isPrivate") boolean isPrivate) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.imageService.uploadImage(image, title,isPrivate));
    }



//    @PostMapping
//    public Image

}

