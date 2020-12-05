// import http from "../http-common";
// import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "../../node_modules/@types/selenium-webdriver/http";

class UploadFilesService {
  upload(file, onUploadProgress) {
    //     let formData = new FormData();
    //     formData.append("file", file);
    //     return http.post("/upload", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       onUploadProgress,
    //     });
    //   }
    //   getFiles() {
    //     return http.get("/files");
  }
}

export default new UploadFilesService();
