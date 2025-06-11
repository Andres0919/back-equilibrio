import express, { Router, RequestHandler } from "express";
import { HttpProvider } from "../../interfaces/http";

export class ExpressServer implements HttpProvider {
  private app = express();

  registerRoute(path: string, routeHandler: Router | RequestHandler) {
    this.app.use(path, routeHandler);
  }

  async listen(port: number) {
    return new Promise<void>((resolve) => {
      this.app.listen(port, () => {
        console.log(`Express server listening on port ${port}`);
        resolve();
      });
    });
  }

  getServerInstance() {
    return this.app;
  }
}
