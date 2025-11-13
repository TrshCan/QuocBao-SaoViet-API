import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { envConfig } from '@/configs/config-env';

export function loadOpenApiYaml(): unknown {
  try {
    const yamlPath = path.join(
      process.cwd(),
      'documents',
      'openapi',
      'openapi.yaml',
    );

    if (!fs.existsSync(yamlPath)) {
      console.warn(
        `[${envConfig.NODE_ENV}] - AppBootstrap - OpenAPI YAML file not found at: ${yamlPath}`,
      );
      return null;
    }

    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const yamlDocument = yaml.load(fileContents);

    console.log(
      `[${envConfig.NODE_ENV}] - AppBootstrap - OpenAPI YAML loaded successfully`,
    );

    return yamlDocument;
  } catch (error) {
    console.error(
      `[${envConfig.NODE_ENV}] - AppBootstrap - Error loading OpenAPI YAML:`,
      error,
    );
    return null;
  }
}
