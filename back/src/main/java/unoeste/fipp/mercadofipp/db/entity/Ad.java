package unoeste.fipp.mercadofipp.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "anuncio")
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "anu_id")
    private Long Id;
    @Column(name = "anu_title")
    private String title;
    @Column(name = "anu_date")
    private LocalDate date;
    @Column(name = "anu_desc")
    private String descr;
    @Column(name = "anu_price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "cat_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "ad")
    private List<Foto> fotos;

    @OneToMany(mappedBy = "ad")
    private List<Pergunta> perguntas;

    public Ad(Long id, String title, LocalDate date, String descr, double price, Category category, User user, List<Foto> fotos,
              List<Pergunta> perguntas) {
        Id = id;
        this.title = title;
        this.date = date;
        this.descr = descr;
        this.price = price;
        this.category = category;
        this.user = user;
        this.fotos = fotos;
        this.perguntas = perguntas;
    }

    public Ad() {
        this(0L, "", LocalDate.now(), "", 0, null, null, null, null);
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Foto> getFotos() {
        return fotos;
    }

    public void setFotos(List<Foto> fotos) {
        this.fotos = fotos;
    }

    public List<Pergunta> getPerguntas() {
        return perguntas;
    }

    public void setPerguntas(List<Pergunta> perguntas) {
        this.perguntas = perguntas;
    }

}
