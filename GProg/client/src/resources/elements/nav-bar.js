import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)

export class NavBar {

    constructor(router, auth) {
        // this.authenticated = false;
        this.loginError = '';
        this.router = router;
        this.auth = auth;
        // this.email = "";
        // this.password = "";
    }

    bind() {
        this.isAuthenticated = this.auth.isAuthenticated();
    }

    attached() {
        $('.navbar-nav a').on('click', function () {
            $('.navbar-nav').find('li.active').removeClass('active');
            $(this).parent('li').addClass('active');
        });
    }

    // login() {
    //     console.log(this.email);
    //     console.log(this.password);
    //     this.authenticated = true;
    //     this.router.navigate('home');
    // }

    login() {
        return this.auth.login(this.email, this.password)
            .then(response => {
                this.userObj = response.user;
                sessionStorage.setItem("userObj", JSON.stringify(this.userObj));
                this.loginError = "";
                this.isAuthenticated = this.auth.isAuthenticated();
                this.router.navigate('home');
            })
            .catch(error => {
                console.log(error);
                this.authenticated = false;
                this.loginError = "Invalid credentials.";
            });
    };


    // logout() {
    //     this.authenticated = false;
    //     this.router.navigate('landing');
    // }

    logout() {
        this.auth.logout();
        // if (this.userObj) this.auth.logout(this.userObj.email);
        sessionStorage.removeItem('user');
        this.isAuthenticated = this.auth.isAuthenticated();
    }

}