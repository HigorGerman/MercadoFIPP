package unoeste.fipp.mercadofipp.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "O nome de usuário é obrigatório")
    private String user;

    @NotBlank(message = "A senha é obrigatória")
    private String pass;

    public LoginRequest() {
    }

    public LoginRequest(String user, String pass) {
        this.user = user;
        this.pass = pass;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}
