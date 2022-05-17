import * as controller from '../controllers/heroes.js'
import Hero from "../models/hero.js";
import {requestMocks, connectDb, testHeroData, testHeroData2, removeFakeHero, disconnectDb} from "../util/testing_utils.js";


describe("Check heroes controller ", () => {

    beforeAll(async () => {
        await connectDb();
    });

    beforeEach(async () => {
        await removeFakeHero();
    });

    afterAll(async () => {
        await disconnectDb();
    });


    test('Check createHero should 201 and return hero', async () => {
        let req = requestMocks.mockRequest();
        req.body = testHeroData;
        const res = requestMocks.mockResponse();
        await controller.createHero(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
    });


    test('Test deleteHero: verify hero is deleted and return message: "Hero deleted successfully."', async () => {
        const validHero = new Hero(testHeroData2);
        const savedHero = await validHero.save();
        let req = requestMocks.mockRequest();
        req.params.id = savedHero._id;
        expect(req.params.id).toBeDefined();
        const res = requestMocks.mockResponse();
        await controller.deleteHero(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: "Hero deleted successfully." });
    });


});