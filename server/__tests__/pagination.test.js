import pagination from "../pagination/index.js";
import {Request} from 'jest-express/lib/request';

describe('testing pagination utility', () => {

    const BASE_URL = "http://localhost:5001";

    test('test pagination startIndex', () => {
        const request = new Request(`${BASE_URL}/heroes?page=3&limit=5`);
        const testPagination = pagination(request);
        expect(testPagination.startIndex).toBe(10);
    });

    test('test pagination nextPageIndex', () => {
        const request = new Request(`${BASE_URL}/heroes?page=2&limit=6`);
        const testPagination = pagination(request);
        expect(testPagination.nextPageIndex).toBe(12);
    });

    test('test pagination nextPage', () => {
        const request = new Request(`${BASE_URL}/heroes?page=3&limit=5`);
        const testPagination = pagination(request);
        expect(testPagination.next).toBe(4);
    });

    test('test pagination prevPage', () => {
        const request = new Request(`${BASE_URL}/heroes?page=1&limit=5`);
        const testPagination = pagination(request);
        expect(testPagination.previous).toBe(null);
    });

    test('test pagination page', () => {
        const request = new Request(`${BASE_URL}/heroes?page=10&limit=5`);
        const testPagination = pagination(request);
        expect(testPagination.page).toBe(10);
    });

})