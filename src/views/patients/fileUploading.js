import zIndex from "@material-ui/core/styles/zIndex";
import Axios from "axios";
import React, { useState } from "react";
import {useParams} from 'react-router';
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { store } from "./../../store";

const styles = {
  container: {
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    padding: "2rem",
    minHeight: "50vh",
    background: "#fff",
  },
};

const FileUploader = (props) => {
  const [images, setImages] = useState([]);
  const [visitId, setvisitId] = useState(null);
  const [PatientId, setPatientId] = useState(null);
  const [ImageName, setImageName] = useState("");
  const [ImagePath, setImagePath] = useState("");
  // const { id } = useParams();
  // console.log("id of  url",useParams())
  const handleFileChange = (input) => {
    const file = input.target.files?.[0];
    if (file) {
      let newImage = {
        name: file.name,
        file,
        url: URL.createObjectURL(file),
      };
      setImages((oldArray) => [...oldArray, newImage],()=>{console.log("in images folder",newImage)});
    }
  };

  //Create Upload
  const createUpload = async (event) => {
    let formData = new FormData();
    formData.append("body", images[0].file);
    console.log("formdata in append",formData.get("body"));
    let response = await Axios.post(
      "https://cloudclinicapi.azurewebsites.net/api/UploadFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("axios repo", response);
  };
  //Save File On Database
  const SaveImageData = (event) => {
    // console.log("LabTest Enevt", this.state);
    let formData = new FormData();
    // const { id } = useParams();

    formData.append("body", images[0].file);
    console.log("formdata in append",formData.get("body"));
    fetch("https://cloudclinicapi.azurewebsites.net/api/LabTest/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(    {
        // props.userReducer.national_id
        "visit": null,
        "visitId": event.VisitId,
        "imagePath": event.ImagePath,
        "imageName": event.ImageName,
        "isDeleted": false,
        "patientId": event.PatientId,
        "isLatest": true,
        "createdOn": "2020-11-30T00:00:00"
    },),
    })
      .then((response) => response.json())
      .then((status) => console.log(status))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  };

  const postDataAsync=async ()=>{
    // itemData.preventDefault();
    // console.log("data in post",itemData)
    // url for api

    let id=props.match.params.id;

    console.log("counter in posting of url",id)

    var request = `http://cloudclinicapi.azurewebsites.net/api/visit/${id}`
    console.log("request of login task:", request);

    // Api call method configuration
    let details = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }

    let response = await fetch(request, details)
    let data = await response.json()
    return data;
  }
  const  postClientData=()=> {

    try {
     postDataAsync()
        .then(data => {
          console.log("get asyn Data:", data)

          console.log("get asyn Data:", data.patient_NationalID)
          for (let i=0;i<images.length;i++){
            console.log("selected images name",images[i].name)
            var event={
              isDeleted: false,
              ImagePath: images[i].url,
              ImageName: images[i].name,
               VisitId: data.id,
     PatientId: data.patient_NationalID,
            }
            

            SaveImageData(event);
            }
            // SaveImageData(event);

                createUpload();
                
            
                alert("File Saved");
        });
    }
    catch (e) {
      console.log("Data Not Returned: ", e)


    }
  }
  const handleFileUploading = () => {
    // let event = {
    //   isDeleted: false,
    //   ImagePath: images[0].url,
    //   ImageName: images[0].name,
    //   // VisitId: visitData.VisitId,
    //   // PatientId: patientData.PatientId,
    // };
  
// for (let i=0;i<images.length;i++){
// console.log("selected images name",images[i].name)
// var event={
//   isDeleted: false,
//   ImagePath: images[i].url,
//   ImageName: images[i].name,
// }
// SaveImageData(event);
// }
//     createUpload();
    

//     alert("File Saved");
postClientData()
  };

  const handleDeleteRow = (index) => {
    alert("Row Deleted");
  };

  return (
    <div className="container p-5">
      <div style={styles.container}>
        <div className="row">
          <div className="col-sm-3" style={{ overflow: "hidden" }}>
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              className="btn btn-primary my-5"
              disabled={images.length < 1}
              onClick={handleFileUploading}
            >
              Upload All Files
            </button>
          </div>
          <div className="col-sm-9">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>Image</th>
                  <th>Image Name</th>
                  <th>Temp Path</th>
                </tr>
              </thead>
              <tbody>
                {images.map((x, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img src={x.url} width="100" />
                    </td>
                    <td>{x.name}</td>
                    <td width="25%">{x.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default FileUploader;
const mapStateToProps = (state) => {
  return {
    // national_id: state.national_id,
    userReducer: state.userReducer,

  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setToken: () => dispatch(alert("")),
//   };
// };

export default connect(mapStateToProps)(FileUploader);
