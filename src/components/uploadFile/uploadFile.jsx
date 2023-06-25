import { useState } from "react";
import * as uploadService from "../../services/uploadService";

function UploadExcelFile(props) {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  
  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        setExcelFile(selectedFile);
        props.onExcelDataErrorMessage(null);
      } else {
        props.onExcelDataErrorMessage("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const formData = new FormData();
      formData.append("xlsx", excelFile);
      const excelResponseData = await uploadService.uploadFile(formData);
      if (excelResponseData) {
        props.onExcelData(excelResponseData);
      }
    }
  };

  return (
    <div className="container">
      {/* upload file section */}
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="file"
            className="form-control float-left width-16em"
            onChange={handleFile}
            required
          ></input>
          &nbsp; &nbsp;
          <button type="submit" className="btn btn-success">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadExcelFile;
