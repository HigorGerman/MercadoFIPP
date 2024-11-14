package unoeste.fipp.mercadofipp.db.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "foto_anuncio")
public class Foto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fot_id")
    private Long id;

    @Column(name = "fot_file")
    private String filename;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "anu_id")
    private Ad ad;
    public Foto(Long id, String filename, Ad ad) {
        this.id = id;
        this.filename = filename;
        this.ad = ad;
    }
    public Foto() {
        // Valores padrão sem chamar outro construtor
        this.id = 0L;
        this.filename = "";
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getFilename() {
        return filename;
    }
    public void setFilename(String filename) {
        this.filename = filename;
    }
    public Ad getAd() {
        return ad;
    }
    public void setAd(Ad ad) {
        this.ad = ad;
    }
}
