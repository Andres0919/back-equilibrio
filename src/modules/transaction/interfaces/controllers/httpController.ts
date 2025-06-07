import { HttpRequest, HttpResponse } from "../../../../shared/interfaces/http";

export interface HttpController<
  TRequest = HttpRequest,
  TResponse = HttpResponse
> {
  handle(request: TRequest): Promise<TResponse>;
}
