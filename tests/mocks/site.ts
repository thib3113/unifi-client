import { Site } from '../../src';
import axios from 'axios';
import { controller } from './controller';
jest.mock('axios');

jest.mock('../../src/Sites/Site');

export const site = new Site(controller, {
    _id: '_id',
    anonymous_id: 'anonymous_id',
    name: 'name',
    desc: 'desc',
    attr_hidden_id: 'attr_hidden_id',
    attr_no_delete: false,
    role: 'role'
});

// @ts-ignore
site.getInstance = jest.fn().mockImplementation(() => axios);
