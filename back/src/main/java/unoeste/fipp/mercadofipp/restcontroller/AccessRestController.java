package unoeste.fipp.mercadofipp.restcontroller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.db.entity.User;
import unoeste.fipp.mercadofipp.service.UserService;

import java.util.Map;

@RestController
@RequestMapping(value = "access/")
public class AccessRestController {

    @Autowired
    private UserService userService; // Injeção do UserService

    // Endpoint para login
    @PostMapping(value = "login")
    public ResponseEntity<Object> login(@Valid @RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("user");
        String password = loginRequest.get("pass");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Nome de usuário e senha são obrigatórios."
            ));
        }

        // Busca o usuário no banco
        var userFound = userService.getAllUsers()
                .stream()
                .filter(user -> user.getName().equals(username) && user.getPass().equals(password))
                .findFirst();

        if (userFound.isPresent()) {
            User loggedUser = userFound.get();

            // Retorna as informações do usuário logado
            return ResponseEntity.ok(Map.of(
                    "message", "Login bem-sucedido!",
                    "userId", loggedUser.getId(),
                    "username", loggedUser.getName(),
                    "accessLevel", String.valueOf(loggedUser.getLevel())
            ));
        } else {
            // Credenciais inválidas
            return ResponseEntity.status(401).body(Map.of(
                    "error", "Credenciais inválidas."
            ));
        }
    }

    @PostMapping(value = "register")
    public ResponseEntity<Object> register(@Valid @RequestBody User newUser) {
        try {
            // Verifica se o nome de usuário já existe
            if (userService.userExists(newUser.getName())) {
                return ResponseEntity.status(409).body(Map.of(
                        "error", "Usuário já existe. Escolha outro nome."
                ));
            }

            // Salva o novo usuário no banco
            User savedUser = userService.saveUser(newUser);

            // Retorna resposta de sucesso
            return ResponseEntity.ok(Map.of(
                    "message", "Usuário cadastrado com sucesso!",
                    "userId", savedUser.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Erro ao cadastrar usuário. Tente novamente mais tarde."
            ));
        }
    }


    @PostMapping(value = "admin-login")
    public ResponseEntity<Object> adminLogin(@Valid @RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("user");
        String password = loginRequest.get("pass");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Nome de usuário e senha são obrigatórios."
            ));
        }

        // Busca o administrador no banco
        var adminFound = userService.getAllUsers()
                .stream()
                .filter(user -> user.getName().equals(username)
                        && user.getPass().equals(password)
                        && user.getLevel() == 'A') // Checa se o nível é 'A'
                .findFirst();

        if (adminFound.isPresent()) {
            User adminUser = adminFound.get();

            // Retorna as informações do administrador logado
            return ResponseEntity.ok(Map.of(
                    "message", "Login administrativo bem-sucedido!",
                    "userId", adminUser.getId(),
                    "username", adminUser.getName(),
                    "accessLevel", "Administrador"
            ));
        } else {
            // Credenciais inválidas ou não é administrador
            return ResponseEntity.status(401).body(Map.of(
                    "error", "Credenciais inválidas ou acesso não autorizado."
            ));
        }
    }
}
