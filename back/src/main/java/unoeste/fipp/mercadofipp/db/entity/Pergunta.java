package unoeste.fipp.mercadofipp.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Table(name="pergunta_anuncio")
@Entity
public class Pergunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="per_id")
    private Long id;
    @Column(name="per_text")
    private String text;
    @Column(name="per_resp")
    private String resp;

    //@OneToOne(fetch=FetchType.LAZY)
    @OneToOne
    @JoinColumn(name = "anu_id")
    //@JsonIgnore
    private Ad ad;

    public Pergunta(Long id, String text, String resp) {
        this.id = id;
        this.text = text;
        this.resp = resp;
    }

    public Pergunta() {
        this(0L,"","");
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getResp() {
        return resp;
    }

    public void setResp(String resp) {
        this.resp = resp;
    }

//    public Ad getAd() {
//        return ad;
//    }

    public void setAd(Ad ad) {
        this.ad = ad;
    }
}
