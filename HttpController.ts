import path from "path";
import HttpServer from "./clientes/shared/infra/http/HttpServer";


export default class HttpController {
	constructor(
		readonly httpServer: HttpServer
	) {
		
		httpServer.on(
			'get',
			'/:cliente/:func',
			async function (params: any, body: any) {

                const cliente = params.cliente;
                const func = params.func;
            
                try {
                    const clienteModule = require(path.join(__dirname, 'clientes', cliente, 'index.ts'));
                    if (typeof clienteModule[func] !== 'function') {
                        throw new Error(`Function ${func} not found in module ${cliente}`);
                    }
                    const result = await clienteModule[func]();
                    return result;
                } catch (err) {
                    console.error(`Erro ao carregar o módulo para ${cliente}:`, err);
                    throw new Error(`Erro ao carregar o módulo para ${cliente}`);
                }

				
			},
		);
	}
}