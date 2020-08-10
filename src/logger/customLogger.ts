import Pino from "pino";

const logger = Pino();
export function logMessage(message: string) {
  logger.info(message);
}
