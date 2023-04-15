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
    const [submit, setSubmit] = useState(true)
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
        console.log('whats in the spot obj', spot)
        if(!country) errors.country = 'Country is required'
        if(!address) errors.address = 'Address is required'
        if(!city) errors.city = 'City is required'
        if(!state) errors.state = 'State is required'
        if(!lat) errors.lat = 'Latitude is required'
        if(!lng) errors.lng = 'Longitude is required'
        if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if(!name) errors.name = 'Name is required'
        if(!price) errors.price = 'Price is required'

        console.log('what errors do i have',errors)
        // setErr(errors)
        // if(Object.values(errors).length>0){
            // } else {
                //     setSubmit(false)
                // }
                setValErr(errors)
            },[country, address, city, state, lat, lng, description, name, price, previewImage, optImgOne, optImgTwo, optImgThree,optImgFour])

            const {spotId} = useParams()

    const handleSubmit = async(e) => {
        setSubmit(false)
        console.log('testing errors out',Object.values(valErr).length, valErr)
        console.log('this is my formType',formType)
        e.preventDefault();
        if(!Object.values(valErr).length>0 && formType === 'Create a new Spot'){

                const newSpot =await dispatch(createSpotThunk(spotPayload, spotImgPayload))
                console.log(newSpot,'tets')
                history.push(`/spots/${newSpot.id}`)
        }
        if (!Object.values(valErr).length>0 && formType === 'Update your Spot') {
                console.log('inside handlesubmit update', spotPayload)

                // console.log(spot)
                const newSpot = await dispatch(updateSpotThunk(spotPayload, spotId))
                // console.log(newSpot,'tets')
                history.push(`/spots/${newSpot.id}`)
        }
        setErr(valErr)
        // console.log('what are my err state',Object.values(err).length,err)
        // console.log(err.country)


    }
    // console.log('chechking err state outside of handle submit',err)
    // if(Object.values(err).length>0){
    //     setSubmit(true)
    // } else {
    //     setSubmit(false)
    // }
    return (
        // <div> SpotForm</div>
        <form onSubmit={handleSubmit}>
            <h1>{formType==='Update your Spot' ? 'Update your Spot' : 'Create a new Spot'}</h1>
            <div>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <div className="location">
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
                <div className="city-state">
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
                    <div>,</div>
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
                </div>
                <div className="lat-lng">
                    <div>
                        <label htmlFor="lat">Latitude</label>
                        {err.lat && (
                                <p className="errors">{err.lat}</p>
                            )}
                        <input
                            name="lat"
                            id="lat"
                            type="number"
                            placeholder="Latitude"
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                        />
                    </div>
                    <div>,</div>
                    <div>
                        <label htmlFor="lng">Longitude</label>
                        {err.lng && (
                                <p className="errors">{err.lng}</p>
                            )}
                        <input
                            name="lng"
                            id="lng"
                            type="number"
                            placeholder="Longitude"
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <h1>Describe your place to guests</h1>
            <div>
                <label htmlFor="description">Mention the best features of your space, any special amentities like
fast wif or parking, and what you love about the neighborhood.</label>
                {err.description && (
                                <p className="errors">{err.description}</p>
                            )}
                <textarea
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div>
                <h1>Create a title for your spot</h1>
                <label htmlFor="name">Catch guests' attention with a spot title that highlights what makes
your place special.</label>
                {err.name && (
                                <p className="errors">{err.name}</p>
                            )}
                <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <h1>Set a base price for your spot</h1>
            <div>
                <label htmlFor="price">Competitive pricing can help your listing stand out and rank higher
in search results.
</label>
                {err.price && (
                                <p className="errors">{err.price}</p>
                            )}
                <input
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>
            <h1>Liven up your spot with photos</h1>
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
                // disabled={submit}
            >
                {formType==='Update your Spot' && (
                    'Update'
                )}
                {formType==='Create a new Spot' && (
                    'Create'
                )}
            </button>
        </form>
    )
}

export default SpotForm
