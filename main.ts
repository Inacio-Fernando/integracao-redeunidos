
import ExpressAdapter from "./clientes/shared/infra/http/ExpressAdapter";
import HttpController from "./HttpController";
 
const httpServer = new ExpressAdapter();
new HttpController(
	httpServer
);
httpServer.listen(3000);