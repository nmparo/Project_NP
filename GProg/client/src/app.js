import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 

    config.map([
      {
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false

      },
      {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true

      },
      {
        route: 'users',
        moduleId: './modules/users',
        name: 'Users',
        auth: true
      },
      {
        route: 'products',
        moduleId: './modules/products',
        name: 'Products',
        auth: true
      },
      {
        route: 'productReviews',
        moduleId: './modules/productReviews',
        name: 'Product Reviews',
        auth: true
      }
    ]);
  }
}
