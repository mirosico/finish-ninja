import {jest} from '@jest/globals'
import mongoose from "mongoose";
import dotenv from "dotenv";
import Hero from "../models/hero.js";
dotenv.config({path: '../.env'});



export const requestMocks = {
    mockRequest: () => {
        const req = {}
        req.body = jest.fn().mockReturnValue(req)
        req.params = jest.fn().mockReturnValue(req)
        return req
    },

    mockResponse: () => {
        const res = {}
        res.send = jest.fn().mockReturnValue(res)
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    },
}


export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const disconnectDb = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log(error)
    }
}

export const removeFakeHero = async () => {
    let toRemove = await Hero.find({nickname: "JohnSnow"});
    for(let val of toRemove) {
        await val.remove();
    }
    toRemove = await Hero.find({nickname: "JohnSnow2"});
    for(let val of toRemove) {
        await val.remove();
    }
}

export const testHeroData = {
    nickname: "JohnSnow2",
    real_name: "Aegon Targaryen",
    superpowers: "Very annoying"
};

export const testHeroData2 = {
    nickname: "JohnSnow",
    real_name: "Aegon Targaryen",
    superpowers: "Very annoying"
};

