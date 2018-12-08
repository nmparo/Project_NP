import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'

@inject(Router, User)
export class Users {
    constructor(router, users) {
        this.router = router;
        this.users = users;

        this.message = 'Reviewers';
        this.showUserEditForm = false;

    }


    async activate() {
        await this.getUsers();
    }

    attached() {
        feather.replace()
    }


    async getUsers() {
        await this.users.getUsers();
    }

    newUser() {
        this.user = {
            firstName: "",
            lastName: "",
            active: true,
            role: "user",
            email: "",
            password: ""
        }
        this.openEditForm();

    }

    editUser(user) {
        this.user = user;
        this.openEditForm();
    }
    // async save (){
    //     console.log(this.user);
    // }


    openEditForm() {
        this.showUserEditForm = true;

        setTimeout(() => { $("#firstName").focus(); }, 500);

    }

    back() {
        this.showUserEditForm = false;
    }

    async save() {
        if (this.user && this.user.firstName && this.user.lastName
            && this.user.email && this.user.password) {
            await this.users.saveUser(this.user);
            await this.getUsers();
            this.back();

        }

    }

    async delete() {
        if (this.user) {
            await this.users.delete(this.user);
            await this.getUsers();
            this.back();
        }
    }

    changeActive(user) {
        this.user = user;
        this.save();
    }


    // logout() {
    //     this.router.navigate('home');
    // }
}