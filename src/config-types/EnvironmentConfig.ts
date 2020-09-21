import AppConfig from "./AppConfig";
import DbConfig from "./DbConfig";
import AwsConfig from "./AwsConfig";
import SecurityConfig from "./SecurityConfig";

export default interface EnvironmentConfig {
  app: AppConfig;
  db: DbConfig;
  aws: AwsConfig;
  security: SecurityConfig;
}
