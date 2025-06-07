import { Request, Response } from "express";
import { HttpController } from "../../../controllers/httpController";
import { HttpRequest } from "../../../../../../shared/interfaces/http";

export function expressRouteAdapter(controller: HttpController) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const httpResponse = await controller.handle(httpRequest);
    return res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
