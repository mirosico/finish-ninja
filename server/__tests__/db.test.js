import mongoose from "mongoose";
import Hero from "../models/hero.js";
import {connectDb, testHeroData,testHeroData2, removeFakeHero, disconnectDb} from "../util/testing_utils.js";

describe("Testing controllers", () => {

    beforeAll(async () => {
        await connectDb();
    });

    beforeEach(async () => {
        await removeFakeHero();
    });

    afterAll(async () => {
        await disconnectDb();
    });


    test("Create hero successfully, but the field not defined in schema should be undefined", async () => {
        await removeFakeHero();
        const heroWithInvalidField = new Hero({
            nickname: testHeroData.nickname,
            email: "handsome@pic.me",
        });
        const savedHeroWithInvalidField = await heroWithInvalidField.save();
        expect(savedHeroWithInvalidField._id).toBeDefined();
        expect(savedHeroWithInvalidField.email).toBeUndefined();
    });

    test("Create Hero without required field should failed", async () => {
        const heroWithoutRequiredField = new Hero({real_name: "Derek Parker"});
        let err;
        try {
            await heroWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.nickname).toBeDefined();
    });

    test("Create & Save Hero successfully", async () => {
        await removeFakeHero();
        const validHero = await new Hero(testHeroData2);
        const savedHero = await validHero.save();
        expect(savedHero._id).toBeDefined();
        expect(savedHero.nickname).toBe(testHeroData2.nickname);
        expect(savedHero.real_name).toBe(testHeroData2.real_name);
        expect(savedHero.superpowers).toBe(testHeroData2.superpowers);
    });
});