export const toErrorMessage = (e: unknown): string =>
  e instanceof Error ? e.message : JSON.stringify(e);
