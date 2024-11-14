package unoeste.fipp.mercadofipp.db.entity;

import jakarta.persistence.*;

@Table(name="foto_anuncio")
@Entity
public class Foto
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fot_id")
    private Long id;
    @Column(name = "fot_file")
    private String filename;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "anu_id")
    private Ad ad;

    public Foto(Long id, String filename) {
        this.id = id;
        this.filename = filename;
    }

    public Foto() {
        this(0L,"");
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

    public void setFilename(String name) {
        this.filename = name;
    }
}
