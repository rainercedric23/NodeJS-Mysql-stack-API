import Controller from "@controllers/Controller";

class AuthController {

    service: any;

    constructor(Service) {
        this.service = Service;
    }

    async loginUser(request, response) {
        await Controller.handleRequest(request, response, this.service.loginUser);
    }

    async verifyToken(request, response) {
        await Controller.handleRequest(request, response, this.service.verifyToken);
    }
}

export default AuthController;
