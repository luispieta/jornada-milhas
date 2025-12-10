import PaginaPrincipal from "e2e/page-objects/PaginaPrincipal";
import PaginaLogin from "../page-objects/PaginaLogin";
import PaginaCadastro from "e2e/page-objects/PaginaCadastro";
import { test as base } from "@playwright/test";

/*Aqui irá exportar a pagina principal para o arquivo de testes*/
export const test = base.extend<{ 
    paginaLogin: PaginaLogin, 
    paginaPrincipal: PaginaPrincipal 
    paginaCadastro: PaginaCadastro
}>({
    paginaCadastro: async ({ page }, use) => {
        const paginaCadastro = new PaginaCadastro(page);
        await paginaCadastro.visitar();
        await use(paginaCadastro);
    },
    paginaLogin: async ({ page }, use) => {
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await use(paginaLogin);
    },
    paginaPrincipal: async ({ page }, use) => {
        const paginaPrincipal = new PaginaPrincipal(page);
        await paginaPrincipal.visitar();
        await use(paginaPrincipal);
    }
});

