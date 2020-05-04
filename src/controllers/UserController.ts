import Controller from "@controllers/Controller";

class UserController {

    service: any;

    constructor(Service) {
        this.service = Service;
    }

    async getUserDetails(request, response) {
        await Controller.handleRequest(request, response, this.service.getUserDetails);
    }

    async createUser(request, response) {
        await Controller.handleRequest(request, response, this.service.createUser);
    }

    async updateUser(request, response) {
        await Controller.handleRequest(request, response, this.service.updateUser);
    }

    async resetToken(request, response) {
        await Controller.handleRequest(request, response, this.service.resetToken);
    }

    async resetPassword(request, response) {
        await Controller.handleRequest(request, response, this.service.resetPassword);
    }
}

export default UserController;
