import mongoose from 'mongoose';

const heroSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    real_name: String,
    origin_description: String,
    superpowers: String,
    catch_phrase: String,
    images: [String]
})

const Hero = mongoose.model('Hero', heroSchema);

export default Hero;
