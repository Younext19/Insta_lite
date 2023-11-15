package com.univrouen.backend.entite;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "jwt")
public class Jwt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String value;
    //si le jwt e ete descativé
    private boolean desactive;
    //si le jwt a expiré
    private boolean expire;
    //pour dire que plusieurs jwt peuvent etre associe a un utilisateur
    //CascadeType.DETACH pour dire que si on supprime un jwt on ne supprime pas l'utilisateur
    //CascadeType.MERGE pour dire que si on modifie un jwt on ne modifie pas l'utilisateur
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "userdto_id")
    private UserDto userDto;

    @OneToOne(cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private TokenRefresh refreshToken;

}
