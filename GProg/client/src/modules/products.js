import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Product } from '../resources/data/product-object';

@inject(Router, Product)
export class Products {
    constructor(router, products) {
        this.router = router;
        this.products = products;
        this.message = 'Products';
        this.showProductEditForm = false;
    }

    async activate() {
        await this.getProducts();
    }

    attached() {
        feather.replace();
    }

    async getProducts() {
        await this.products.getProducts();
    }

    newProduct() {
        this.product = {
            productImage: "",
            productName: "",
            description: "",
            url: "",
        }
        this.openEditForm();
    }

    editProduct(product) {
        this.product = product;
        this.openEditForm();
    }

    openEditForm() {
        this.showProductEditForm = true;
        setTimeout(() => { $("#productName").focus(); }, 500);
    }

    changeActive(product) {
        this.product = product;
        this.save();
    }

    async save() {
        if (this.product && this.product.productImage && this.product.productName
            && this.product.description && this.product.url) {
            await this.products.saveProduct(this.product);
            await this.getProducts();
            this.back();
        }
    }

    async delete() {
        if (this.product) {
            await this.products.delete(this.product);
            await this.getProducts();
            this.back();
        }
    }

    back() {
        this.showProductEditForm = false;
    }

    logout() {
        this.router.navigate('home');
      }

}
