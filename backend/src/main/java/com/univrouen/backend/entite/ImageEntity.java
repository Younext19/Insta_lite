package com.univrouen.backend.entite;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


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
    private String imgUrl;
    private boolean isPrivate;
    private Date creationDate;


    public boolean isPrivate(){
        return this.isPrivate;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDto user;



}
