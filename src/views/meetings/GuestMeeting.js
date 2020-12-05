import React, { useState, useEffect } from "react";
import ProgressComponent from "@material-ui/core/CircularProgress";

import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
// import CKEditor from "@ckeditor/ckeditor5-react";
import CKEditor from "react-ckeditor-component";
import { CCollapse } from "@coreui/react";
import Axios from "axios";
import cryptoRandomString from "crypto-random-string";
import qs from "query-string";
import { StethoscopeModal } from './StethoscopeModal';

const GuestMeeting = (props) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [assessment, setassessment] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [assessmentcollapse, setassessmentcollapse] = useState(false);
  const [visit, setVisit] = useState({});
  const [roomName, setroomName] = useState(null);
  const [selectedFile, setselectedFile] = useState(null);

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };
  const assessmenttoggle = (e) => {
    setassessmentcollapse(!assessmentcollapse);
    e.preventDefault();
  };
  const containerStyle = {
    width: "100%",
    height: "100%",
    marginBottom: "50px",
  };

  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
  };

  cryptoRandomString({ length: 10, type: "numeric" });

  async function startConference(consultantId) {
    try {
      console.log("Random String", cryptoRandomString);
      const domain = "meet.cloudclinic.ai";
      var id = 5;
      // linkdata = () => {
      const visitresponse = await Axios.get(
        `https://cloudclinicapi.azurewebsites.net/api/visit/${consultantId}`
      );
      console.log("api response", visitresponse);
      setroomName(visitresponse?.data.meetinglink || "");
      // };
      // const roomName = "cloudclinic_" + new roomName
      const options = {
        // roomName: "cloudclinic_12345",
        roomName: visitresponse?.data.meetinglink,

        height: 400,
        parentNode: document.getElementById("jitsi-container"),
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUEST: false,
        },
        configOverwrite: {
          disableSimulcast: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      api.addEventListener("videoConferenceJoined", () => {
        console.log("Local User Joined");
        setLoading(false);
        api.executeCommand("displayName", "Cloud Clinic");
      });
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  }

  useEffect(() => {
    let consultantId = qs.parse(props.location.search)?.Consultant; //optional chaining
    // setConsultantId(consultantId);
    // verify the JitsiMeetExternalAPI constructor is added to the global..
    if (window.JitsiMeetExternalAPI) startConference(consultantId);
    else alert("Jitsi Meet API script not loaded");

    async function fetchVsit() {
      const visitResponse = await Axios.get(
        `https://cloudclinicapi.azurewebsites.net/api/visit/${consultantId}`
      );
      console.log("api response", visitResponse);
      setVisit(visitResponse?.data || {});
      setContent(visitResponse?.data?.summaryNotes || "");
      setassessment(visitResponse?.data?.prescription || "");
    }

    fetchVsit();
  }, []);

  //Handle Click
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();

    alert("File Clicked");
  };
  //Handle On Change
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  //Content
  const updateContent = (newContent) => {
    setContent(newContent);
  };

  const onChange = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    setContent(newContent);
  };
  const onAssessmentChange = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newAssessment = evt.editor.getData();
    setassessment(newAssessment);
  };

  const onBlur = (evt) => {
    console.log("onBlur event called with event info: ", evt);
  };

  const afterPaste = (evt) => {
    console.log("afterPaste event called with event info: ", evt);
  };
  //Update
  const handleUpdate = () => {
    Axios.put(`https://cloudclinicapi.azurewebsites.net/api/visit/${visit.id}`, {
      id: visit.id,
      summaryNotes: content,
      prescription: assessment,
      startDateTime: visit.startDateTime,
      endDateTime: visit.endDateTime,
    }).then((res) => {
      console.log(res);
    });
  };
  //Link
  function openTab() {
    window.open(
      "https://med-samples.github.io/HeartBeatSystem/doctorRoom101.html"
    );
  }
  //File Change Handler
  const fileChangedHandler = (event) => {
    setselectedFile({
      file: event.target.files[0],
    });
  };
  //Upload Handler
  const uploadHandler = () => {
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
  };
  let addModalClose = () => this.setState({ addModalShow: false });
  return (

    

    <div style={containerStyle}>

<div class="row">
    <div class="col-md-4">
        <h4>Patient Assessment</h4>
    </div>
      </div>
<hr></hr>

      <Row>
        <Col>
          <h5
            style={{
              textAlign: "right",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={openTab}>
            <img src="avatars/stethoscope.png" style={{width:50}} alt="Heart beat"></img>
            {/* <ButtonToolbar>
                                <Button onClick={() => this.setState({ addModalShow: true })}>▶️
                                    </Button>
                                <StethoscopeModal
                                    show={this.state.addModalShow}
                                    onHide={addModalClose} />
                            </ButtonToolbar> */}
          </h5> 
        </Col>
      </Row>
      <Row>
        <Col md="8">
          {loading && <ProgressComponent />}
          <div id="jitsi-container" style={jitsiContainerStyle} />
        </Col>

        <Col md="4">


  <div class="card" style={{ width: 340 }}>
    {/* <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div> */}

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
      <h5>Prescription</h5>
      <CKEditor
              activeClass="p10"
              content={content}
              events={{
                blur: onBlur,
                afterPaste: afterPaste,
                change: onChange,
              }}
            />
      </div>
    </div>
  </div>

  <div class="card" style={{ width: 340 }}>
    {/* <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h5>
    </div> */}
    <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
      <h5>Initial Assessment & Summery</h5>
      <CKEditor
              activeClass="p10"
              content={assessment}
              events={{
                blur: onBlur,
                afterPaste: afterPaste,
                change: onAssessmentChange,
              }}
            />
      </div>
    </div>
  </div>
  
          {/* <h3 onClick={toggle} style={{ textAlign: "left" }}>
            Prescription
          </h3>
          <CCollapse show={collapse}>
            
          </CCollapse>
          <h3 onClick={assessmenttoggle} style={{ textAlign: "left" }}>
            Initial Assessment
          </h3>
          <CCollapse show={assessmentcollapse}>
            
          </CCollapse> */}
        </Col>
      </Row>
      <div style={{ margin: "50px" }}>
        <Row>
          <Col md="6">
            <Button
              style={{ width: "300px", marginTop: "50px", marginLeft: "20%" }}
              onClick={handleUpdate}>
              Update
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GuestMeeting;
