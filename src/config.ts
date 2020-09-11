import EnvironmentConfig from "./config-types/EnvironmentConfig";

/** Development environment config */
const development: EnvironmentConfig = {
  app: {
    port: 3000,
  },
  db: {
    dbConnectionUrl: "mongodb://localhost:27017/expert-assert",
  },
  aws: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: "expertassertbucket01",
  },
  security: {
    JWT_TIMEOUT_IN_SECONDS: "600s",
    JWT_ACCESS_TOKEN_SECRET:
      "02ecbaecfb5cd9d77f33715c0fda0bd65366a8f25fc95e43da8999c58c7ee2dd5e1a97d5e3dbb55a0a8914f30253847146948133010605586e6b5f42e7d254be",
    JWT_REFRESH_TOKEN_SECRET:
      "69c4a7f320355fefc4829a2f1bc20e1ccb7956eab6256bf5587385d50c4c568f4f24842ccc37945d6ac785521e9a2ebf96cb21e80187b68eff91c2f641ddae6a",
  },
};

/** Staging environment config */
const staging: EnvironmentConfig = {
  app: {
    port: 5000,
  },
  db: {
    dbConnectionUrl: "mongodb://localhost:27017/expert-assert",
  },
  aws: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: "expertassertbucket01",
  },
  security: {
    JWT_TIMEOUT_IN_SECONDS: "600s",
    JWT_ACCESS_TOKEN_SECRET:
      "02ecbaecfb5cd9d77f33715c0fda0bd65366a8f25fc95e43da8999c58c7ee2dd5e1a97d5e3dbb55a0a8914f30253847146948133010605586e6b5f42e7d254be",
    JWT_REFRESH_TOKEN_SECRET:
      "69c4a7f320355fefc4829a2f1bc20e1ccb7956eab6256bf5587385d50c4c568f4f24842ccc37945d6ac785521e9a2ebf96cb21e80187b68eff91c2f641ddae6a",
  },
};


/** Selecting the environment based on the env name defined in
 * enviroment variable */
let environmentToExport: EnvironmentConfig;

switch (process.env.NODE_ENV) {
  case "staging":
    environmentToExport = staging;
    break;
  case "development":
    environmentToExport = development;
    break;
  default:
    environmentToExport = development;
}

export default environmentToExport;

/*export const port: number = 3000;
export const dbConnectionUrl: string = "mongodb://localhost:27017/expert-assert";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_S3_BUCKET_NAME = "expertassertbucket01";

export const JWT_TIMEOUT_IN_SECONDS = "600s";
export const JWT_ACCESS_TOKEN_SECRET =
  "02ecbaecfb5cd9d77f33715c0fda0bd65366a8f25fc95e43da8999c58c7ee2dd5e1a97d5e3dbb55a0a8914f30253847146948133010605586e6b5f42e7d254be";
export const JWT_REFRESH_TOKEN_SECRET =
  "69c4a7f320355fefc4829a2f1bc20e1ccb7956eab6256bf5587385d50c4c568f4f24842ccc37945d6ac785521e9a2ebf96cb21e80187b68eff91c2f641ddae6a";
*/
