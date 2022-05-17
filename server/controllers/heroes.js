import mongoose from 'mongoose';

import Hero from '../models/hero.js';

import calculatePaginationValues from '../pagination/index.js';


export const getHeroes = async (req, res ) => {
    try {
        const pagination = calculatePaginationValues(req);
        const allAssetsCount = await Hero.estimatedDocumentCount();
        const assets = await Hero.find()
            .skip(pagination.startIndex)
            .limit(pagination.limit);

        res.status(200).json({
            all: allAssetsCount,
            count: assets.length,
            page: pagination.page,
            limit: pagination.limit,
            previous: pagination.previous,
            next:
                pagination.nextPageIndex < allAssetsCount ? pagination.next : null,
            data: assets,
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createHero = async (req, res) => {
    const hero = req.body;
    if(!hero){
        res.status(400).send({ message : "Content can not be emptpy!"});
        return;
    }
    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = hero;
    const newHero = new Hero({ nickname, real_name, origin_description, superpowers, catch_phrase, images });

    try {
        await newHero.save();

        res.status(201).json(newHero)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updateHero = async (req, res) => {
    const { id } = req.params;
    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = req.body;;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No heroes with id: ${id}`);

    const updatedHero = { nickname, real_name, origin_description, superpowers, catch_phrase, images, _id: id };

    await Hero.findByIdAndUpdate(id, updatedHero, { new: true });

    res.json(updatedHero);
}

export const deleteHero = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No heroes with id: ${id}`);

    await Hero.findByIdAndRemove(id);

    res.json({ message: "Hero deleted successfully." });
}

export const getHero = async (req, res) => {
    const { id } = req.params;

    try {
        const hero = await Hero.findById(id);

        res.status(200).json(hero);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}