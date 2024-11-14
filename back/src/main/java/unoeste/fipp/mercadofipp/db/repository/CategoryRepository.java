package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unoeste.fipp.mercadofipp.db.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
