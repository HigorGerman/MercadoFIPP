package unoeste.fipp.mercadofipp.restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="access/")
public class AccessRestController {
    @PostMapping(value = "login")
    public ResponseEntity<Object> login(String user, String pass)
    {
        return null;
    }
}
