import * as React from 'react';
import Dropzone from 'react-dropzone';
import './fileDropzone.css';

interface IFileDropzone {
    uploadFiles: (acceptedFiles: File[]) => void;
}

export const FileDropzone = (props: IFileDropzone) =>
    <div className="file-dropzone-container">
        <Dropzone onDrop={acceptedFiles => props.uploadFiles(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Upload files</p>
                    </div>
                </section>
            )}
        </Dropzone>
    </div>

