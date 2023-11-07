export class User {
    public id: number;
    public username: string;
    public name: string;
    public role: number;
    constructor(user: any) {
        this.id = +user.id;
        this.username = user.username;
        this.name = user.name;
        this.role = +user.role
    }
}
