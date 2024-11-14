package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.mercadofipp.db.entity.Ad;

import java.util.List;

public interface AdRepository extends JpaRepository<Ad,Long> {
    @Query(value="SELECT * FROM anuncio WHERE lower(anu_title) LIKE %:filter% or lower(anu_desc) LIKE %:filter%",nativeQuery=true)
    List<Ad> findWithFilter(@Param("filter")String filter);
}
