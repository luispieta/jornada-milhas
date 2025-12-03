import { Page, Locator, expect } from "@playwright/test";

export default class PaginaPrincipal {
    private readonly page: Page;
    private readonly campoDropdownOrigem: Locator;
    private readonly campoDropdownDestino: Locator;
    private readonly campoDataIda: Locator;
    private readonly botaoSomenteIda: Locator;
    private readonly botaoBuscarPassagens: Locator;
    private readonly botaoAbrirModalPassageiros: Locator;
    private readonly botaoFecharModalPassageiros: Locator;
    private readonly botaoIncrementarAdultos: Locator;
    private readonly botaoIncrementarCriancas: Locator;
    private readonly botaoIncrementarBebes: Locator;
    private readonly textoTipoTrajeto: Locator;
    private readonly containerOrigem: Locator;
    private readonly containerDestino: Locator;
    private readonly botaoComprar: Locator;
    private readonly textoDataIda: Locator;


    constructor(page: Page) {
        this.page = page;
        this.botaoSomenteIda = page.getByTestId("botao-somente-ida")
        this.campoDropdownOrigem = page.getByTestId("campo-dropdown-origem").getByLabel("Origem");
        this.campoDropdownDestino = page.getByTestId("campo-dropdown-destino").getByLabel("Destino");
        this.campoDataIda = page.getByTestId("campo-data-ida");
        this.botaoBuscarPassagens = page.getByTestId("botao-buscar-passagens");
        this.botaoAbrirModalPassageiros = page.getByTestId("abrir-modal-passageiros");
        this.botaoFecharModalPassageiros = page.getByTestId("fechar-modal-passageiros");
        this.botaoIncrementarAdultos = page.getByTestId('seletor-passageiro-adultos').getByRole('button', { name: 'adição' });
        this.botaoIncrementarCriancas = page.getByTestId('seletor-passageiro-criancas').getByRole('button', { name: 'adição' });
        this.botaoIncrementarBebes = page.getByTestId('seletor-passageiro-bebes').getByRole('button', { name: 'adição' });
        this.textoTipoTrajeto = page.getByTestId('texto-ida-volta');
        this.containerOrigem = page.getByTestId('container-origem');
        this.containerDestino = page.getByTestId('container-destino');
        this.botaoComprar = page.getByTestId('botao-comprar');
        this.textoDataIda = page.getByTestId('texto-data-ida');

    }

    private obterDataExibicao(data: Date) {
        return data.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit' });
    }

    async visitar() {
        await this.page.goto("/");
    }

    async selecionarBotaoDeSomenteIda() {
        await this.botaoSomenteIda.click();
    }

    async buscarPassagens() {
        await this.botaoBuscarPassagens.click();
    }

    async abrirModalPassageiros() {
        await this.botaoAbrirModalPassageiros.click();
    }

    async definirPassageirosAdultos(quantidade: number) {
        for(let i = 1; i < quantidade; i++) {
            await this.botaoIncrementarAdultos.click();
        }
    }

    async definirPassageirosCriancas(quantidade: number) {
        for(let i = 0; i < quantidade; i++) {
            await this.botaoIncrementarCriancas.click();
        }
    }

    async definirPassageirosBebes(quantidade: number) {
        for(let i = 0; i < quantidade; i++) {
            await this.botaoIncrementarBebes.click();
        }
    }
    
    async fecharModalPassageiros() {
        await this.botaoFecharModalPassageiros.click();
    }

    async preencherOrigemEDestino(origem: string, destino: string) {
        await this.campoDropdownOrigem.fill(origem);
        await this.campoDropdownOrigem.press("Enter");
        await this.campoDropdownDestino.fill(destino);
        await this.campoDropdownDestino.press("Enter");
    }

    async preencherDataIda(dataIda: Date) {
        const dataFormatadaIda = dataIda.toLocaleString("pt-BR", {dateStyle: "short"});
        
        await this.campoDataIda.fill(dataFormatadaIda);
    }

    async estaMostrandoPassagem(
        tipoTrajeto: "Somente ida" | "Ida e volta",
        origem: string,
        destino: string,
        dataIda: Date
    ) {
        const dataIdaExibicao = this.obterDataExibicao(dataIda);

        //toHaveText é para mostrar o texto fixo, já no toContainText pode ter qualquer texto
        await expect(this.textoTipoTrajeto).toHaveText(tipoTrajeto);
        await expect(this.containerOrigem).toContainText(origem);
        await expect(this.containerDestino).toContainText(destino);
        await expect(this.textoDataIda).toHaveText(dataIdaExibicao);
        await expect(this.botaoComprar).toBeVisible();
    }

}