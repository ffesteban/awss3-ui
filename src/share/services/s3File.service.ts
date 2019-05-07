import apiService from './apiService';
import * as download from 'downloadjs';
import apiConfig from '../config/apiConfig';
import { fileUtils } from '../utils/files';

export const S3FileService = {
  uploadFile: (base64: any, key: string) =>
    apiService.post(apiConfig.routes.files, { file: { key, base64 } }).then(response => response.data.success),
  getAllFiles: () => apiService.get(apiConfig.routes.files).then(response => response.data.files),
  getFile: (fileName: string) =>
    apiService.get(`${apiConfig.routes.files}/${fileName}`).then(response =>
      download(fileUtils.getBase64(response.data.base64, response.data.contentType), fileName, response.data.contentType)),
  deleteFile: (fileName: string) => apiService.delete(`${apiConfig.routes.files}/${fileName}`).then(response => response.data.success)
}
