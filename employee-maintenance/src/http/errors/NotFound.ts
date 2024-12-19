export default class NotFound extends Error {
    /**
     *
     */
    constructor(message: string = "Resource not found") {
        super(message);
        this.name = "NotFound";
    }
}