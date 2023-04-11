import SpotForm from "../SpotForm"

const CreateSpotForm = () => {
    const spot = {
        country: "",
        address: "",
        city: "",
        state: "",
        lat: "",
        lng: "",
        description: "",
        name: "",
        price: "",
        previewImage: "",
        optImgOne: "",
        optImgTwo: "",
        optImgThree: "",
        optImgFour: ""
    }
    return (
        <SpotForm spot={spot}/>
    )
}

export default CreateSpotForm
