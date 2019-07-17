import HttpException from "./http.exception";

class BadCredentialsException extends HttpException {
    constructor() {
        super(401, "Wrong credentials provided");
    }
}

export default BadCredentialsException;
