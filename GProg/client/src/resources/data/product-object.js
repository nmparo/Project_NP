import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)

export class Product {
    constructor(data) {
        this.data = data;
        this.PRODUCT_SERVICE = 'products';
    }

    async saveProduct(product) {
        let serverResponse;
        if (product) {
        if(product._id) {
            serverResponse = await this.data.put(product, this.PRODUCT_SERVICE);
        } else {
            serverResponse = await this.data.post(product, this.PRODUCT_SERVICE);
        }
        return serverResponse;
        }
        }

        async delete(product) {
            if(product && product._id) {
                await this.data.delete(this.PRODUCT_SERVICE + '/' + product._id)
            }
            }      
            
            async getProducts() {
                        let response = await this.data.get(this.PRODUCT_SERVICE);
                        if(!response.error) {
                            this.productsArray = response;
                        } else {
                            this.productsArray = [];
                        }
                }
        
}

