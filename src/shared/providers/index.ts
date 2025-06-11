import { ExpressServer } from "../infra/http/ExpressServer";

export const providers = {
  http: new ExpressServer(),
};
