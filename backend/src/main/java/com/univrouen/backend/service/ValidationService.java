//package com.univrouen.backend.service;
//
//import com.univrouen.backend.entite.UserDto;
//import com.univrouen.backend.entite.Validation;
//import com.univrouen.backend.repository.ValidationRepository;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.Random;
//
//@AllArgsConstructor
//@Slf4j
//
//@Service
//public class ValidationService {
//    private ValidationRepository validationRepository;
//    private ConfirmationCodeService notificationService;
//
//    //stocker une validation
//    public void enregistrer(UserDto userDto){
//        Validation validation = new Validation();
//        validation.setUserDto(userDto);
//        Instant creation = Instant.now();
//        validation.setCreation(creation);
//        Instant expiration = creation.plus(10, ChronoUnit.MINUTES);
//        validation.setExpiration(expiration);
//        Random random = new Random();
//        int randomInteger = random.nextInt(99999);
//        String code = String.format("%06d",randomInteger);
//        validation.setCode(code);
//        this.validationRepository.save(validation);
//        this.notificationService.envoyerNotification(validation);
//        log.info("tttt");
//
//    }
//
//
//    public Validation lireEnFontionDuCode(String code){
//        return this.validationRepository.findByCode((code)).orElseThrow(() -> new RuntimeException("Votre code est invalide"));
//
//
//    }
//}
//
