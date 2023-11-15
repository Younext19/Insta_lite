//package com.univrouen.backend.service;
//
//
//import com.univrouen.backend.entite.Validation;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@AllArgsConstructor
//@Service
//public class ConfirmationCodeService {
//
//    private JavaMailSender javaMailSender;
//
//
//    public void envoyerNotification(Validation validation){
//        SimpleMailMessage mailMessage  = new SimpleMailMessage();
//        mailMessage.setFrom("ilyes@gmail.com");
//        mailMessage.setTo(validation.getUserDto().getMail());
//        mailMessage.setSubject("Votre code d'activation");
//        mailMessage.setText(String.format("Bonjour %s, votre code d'activation est %s, il expire a %s",validation.getUserDto().getFullname(),validation.getCode(), validation.getExpiration()));
//        javaMailSender.send(mailMessage);
//    }
//}
//
