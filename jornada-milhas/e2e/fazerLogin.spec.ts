import test from "@playwright/test"
import PaginaLogin from "./page-objects/PaginaLogin"

test.describe("Página de Login", () => {
    test("Deve conseguir realizar o login com email e senha válidos", async({page}) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar();
        await paginaLogin.fazerLogin("lufelipepieta@gmail.com", "Pieta2006*");
        await paginaLogin.loginFeitoComSucesso();
    });

    test("Não deve fazer logn com o email inválido", async({page}) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar();    
        await paginaLogin.fazerLogin("luiserrado@gmail.com", "Pieta2006*");
        await paginaLogin.estaMostrandoMensagemDeErro("Você não está autorizado a acessar este recurso");
    });

    test("Deve mostrar uma validação quando o usuário digitou o email incorretamente", async({page}) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar();    
        await paginaLogin.campoEmailObrigatorio("luiserradogmail.com", "E-mail inválido");
    });

    test("Deve apresentar uma mensagem de erro quando o usuário deixar um campo em branco ao realizar o login", async({page}) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar();
        await paginaLogin.formularioEmBranco("", "Pieta2006*", "E-mail é obrigatório");
    });
});