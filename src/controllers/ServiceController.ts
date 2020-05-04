import Controller from "@controllers/Controller";

class ServiceController {

    service: any;

    constructor(Service) {
        this.service = Service;
    }

    async createService(request, response) {
        await Controller.handleRequest(request, response, this.service.createService);
    }

    async updateService(request, response) {
        await Controller.handleRequest(request, response, this.service.updateService);
    }

    async deleteService(request, response) {
        await Controller.handleRequest(request, response, this.service.deleteService);
    }

    async getService(request, response) {
        await Controller.handleRequest(request, response, this.service.getService);
    }
}

export default ServiceController;
