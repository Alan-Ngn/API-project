import { useEffect, useState } from "react"
import { createSpotThunk, updateSpotThunk } from "../../store/spots"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import './SpotForm.css'

const SpotForm  = ({input, formType}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [country, setCountry] = useState(input.country)
    const [address, setAddress] = useState(input.address)
    const [city, setCity] = useState(input.city)
    const [state, setState] = useState(input.state)
    const [lat, setLat] = useState(input.lat)
    const [lng, setLng] = useState(input.lng)
    const [description, setDescription] = useState(input.description)
    const [name, setName] = useState(input.name)
    const [price, setPrice] = useState(input.price)
    const [previewImage, setPreviewImage] = useState(input.previewImage)
    const [optImgOne, setOptImgOne] = useState(input.optImgOne)
    const [optImgTwo, setOptImgTwo] = useState(input.optImgTwo)
    const [optImgThree, setOptImgThree] = useState(input.optImgThree)
    const [optImgFour, setOptImgFour] = useState(input.optImgFour)
    const [err, setErr] = useState({})
    const [valErr, setValErr] = useState({})
    const [submit, setSubmit] = useState('true')
    const [spotPayload, setSpotPayload] = useState({})
    const [spotImgPayload, setSpotImgPayload] = useState([])
    let spot = {}
    let errors = {}
    useEffect(()=> {
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


        spot = {country, address, city, state, lat, lng, description, name, price}
        setSpotPayload(spot)
        setSpotImgPayload(imgArr)

        if(!country) errors.country = 'Country is required'
        if(!address) errors.address = 'Address is required'
        if(!city) errors.city = 'City is required'
        if(!state) errors.state = 'State is required'
        if(!lat) errors.lat = 'Latitude is required'
        if(!lng) errors.lng = 'Longitude is required'
        if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if(!name) errors.name = 'Name is required'
        if(!price) errors.price = 'Price is required'
        if(lat<-90 || lat> 90) errors.lat = 'Latitude must be between -90 and 90'
        if(lng<-90 || lng> 90) errors.lng = 'Longitude must be between -180 and 180'

        // setErr(errors)
        if(country || address || city || state || lat || lng || description || name || price || previewImage){
            setSubmit(false)

        } else {
            setSubmit(true)
        }
        // if(Object.values(errors).length>0){
            // } else {
                //     setSubmit(false)
                // }
                setValErr(errors)
            },[country, address, city, state, lat, lng, description, name, price, previewImage, optImgOne, optImgTwo, optImgThree,optImgFour])

            const {spotId} = useParams()

    const handleSubmit = async(e) => {
        setSubmit(false)

        e.preventDefault();
        if(!Object.values(valErr).length>0 && formType === 'Create a new Spot'){

                const newSpot =await dispatch(createSpotThunk(spotPayload, spotImgPayload))

                history.push(`/spots/${newSpot.id}`)
        }
        if (!Object.values(valErr).length>0 && formType === 'Update your Spot') {



                const newSpot = await dispatch(updateSpotThunk(spotPayload, spotId))

                history.push(`/spots/${newSpot.id}`)
        }
        setErr(valErr)



    }

    // if(Object.values(err).length>0){
    //     setSubmit(true)
    // } else {
    //     setSubmit(false)
    // }
    return (
        // <div> SpotForm</div>
        <form className="create-update-form" onSubmit={handleSubmit}>
            <h1>{formType==='Update your Spot' ? 'Update your Spot' : 'Create a new Spot'}</h1>
            <div>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <div className="location">
                    <div>
                        <label htmlFor="country">Country</label>
                    </div>
                    <input
                        name="country"
                        id="country"
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        />
                        {err.country && (
                            <p className="errors">{err.country}</p>
                        )}
                </div>
                <div>
                    <div>
                        <label htmlFor="address">Street Address</label>
                    </div>
                    <input
                        name="address"
                        id="address"
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        />
                        {err.address && (
                            <p className="errors">{err.address}</p>
                        )}
                </div>
                <div className="city-state-label">
                    <label htmlFor="city">City</label>
                    <label htmlFor="state">State</label>
                </div>
                <div className="city-state">
                    <div>
                        <input
                            name="city"
                            id="city"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            />
                            {err.city && (
                                <p className="errors">{err.city}</p>
                            )}
                    </div>
                    <div className="comma">,</div>
                    <div>
                        <input
                            name="state"
                            id="state"
                            type="text"
                            placeholder="STATE"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            />
                            {err.state && (
                                <p className="errors">{err.state}</p>
                            )}
                    </div>
                </div>
                <div className="lat-lng-label">
                        <label htmlFor="lat">Latitude</label>
                        <label htmlFor="lng">Longitude</label>
                </div>
                <div className="lat-lng">
                    <div>
                        <input
                            name="lat"
                            id="lat"
                            type="number"
                            placeholder="Latitude"
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            />
                            {err.lat && (
                                    <p className="errors">{err.lat}</p>
                                )}
                    </div>
                    <div className="comma">,</div>
                    <div>
                        <input
                            name="lng"
                            id="lng"
                            type="number"
                            placeholder="Longitude"
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                            />
                            {err.lng && (
                                    <p className="errors">{err.lng}</p>
                                )}
                    </div>
                </div>
            </div>
            <h2 className="form-border">Describe your place to guests</h2>
            <div>
                <label htmlFor="description">Mention the best features of your space, any special amentities like
fast wifi or parking, and what you love about the neighborhood.</label>
                <textarea
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    {err.description && (
                                    <p className="errors">{err.description}</p>
                                )}
            </div>
            <div>
                <h2 className="form-border">Create a title for your spot</h2>
                <label htmlFor="name">Catch guests' attention with a spot title that highlights what makes
your place special.</label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    {err.name && (
                                    <p className="errors">{err.name}</p>
                                )}
            </div>
            <h2 className="form-border">Set a base price for your spot</h2>
            <div>
                <label htmlFor="price">Competitive pricing can help your listing stand out and rank higher
in search results.
</label>
                <input
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />
                    {err.price && (
                                    <p className="errors">{err.price}</p>
                                )}
            </div>
            <h2 className="form-border">Liven up your spot with photos</h2>
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
                {err.optImgTwo && (
                    <p className="errors">{err.optImgTwo}</p>
                )}
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
                {err.optImgThree && (
                    <p className="errors">{err.optImgThree}</p>
                )}
            </div>
            <div className="form-border-bot">
                <input
                    name="optImgFour"
                    id="optImgFour"
                    type="text"
                    placeholder="Image URL"
                    value={optImgFour}
                    onChange={e => setOptImgFour(e.target.value)}
                />
                {err.optImgFour && (
                    <p className="errors">{err.optImgFour}</p>
                )}
            </div>

            <button
                className="default-button"
                type="submit"
                disabled={submit}


            >

                {formType==='Update your Spot' && (
                    'Update your Spot'
                )}
                {formType==='Create a new Spot' && (
                    'Create Spot'
                )}
            </button>
        </form>
    )
}

export default SpotForm
