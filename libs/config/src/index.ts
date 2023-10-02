import { DotenvConfigOutput, config } from 'dotenv';
import { configValidationSchema, IConfig } from 'src/config.schema';

function validateConfig(config: DotenvConfigOutput) {
  // validate throws an error if fails

  configValidationSchema.validate(config);
  return config;
}

export const CONFIG = validateConfig(config().parsed) as IConfig;
