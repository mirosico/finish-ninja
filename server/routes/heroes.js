import {
    createHero,
    deleteHero,
    getHero,
    getHeroes,
    updateHero,
} from "../controllers/heroes.js";
import express from "express";


const router = express.Router();

router.get('/', getHeroes)
router.post('/', createHero)
router.get('/:id', getHero);
router.patch('/:id', updateHero);
router.delete('/:id', deleteHero);


export default router;