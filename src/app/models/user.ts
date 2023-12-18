export class User {
    public id: string;
    public username: string;
    public name: string;
    public role: number;
    public merchantId: any;
    constructor(user: any) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.fullName;
        this.role = user.role.name
    }
}
