export type CartApiError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};
