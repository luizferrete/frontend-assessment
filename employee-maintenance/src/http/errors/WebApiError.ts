export default class WebApiError extends Error {
    /**
     *
     */
    constructor(message: string) {
      super(message);
      this.name = "WebApiError";
    }
  }