package unoeste.fipp.mercadofipp.restcontroller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.dto.LoginRequest;
import unoeste.fipp.mercadofipp.db.entity.User;
import unoeste.fipp.mercadofipp.db.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping(value = "access/")
public class AccessRestController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userFound = userRepository.findByNameAndPass(
                loginRequest.getUser(),
                loginRequest.getPass()
        );

        if (userFound.isPresent()) {
            User loggedUser = userFound.get();
            String levelDescription;

            switch (loggedUser.getLevel()) {
                case 'a':
                    levelDescription = "Administrador";
                    break;
                case 'v':
                    levelDescription = "Vendedor";
                    break;
                case 'c':
                    levelDescription = "Cliente";
                    break;
                default:
                    levelDescription = "Desconhecido";
                    break;
            }

            return ResponseEntity.ok("Login bem-sucedido! Nível de acesso: " + levelDescription);
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }
}
