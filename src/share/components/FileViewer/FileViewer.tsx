import * as React from 'react';
import FileViewer from 'react-file-viewer';
// import './fileViewer.css';

interface IFileViewer {
  key: string;
  onError: (e: any) => void;
}

export const FileViewerComponent = (props: IFileViewer) =>
  <div className="file-viewer-container">
    <FileViewer
      key={props.key}
      fileType={props.key.split('.').pop()}
      filePath={`https://s3.amazonaws.com/filess3aws/${props.key}`}
      // errorComponent={CustomErrorComponent}
      onError={props.onError} />
  </div>

