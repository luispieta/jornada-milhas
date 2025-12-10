import { Locator, Page, expect } from "@playwright/test";

export default class PaginaCadastro {
    private readonly page: Page;
    private readonly botaoCadastrese: Locator;
    private readonly inputNome: Locator;
    private readonly inputDataNascimento: Locator;
    private readonly checkBoxGenero: Locator;
    private readonly inputCpf: Locator;
    private readonly inputTelefone: Locator;
    private readonly inputCidade: Locator;
    private readonly inputEstado: Locator;
    private readonly inputEmail: Locator;
    private readonly inputConfirmarEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly inputConfirmarSenha: Locator;
    private readonly checkBoxTermos: Locator;
    private readonly botaoSubmeterForm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botaoCadastrese = page.getByTestId('header-botao-cadastre-se');
        this.inputNome = page.getByTestId('form-base-input-nome');
        this.inputDataNascimento = page.getByTestId('form-base-input-data-nascimento')
        this.checkBoxGenero = page.getByTestId('form-base-input-nome')
        this.inputCpf = page.getByTestId('form-base-input-cpf')
        this.inputTelefone = page.getByTestId('form-base-input-telefone')
        this.inputCidade = page.getByTestId('form-base-input-cidade')
        this.inputEstado = page.getByTestId('form-base-input-estado').getByLabel('Estado')
        this.inputEmail = page.getByTestId('form-base-input-email')
        this.inputConfirmarEmail = page.getByTestId('form-base-input-confirmar-email')
        this.inputSenha = page.getByTestId('form-base-input-senha')
        this.inputConfirmarSenha = page.getByTestId('form-base-input-confirmar-senha')
        this.checkBoxTermos = page.getByTestId('form-base-checkbox-termos').getByLabel('Li e aceito os termos e condições deste cadastro');
        this.botaoSubmeterForm = page.getByTestId('form-base-botao-submeter-form');
    }

    async visitar() {
        await this.page.goto("/");
        await this.botaoCadastrese.click();
        await expect(this.page).toHaveURL("/auth/cadastro");
    }
        /*
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
    */ 
}