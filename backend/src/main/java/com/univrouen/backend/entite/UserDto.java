package com.univrouen.backend.entite;

import com.univrouen.backend.RoleType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Entity
@Table(name = "userDto")
public class UserDto  implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="password")
    private String password;
    private String pseudo;
    @Column(name="full_name")
    private String fullname;
    private String mail;
    @Column(name="img_url")
    private String imgUrl;
    @Enumerated(EnumType.STRING)
    private RoleType role;




    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(this.role.name()));
    }
    public String getPassword() {
        return this.password;
    }

    public String getUsername() {
        return this.mail;
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return true;
    }

}
