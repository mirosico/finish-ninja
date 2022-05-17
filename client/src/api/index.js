import axios from 'axios';

const baseURL = 'http://localhost:5001';
const API = axios.create({baseURL});

const LIMIT = 5;

export const postImages = (images) => API.post(`/file/upload`, images);
export const deleteImage = (imageUrl) => axios.delete(`${imageUrl}`);

export const fetchFilteredHeroes = (page) => API.get(`/heroes?page=${page}&limit=${LIMIT}`)
export const fetchHero = (id) => API.get(`/heroes/${id}`);


export const createHero = (newHero) => API.post("/heroes", newHero);
export const updateHero = (id, updatedHero) => API.patch(`/heroes/${id}`, updatedHero);
export const deleteHero = (id) => API.delete(`/heroes/${id}`);
