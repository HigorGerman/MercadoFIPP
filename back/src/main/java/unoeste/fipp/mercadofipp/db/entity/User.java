package unoeste.fipp.mercadofipp.db.entity;

import jakarta.persistence.*;

@Entity
@Table(name="usuario")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="usr_id")
    private Long id;
    @Column(name="usr_name")
    private String name;
    @Column(name="usr_pass")
    private String pass;
    @Column(name="usr_level")
    private char level;

    public User(Long id, String name, String pass, char level) {
        this.id = id;
        this.name = name;
        this.pass = pass;
        this.level = level;
    }

    public User() {
        this(0L,"","",'1');
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public char getLevel() {
        return level;
    }

    public void setLevel(char level) {
        this.level = level;
    }
}
