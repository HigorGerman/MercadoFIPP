package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import unoeste.fipp.mercadofipp.db.entity.Pergunta;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Pergunta, Long> {

    // Busca perguntas pelo ID do anúncio
    List<Pergunta> findByAdId(Long adId);

    // Busca perguntas pendentes de resposta por um vendedor
    @Query("SELECT q FROM Pergunta q WHERE q.ad.user.id = :sellerId AND q.resp IS NULL")
    List<Pergunta> findPendingQuestionsBySeller(@Param("sellerId") Long sellerId);

}
