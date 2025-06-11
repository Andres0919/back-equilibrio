export interface HttpProvider {
  registerRoute(path: string, routeHandler: any): void;
  listen(port: number): Promise<void>;
  getServerInstance(): any;
}
