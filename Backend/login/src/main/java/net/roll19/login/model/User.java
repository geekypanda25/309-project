package net.roll19.login.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true)
    private int id;

    @Length(min = 2, max = 32, message = "Names must be between 2 and 32 characters long.")
    @Column(name = "username", unique = true, nullable = false)
    @NotEmpty(message = "Choose a username")
    private String username;

    private String avatar;
    private boolean verified;

    @Email(message = "Please enter a valid email")
    @NotEmpty(message = "Enter a email address")
    @Column(name = "email")
    private String email;
}


//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "user_id")
//    private int id;
//    @Column(name = "email")
//    @Email(message = "*Please provide a valid Email")
//    @NotEmpty(message = "*Please provide an email")
//    private String email;
//    @Column(name = "password")
//    @Length(min = 5, message = "*Your password must have at least 5 characters")
//    @NotEmpty(message = "*Please provide your password")
//    private String password;
//    @Column(name = "name")
//    @NotEmpty(message = "*Please provide your name")
//    private String name;
//    @Column(name = "last_name")
//    @NotEmpty(message = "*Please provide your last name")
//    private String lastName;
//    @Column(name = "active")
//    private int active;
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Role> roles;


//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private int id;
//
//    @Column(name = "email")
//    @Email(message = "Please enter a valid email address.")
//    @NotEmpty(message = "Please enter your email address.")
//    private String email;
//
//    @Column(name = "first_name")
//    @NotEmpty(message = "Please enter your first name.")
//    private String first_name;
//
//    @Column(name = "gender")
//    @NotEmpty(message = "Please select your gender.")
//    private String gender;
//
//    @Column(name = "last_name")
//    @NotEmpty(message = "Please enter your last name.")
//    private String last_name;
//
//    @Column(name = "link")
//    private String link;
//
//    @Column(name = "middle_name")
//    private String middle_name;
//
//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "password")
//    @NotEmpty(message = "Please enter your password.")
//    @Length(min = 6, message = "Your password must have at least 6 characters.")
//    private String password;
//
//    @Column(name = "active")
//    private int active;
//
//    @Column(name = "banned")
//    private int banned;
//
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Role> roles;
//
//    @Column(name = "since")
//    private int since;
//
//    @Column(name = "last_login")
//    private int last_login;
//
//    @Column(name = "time_zone")
//    private String time_zone;
