import PaginaPrincipal from "e2e/page-objects/PaginaPrincipal";
import PaginaLogin from "../page-objects/PaginaLogin";
import { test as base } from "@playwright/test";

/*Aqui irá exportar a pagina principal para o arquivo de testes*/
export const test = base.extend<{ 
    paginaLogin: PaginaLogin, 
    paginaPrincipal: PaginaPrincipal 
}>({
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

