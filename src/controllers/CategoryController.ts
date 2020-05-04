import Controller from "@controllers/Controller";

class CategoryController {

    service: any;

    constructor(Service) {
        this.service = Service;
    }

    async createCategory(request, response) {
        await Controller.handleRequest(request, response, this.service.createCategory);
    }

    async updateCategory(request, response) {
        await Controller.handleRequest(request, response, this.service.updateCategory);
    }

    async deleteCategory(request, response) {
        await Controller.handleRequest(request, response, this.service.deleteCategory);
    }

    async getCategory(request, response) {
        await Controller.handleRequest(request, response, this.service.getCategory);
    }
}

export default CategoryController;
