import { OpenAPIObject } from '@nestjs/swagger';

export function mergeOpenApiDocument(
  document: OpenAPIObject,
  yamlDocument: unknown,
): void {
  if (!yamlDocument || typeof yamlDocument !== 'object') {
    return;
  }

  const yamlDoc = yamlDocument as Record<string, unknown>;

  // Merge components/schemas from YAML into the document
  if (yamlDoc.components && typeof yamlDoc.components === 'object') {
    const yamlComponents = yamlDoc.components as Record<string, unknown>;

    if (!document.components) {
      document.components = {};
    }

    const docComponents = document.components as Record<string, unknown>;

    // Merge schemas
    if (yamlComponents.schemas && typeof yamlComponents.schemas === 'object') {
      if (!docComponents.schemas) {
        docComponents.schemas = {};
      }

      const docSchemas = docComponents.schemas as Record<string, unknown>;
      const yamlSchemas = yamlComponents.schemas as Record<string, unknown>;

      Object.assign(docSchemas, yamlSchemas);
    }

    // Merge other components (responses, parameters, examples, etc.)
    const componentKeys = [
      'responses',
      'parameters',
      'examples',
      'requestBodies',
      'headers',
      'securitySchemes',
      'links',
      'callbacks',
    ];

    componentKeys.forEach((key) => {
      if (yamlComponents[key] && typeof yamlComponents[key] === 'object') {
        if (!docComponents[key]) {
          docComponents[key] = {};
        }

        const docComponent = docComponents[key] as Record<string, unknown>;
        const yamlComponent = yamlComponents[key] as Record<string, unknown>;

        Object.assign(docComponent, yamlComponent);
      }
    });
  }

  // Merge paths if needed
  if (yamlDoc.paths && typeof yamlDoc.paths === 'object') {
    if (!document.paths) {
      document.paths = {};
    }

    const docPaths = document.paths as Record<string, unknown>;
    const yamlPaths = yamlDoc.paths as Record<string, unknown>;

    Object.assign(docPaths, yamlPaths);
  }

  // Merge tags if needed
  if (Array.isArray(yamlDoc.tags)) {
    if (!Array.isArray(document.tags)) {
      document.tags = [];
    }

    const docTags = document.tags as unknown[];
    const yamlTags = yamlDoc.tags as unknown[];
    docTags.push(...yamlTags);
  }

  // Merge servers if needed
  if (Array.isArray(yamlDoc.servers)) {
    if (!Array.isArray(document.servers)) {
      document.servers = [];
    }

    const docServers = document.servers as unknown[];
    const yamlServers = yamlDoc.servers as unknown[];
    docServers.push(...yamlServers);
  }
}
