import { Locator, Page, expect } from "@playwright/test";

export default class PaginaLogin {
    private readonly page: Page;
    private readonly botaoLogin: Locator;
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly botaoAcessarConta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botaoLogin = page.getByTestId("botao-login");
        this.inputEmail = page.getByTestId("input-email");
        this.inputSenha = page.getByTestId("input-senha");
        this.botaoAcessarConta = page.getByTestId("botao-acessar-conta");
    }

    async visitar() {
        await this.page.goto("/");
        await this.botaoLogin.click();
        await expect(this.page).toHaveURL("/auth/login");
    }

    async fazerLogin(email: string, senha: string) {
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.botaoAcessarConta.click();
    }

    async loginFeitoComSucesso() {
        await expect(this.page).toHaveURL("/home");
    }

    async estaMostrandoMensagemDeErro(mensagem: string) {
        const elementoErro = this.page.getByText(mensagem);
        await expect(elementoErro).toBeVisible();
    }

    async campoEmailObrigatorio(email: string, mensagem: string) {
        const campoObrigatorio = this.page.getByText(mensagem);
        await this.inputEmail.fill(email);
        await this.inputSenha.click();
        await expect(campoObrigatorio).toBeVisible();
    }

    async formularioEmBranco(email:string, senha: string, mensagem: string) {
        const campoEmBranco = this.page.getByText(mensagem);
        await this.inputEmail.fill(email);
        await this.inputSenha.click();
        await this.inputSenha.fill(senha);
        await expect(campoEmBranco).toBeVisible();
    } 
}