import { useEffect, useState } from "react"
import { createSpotThunk } from "../../store/spots"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const SpotForm  = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [optImgOne, setOptImgOne] = useState('')
    const [optImgTwo, setOptImgTwo] = useState('')
    const [optImgThree, setOptImgThree] = useState('')
    const [optImgFour, setOptImgFour] = useState('')
    const [err, setErr] = useState({})

    const handleSubmit = async(e) => {
        const errors = {}
        e.preventDefault();
        let imgArr = []
        const previewObj = {}
        if(!previewImage) {
            errors.previewImage = 'Preview image is required.'
        } else if(previewImage.endsWith('.jpeg') || previewImage.endsWith('.jpg') || previewImage.endsWith('.png')) {
            const previewObj = {}
            previewObj.url = previewImage
            previewObj.preview = true
            imgArr.push(previewObj)
        } else {
            errors.previewImage = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if(optImgOne && (optImgOne.endsWith('.jpeg') || optImgOne.endsWith('.jpg') || optImgOne.endsWith('.png'))){
            const imgOne = {}
            imgOne.url = optImgOne
            imgOne.preview = false
            imgArr.push(imgOne)
        } else if (optImgOne){
            errors.optImgOne = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if(optImgTwo && (optImgTwo.endsWith('.jpeg') || optImgTwo.endsWith('.jpg') || optImgTwo.endsWith('.png'))){
            const imgTwo = {}
            imgTwo.url = optImgTwo
            imgTwo.preview = false
            imgArr.push(imgTwo)
        } else if (optImgTwo){
            errors.optImgTwo = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if(optImgThree && (optImgThree.endsWith('.jpeg') || optImgThree.endsWith('.jpg') || optImgThree.endsWith('.png'))){
            const imgThree = {}
            imgThree.url = optImgThree
            imgThree.preview = false
            imgArr.push(imgThree)
        } else if (optImgThree){
            errors.optImgThree = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if(optImgFour && (optImgFour.endsWith('.jpeg') || optImgFour.endsWith('.jpg') || optImgFour.endsWith('.png'))){
            const imgFour = {}
            imgFour.url = optImgFour
            imgFour.preview = false
            imgArr.push(imgFour)
        } else if (optImgFour){
            errors.optImgFour = 'Image URL must end in .png, .jpg, or .jpeg'
        }


        const spot = {country, address, city, state, lat, lng, description, name, price, imgArr}
        console.log(spot)
        if(!country) errors.country = 'Country is required'
        if(!address) errors.address = 'Address is required'
        if(!city) errors.city = 'City is required'
        if(!state) errors.state = 'State is required'
        if(!lat) errors.lat = 'Latitude is required'
        if(!lng) errors.lng = 'Longitude is required'
        if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if(!name) errors.name = 'Name is required'
        if(!price) errors.price = 'Price is required'
        setErr(errors)
        console.log('what errors do i have',errors)
        if(!Object.values(errors).length>0){
            const newSpot =await dispatch(createSpotThunk(spot))
            console.log(newSpot,'tets')
            history.push(`/spots/${newSpot.id}`)
        }
    }
    return (
        // <div> SpotForm</div>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="country">Country</label>
                    {err.country && (
                        <p className="errors">{err.country}</p>
                    )}
                </div>
                <input
                    name="country"
                    id="country"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
            </div>
            <div>
                <div>
                    <label htmlFor="address">Street Address</label>
                    {err.address && (
                        <p className="errors">{err.address}</p>
                    )}
                </div>
                <input
                    name="address"
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </div>
            <div>
                <div>
                    <label htmlFor="city">City</label>
                    {err.city && (
                        <p className="errors">{err.city}</p>
                    )}
                </div>
                <input
                    name="city"
                    id="city"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </div>
            <div>
                <div>
                    <label htmlFor="state">State</label>
                    {err.state && (
                        <p className="errors">{err.state}</p>
                    )}
                </div>
                <input
                    name="state"
                    id="state"
                    type="text"
                    placeholder="STATE"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lat">Latitude</label>
                <input
                    name="lat"
                    id="lat"
                    type="number"
                    placeholder="Latitude"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lng">Longitude</label>
                <input
                    name="lng"
                    id="lng"
                    type="number"
                    placeholder="Longitude"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Describe your place to guests</label>
                <textarea
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="name">Create a title for your spot</label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="price">Set a base price for your spot</label>
                <input
                    name="price"
                    id="price"
                    type="text"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="previewImage">Submit a link to at least one photo to publish your spot.</label>
                <input
                    name="previewImage"
                    id="previewImage"
                    type="text"
                    placeholder="Preview Image URL"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                />
                {err.previewImage && (
                    <p className="errors">{err.previewImage}</p>
                )}
            </div>
            <div>
                <input
                    name="optImgOne"
                    id="optImgOne"
                    type="text"
                    placeholder="Image URL"
                    value={optImgOne}
                    onChange={e => setOptImgOne(e.target.value)}
                />
                {err.optImgOne && (
                    <p className="errors">{err.optImgOne}</p>
                )}
            </div>
            <div>
                <input
                    name="optImgTwo"
                    id="optImgTwo"
                    type="text"
                    placeholder="Image URL"
                    value={optImgTwo}
                    onChange={e => setOptImgTwo(e.target.value)}
                />
            </div>
            <div>
                <input
                    name="optImgThree"
                    id="optImgThree"
                    type="text"
                    placeholder="Image URL"
                    value={optImgThree}
                    onChange={e => setOptImgThree(e.target.value)}
                />
            </div>
            <div>
                <input
                    name="optImgFour"
                    id="optImgFour"
                    type="text"
                    placeholder="Image URL"
                    value={optImgFour}
                    onChange={e => setOptImgFour(e.target.value)}
                />
            </div>

            <button
                type="submit"
                disabled={Object.values(err).length>0}
            >
                Create Spot
            </button>
        </form>
    )
}

export default SpotForm
