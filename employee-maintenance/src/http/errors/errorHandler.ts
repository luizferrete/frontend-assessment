import NotFound from '../errors/NotFound';
import Unauthorized from '../errors/Unauthorized';
import WebApiError from '../errors/WebApiError';

export function getErrorMessage(error: any): string {
  console.log(error);
  if (error instanceof NotFound) {
    return error.message;
  } else if (error instanceof Unauthorized) {
    return error.message;
  } else if (error instanceof WebApiError) {
    return error.message;
  } else {
    return 'Oops! An unexpected error occurred.';
  }
}
