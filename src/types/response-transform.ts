export type ResponseTransform<T> = {
  message?: string;
  data?: T;
  statusCode: number;
  success: boolean;
  timestamp: string;
};
