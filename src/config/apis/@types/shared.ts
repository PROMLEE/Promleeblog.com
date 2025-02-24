/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Shared {
  export interface ErrorResponse {
    data: null;
    error: {
      code: number;
      message: string;
    };
    success: boolean;
  }
}
