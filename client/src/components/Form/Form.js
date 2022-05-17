import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom";

import {createHero, deleteImage, getHero, updateHero, uploadImages} from '../../actions/heroes';

const Form = () => {

        const {id} = useParams();

        const [heroData, setHeroData] = useState({
            nickname: '',
            real_name: '',
            origin_description: '',
            superpowers: '',
            catch_phrase: '',
            images: []
        });

        const dispatch = useDispatch();

        useEffect(() => {
            if (id) {
                dispatch(getHero(id));
            }
        }, [id])

        const hero = useSelector((state) => (id ? state.heroes.find((h) => h._id === id) : null));


        const fileInputRef = useRef(null);
        const fakeFileUploader = useRef(null);


        useEffect(() => {
            if (hero) setHeroData(hero);
        }, [hero]);

        useEffect(() => {
            const clickOnEnter = (e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    e.stopPropagation();
                    fileInputRef.current.click();
                }
            }
            fakeFileUploader.current.addEventListener('keydown', clickOnEnter);
            return fakeFileUploader.current.removeEventListener('keydown', clickOnEnter);
        }, [])

        const deleteAllImages = () => {
            heroData.images.forEach(imageUrl => {
                dispatch(deleteImage(imageUrl));
            })
        }

        const clear = () => {
            deleteAllImages();
            if (id) {
                setHeroData({
                    nickname: heroData.nickname,
                    real_name: '',
                    origin_description: '',
                    superpowers: '',
                    catch_phrase: '',
                    images: []
                });
            } else {
                setHeroData({
                    nickname: '',
                    real_name: '',
                    origin_description: '',
                    superpowers: '',
                    catch_phrase: '',
                    images: []
                });
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!id) {
                dispatch(createHero(heroData));
                alert("Hero created!")
            } else {
                dispatch(updateHero(id, heroData));
                alert("Hero updated!")
            }
        };

        const addImage = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (fileInputRef.current.files[0].type !== "image/png" && fileInputRef.current.files[0].type !== "image/jpeg") {
                alert("Please upload image in .jpeg or .png format")
            }
            let formData = new FormData();
            formData.append("file", fileInputRef.current.files[0])
            dispatch(uploadImages(formData)).then(imageUrl => {
                setHeroData({...heroData, images: [...heroData.images, imageUrl]});
                fileInputRef.current.files = null;
                fileInputRef.current.value = null;
            })
        }

        return (<>
                {!id ? <h1 className="form-header">Add new <strong>SuperHero</strong></h1> :
                    <h1 className="form-header">Edit <strong>"{heroData.nickname}"</strong> superhero</h1>}

                <form autoComplete="off" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="nickname">Nickname<span>(e.g. Superman)</span></label>
                        <input name="nickname" id="nickname" label="Nickname" className="form-controll" type="text"
                               required
                               disabled={id}
                               readOnly={id}
                               value={heroData.nickname}
                               onChange={(e) => setHeroData({...heroData, nickname: e.target.value})}/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="real_name">Real Name<span>(e.g. Clark Kent)</span></label>
                        <input name="real_name" id="real_name" label="Real Name" className="form-controll" type="text"
                               value={heroData.real_name}
                               onChange={(e) => setHeroData({...heroData, real_name: e.target.value})}/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="origin_description">Origin Description<span></span></label>
                        <textarea name="origin_description" id="origin_description" label="origin description"
                                  className="form-controll" type="text"
                                  value={heroData.origin_description}
                                  placeholder="he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…"
                                  onChange={(e) => setHeroData({...heroData, origin_description: e.target.value})}/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="superpowers">Superpowers <span></span></label>
                        <textarea name="superpowers" id="superpowers" label="Superpowers" className="form-controll"
                                  type="text"
                                  placeholder="solar energy absorption and healing factor, solar flare and heat vision,solar invulnerability, flight…"
                                  value={heroData.superpowers}
                                  onChange={(e) => setHeroData({...heroData, superpowers: e.target.value})}/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="catch_phrase">Catch phrase <span></span></label>
                        <textarea name="catch_phrase" id="catch_phrase" label="catch_phrase" className="form-controll"
                                  type="text"
                                  placeholder="“Look, up in the sky, it's a bird, it's a plane, it's Superman!”"
                                  value={heroData.catch_phrase}
                                  onChange={(e) => setHeroData({...heroData, catch_phrase: e.target.value})}/>

                    </div>

                    <div className="form-group file-area">
                        <label htmlFor="images">Images <span>a set of images of the superhero</span></label>
                        <div className="hide">
                            <input ref={fileInputRef} type="file" name="file" accept="image/png, image/jpeg" onChange={addImage}/>
                        </div>
                        <div className="file-dummy" ref={fakeFileUploader} tabIndex="0" aria-label="Select photos"
                             onClick={(e) => {
                                 e.preventDefault();
                                 fileInputRef.current.click();
                             }}>
                            {heroData.images.length ?
                                <div className="success">You uploaded {heroData.images.length} images. Click to upload
                                    more</div> :
                                <div className="default">Please upload some images</div>}
                        </div>
                        <div className="image-container">
                            {heroData.images.length !== 0 && heroData.images.map(image => {
                                return (<div key={String(image)}>
                                    <img src={String(image)} width={100} height={100}/>
                                </div>)
                            })}
                        </div>
                    </div>

                    <div className="form-group button-container">
                        {!id ? <button className="button save" type="submit">Create</button> :
                            <button className="button save" type="submit">Save</button>}
                        <div className="button cancel" tabIndex="0" onClick={clear}>Clear</div>
                    </div>

                </form>
            </>
        );
    }
;

export default Form;
