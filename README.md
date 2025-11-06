# 🛒 MercadoFIPP


Um projeto acadêmico de marketplace (simulador de OLX/Mercado Livre) desenvolvido como parte da graduação em Sistemas de Informação.

## 📖 Sobre o Projeto

O MercadoFIPP é uma plataforma web full stack que permite a compra e venda de produtos novos e usados. O principal desafio do projeto foi construir um sistema de segurança robusto e com diferentes níveis de permissão, garantindo que cada tipo de usuário tivesse acesso apenas às funcionalidades relevantes para ele.

---

## ✨ Funcionalidades Principais

O sistema é dividido em três níveis de acesso:

### 👤 Nível Administrador
* Login administrativo seguro.
* Visualização de **todos** os anúncios cadastrados na plataforma.
* Capacidade de **excluir** qualquer anúncio de qualquer vendedor.

### 👨‍💼 Nível Vendedor
* Login e cadastro de Vendedor.
* Pode **cadastrar** novos anúncios (com título, descrição, categoria, valor, data e fotos).
* Pode visualizar e **excluir apenas os seus próprios** anúncios.

### 🌎 Nível Usuário/Visitante
* Visualização dos últimos anúncios na página inicial.
* Sistema de **busca avançada** com filtros por:
    * Título do anúncio
    * Faixa de Preço (Mínimo e Máximo)
    * Ordenação (A-Z)

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando:

* **Back-end:**
    * [Java](https://www.java.com/pt-BR/)
    * [Spring Boot](https://spring.io/projects/spring-boot) (para a API REST)
    * [Spring Security](https://spring.io/projects/spring-security) (para autenticação e autorização baseada em roles)
    * [Spring Data JPA / Hibernate](https://spring.io/projects/spring-data-jpa) (para persistência de dados)

* **Front-end:**
    * HTML5
    * CSS3
    * JavaScript

---

## 📸 Screenshots

<img width="1919" height="552" alt="image" src="https://github.com/user-attachments/assets/de964b47-fc51-4a49-b840-d249bdee23c5" />
<img width="1200" height="706" alt="image" src="https://github.com/user-attachments/assets/0b3b8f4e-0637-4bd0-846f-5bd081946fcf" />
<img width="1919" height="486" alt="image" src="https://github.com/user-attachments/assets/2bfa4783-4c39-47f0-b183-da900a28f277" />


