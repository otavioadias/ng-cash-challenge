export default class TransferUserError extends Error {
    public status: number;
    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}