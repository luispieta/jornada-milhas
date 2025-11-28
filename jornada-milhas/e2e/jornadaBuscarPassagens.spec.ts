import test from "@playwright/test";
import PaginaPrincipal from "./page-objects/PaginaPrincipal";

test.describe("Buscar Passagens", () => {
    test("Deve buscar passagem de somente ida", async ({page}) => {
        const paginaPrincipal = new PaginaPrincipal(page);

        await paginaPrincipal.visitar();
        await paginaPrincipal.selecionarBotaoDeSomenteIda();
        await paginaPrincipal.abrirModalPassageiros();
        await paginaPrincipal.definirPassageirosAdultos(4);
        await paginaPrincipal.definirPassageirosCriancas(2);
        await paginaPrincipal.definirPassageirosBebes(1);
        await paginaPrincipal.fecharModalPassageiros();

        await paginaPrincipal.preencherOrigemEDestino("minas gerais", "rio de janeiro");
        await paginaPrincipal.preencherDataIdaEDataVolta(new Date("06/03/2024"));
        await paginaPrincipal.buscarPassagens();

        await paginaPrincipal.estaMostrandoPassagem("Somente ida", "Minas Gerai", "Rio de Janeiro");
    });
});