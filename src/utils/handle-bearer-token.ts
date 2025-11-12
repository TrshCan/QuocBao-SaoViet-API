export const handleBearerToken = (authHeader: string): string => {
  return authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;
};
