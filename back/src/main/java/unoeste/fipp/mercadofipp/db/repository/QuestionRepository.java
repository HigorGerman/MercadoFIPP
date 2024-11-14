package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unoeste.fipp.mercadofipp.db.entity.Pergunta;

public interface QuestionRepository extends JpaRepository<Pergunta,Long> {
}
