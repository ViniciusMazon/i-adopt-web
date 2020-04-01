import React from 'react';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { DropContainer, DropContent, UploadMessage } from './styles';

export default function ImageUpload({ onUpload }) {

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>
        <FontAwesomeIcon icon={faFileUpload} color={'#999'} style={{ height: 100 }} />
      </UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type="error">
        <FontAwesomeIcon icon={faTimesCircle} color={'#E57878'} style={{ height: 100 }} />
      </UploadMessage>
    }

    return <UploadMessage type="success">
      <FontAwesomeIcon icon={faCheckCircle} color={'#78E5D5'} style={{ height: 100 }} />
    </UploadMessage>
  }

  return (
    <DropContainer>
      <Dropzone accept='image/*' onDropAccepted={onUpload}>
        {
          ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContent
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {renderDragMessage(isDragActive, isDragReject)}
            </DropContent>
          )
        }
      </Dropzone>
    </DropContainer>
  );
}
