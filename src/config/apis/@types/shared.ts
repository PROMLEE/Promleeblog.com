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

  export interface SuccessResponse {
    status: number;
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message: string;
  }
}
