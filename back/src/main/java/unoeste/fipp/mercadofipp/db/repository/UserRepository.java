package unoeste.fipp.mercadofipp.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unoeste.fipp.mercadofipp.db.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByNameAndPass(String user, String pass);
}
