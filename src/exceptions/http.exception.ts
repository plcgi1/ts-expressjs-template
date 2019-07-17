class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        // tslint:disable-next-line:no-console
        console.info("HttpException", this);
        if (this.name === "ValidationError") {
            status = 400;
        }

        this.status = status;
        this.message = message;
    }
}

export default HttpException;
