export interface HttpRequest<
  TBody = unknown,
  TParams = unknown,
  TQuery = unknown,
  THeaders = unknown
> {
  body: TBody;
  params: TParams;
  query: TQuery;
  headers: THeaders;
}

export interface HttpResponse<T = unknown> {
  statusCode: number;
  body: T;
}
