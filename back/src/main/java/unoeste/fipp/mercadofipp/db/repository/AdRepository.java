package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.mercadofipp.db.entity.Ad;

import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {

    // Método para filtrar anúncios com base no título ou descrição
    @Query(value="SELECT * FROM anuncio WHERE lower(anu_title) LIKE %:filter% or lower(anu_desc) LIKE %:filter%", nativeQuery=true)
    List<Ad> findWithFilter(@Param("filter") String filter);

    // Método para pegar os últimos N anúncios (ordenados por data)
    @Query(value="SELECT * FROM anuncio ORDER BY anu_date DESC LIMIT :limit", nativeQuery=true)
    List<Ad> findTopByOrderByDateDesc(@Param("limit") int limit);

    List<Ad> findAll(Specification<Ad> spec, Sort sort);
}