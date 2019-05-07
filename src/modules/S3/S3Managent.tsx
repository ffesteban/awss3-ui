import * as React from 'react';
import { Table } from 'reactstrap';
import * as Loader from 'react-loader';
import { FileDropzone } from 'src/share/components/FileDropzone/FileDropzone';
import { S3FileService } from 'src/share/services/s3File.service';
import './s3Management.css';
import mp3Icon from '../../images/mp3.png';
import pdfIcon from '../../images/pdf.png';
import downloadIcon from '../../images/download.jpg';
import deleteIcon from '../../images/delete.png';

export interface IManagementProps {
  history: any;
};

export interface IManagementState {
  files: IS3File[];
  loading: boolean;
};

interface IS3File {
  ETag: string,
  Key: string,
  LastModified: string,
  Owner: { DisplayName: string, ID: string }
  Size: number
  StorageClass: string
}

export default class S3Managent extends React.Component<IManagementProps, IManagementState> {
  constructor(props: any) {
    super(props);
    this.state = {
      files: [],
      loading: false
    }
  }
  public async componentDidMount() {
    await this.fetchData();
  }
  public async fetchData() {
    try {
      this.setState({ loading: true });
      const files = await S3FileService.getAllFiles();      
      this.setState({ files, loading: false });
    } catch (err) {
      this.setState({ loading: false });
    }
  }
  public readFile(file: File): Promise<any> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (result) => this.onLoadFile(result, resolve)
    });
  }

  public onLoadFile(result: any, resolve: any) {
    const base64 = result.target && result.target.result || '';
    resolve(base64);
  }
  public async downloadFile(fileName: string) {
    try {
      this.setState({ loading: true });
      await S3FileService.getFile(fileName);
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false });
    }
  }
  public uploadFiles = async (acceptedFiles: File[]) => {
    try {
      this.setState({ loading: true });
      const filesPromises = acceptedFiles.map(file => this.uploadFile(file));
      await Promise.all(filesPromises);
      await this.fetchData();
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false });
    }
  }
  public uploadFile = async (file: File) => {
    try {
      this.setState({ loading: true });
      const base64 = await this.readFile(file);
      await S3FileService.uploadFile(base64, file.name);
      this.setState({ loading: false });
    } catch {
      this.setState({ loading: false });
    }

  }
  public deleteFile = async (fileName: string) => {
    try {
      this.setState({ loading: true });
      await S3FileService.deleteFile(fileName);
      await this.fetchData();
      this.setState({ loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }

  public render() {
    return (
      <div className="s3-management-container">
        <header className="header">
          <h1 className="title">Amazon Simple Storage Service (Amazon S3)</h1>
          <FileDropzone uploadFiles={this.uploadFiles} />
          <Loader loaded={!this.state.loading} />
        </header>
        <div className="content">
          <Table dark={true}>
            <thead>
              <tr>
                <th>File</th>
                <th>Name</th>
                <th>Last Modified</th>
                <th>Size</th>
                <th>Download</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.files ? this.state.files.map(file =>
                <tr key={file.Key}>
                  <td><img src={file.Key.split('.').pop() === 'mp3' ? mp3Icon : file.Key.split('.').pop() === 'pdf' ? pdfIcon : `https://s3.amazonaws.com/filess3aws/${file.Key}`} /></td>
                  <td>{file.Key}</td>
                  <td>{file.LastModified}</td>
                  <td>{file.Size}</td>
                  <td><img className="row-icon" src={downloadIcon} alt="Download" onClick={() => this.downloadFile(file.Key)} /></td>
                  <td><img className="row-icon" src={deleteIcon} alt="Delete" onClick={() => this.deleteFile(file.Key)} /></td>
                </tr>
              ) : <></>}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
