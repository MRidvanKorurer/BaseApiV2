class APIError extends Error {
    statusCode:number;
    constructor(message: string | undefined,  statusCode: number) {
        super(message),
        this.statusCode = statusCode || 400
    }
}


export default APIError;