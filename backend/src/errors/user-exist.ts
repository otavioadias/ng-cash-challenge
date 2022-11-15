export default class UserExists extends Error {
    public status: number;
    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}