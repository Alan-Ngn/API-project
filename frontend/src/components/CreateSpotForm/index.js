import SpotForm from "../SpotForm"

const CreateSpotForm = () => {
    const input = {
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
        <SpotForm input={input} formType="Create a new Spot"/>
    )
}

export default CreateSpotForm
