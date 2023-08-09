const uploadImages = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (const file of files) {
        formData.append("file", file);
        formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`)
    }
    const data = await axios
        .post(`${process.env.REACT_APP_CLOUDINARY_URL}`,
            formData
        )
        .then((response) => {
            console.log(response.data.secure_url);
            setPostData({ ...postData, picturePath: response.data.secure_url });
            toast.success("Post picture added successfully")
        }).catch((error) => {
            console.log(error)
            toast.error(error.message + " picture adding unsuccessful")
        })
}






<!--- onclick we are sending the recieved link from cloudinary to the backend and storing the image as string format in the database. ---!>