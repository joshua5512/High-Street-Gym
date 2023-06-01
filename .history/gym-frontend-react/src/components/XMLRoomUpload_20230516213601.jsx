import { useRef, useState } from "react"
import { API_URL } from "../api/api"
import { useAuthentication } from "../hooks/authentication";

export function XMLRoomUpload({ onUploadSuccess }) {
    const [user] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const uploadInputRef = useRef(null);

    function uploadFile(e) {
        e.preventDefault()

        const file = uploadInputRef.current.files[0];

        const formData = new FormData()
        formData.append("xml-file", file)

    fetch(API_URL + "/rooms/upload/xml?authKey=" + user.authenticationKey,
        {
            method: "POST",
            body: formData,
        })
        .then(res => res.json())
        .then(APIResponse => {
            setStatusMessage(APIResponse.message)

            uploadInputRef.current.value = null

            if (typeof onUploadSuccess === "function") {
                onUploadSuccess()
            }
        })
        .catch(error => {
            setStatusMessage("Upload failed - " + error)
        })
    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl" onSubmit={uploadFile} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">XML File Import</span>
                </label>
                <div className="flex gap-2">
                    <input
                        ref={uploadInputRef}
                        type="file"
                        className="file-input file-input-bordered file-input-primary" />
                    <button className="btn btn-primary mr-2" >Upload</button>
                </div>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}