import { Controller } from '../../src';
import axios from 'axios';
jest.mock('axios');

jest.mock('../../src/Controller');

const controller = new Controller({
    url: 'http://localhost',
    username: 'username',
    password: 'password'
});

// @ts-ignore
// noinspection JSConstantReassignment
controller.controllerInstance = axios;
// Object.defineProperty(controller, 'controllerInstance', axios);

controller.getInstance = jest.fn().mockImplementation(() => controller.controllerInstance);

const version = controller.version;
export const resetControllerVersion = () => {
    controller.version = version;
};

controller.createInstance = jest.fn().mockImplementation(() => axios);

export { controller };
