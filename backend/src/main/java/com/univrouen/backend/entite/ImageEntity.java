package com.univrouen.backend.entite;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "image")
public class ImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private boolean isPrivate;
    private Date creationDate;
    private String originName;
    private String nameBdd;

    public boolean isPrivate(){
        return this.isPrivate;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDto user;

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Commentaire> commentaires;



}
