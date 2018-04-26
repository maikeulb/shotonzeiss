import React from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import styled from 'styled-components';
import { Spin, Button } from 'antd';
import Aux from '../../hoc/Aux';

const Img = styled.img `
  max-width: 600px;
  max-height: 600px;

  @media screen and (max-width: 600px){
    width: 100%;
  }
`;

const upload = ( props ) => {
  let uploadButton = (
    <Button type="button">
      <label htmlFor="uploader">
      <FileUploader
        hidden
        id="uploader"
        accept="image/*"
        randomizeFilename
        storageRef={firebase.storage().ref('photos')}
        onUploadStart={props.handleUploadStart}
        onUploadError={props.handleUploadError}
        onUploadSuccess={props.handleUploadSuccess}
      />
        UPLOAD
      </label>
    </Button>
  );

  let submitButton;
  if (props.isUploaded) {
    submitButton = <Button htmlType="submit" >SUBMIT</Button>
  };

  let spin;
  if (props.isUploading) {
    spin =  <Spin />
  };

  let photoUrl;
  if (props.photoUrl) {
    photoUrl = <Img src={props.photoUrl} alt="img" />
  };

  return (
    <Aux>
      <form onSubmit={props.handleSubmit}>
        <div>
        <div style={{margin: 'auto', textAlign: 'center'}}>
          { spin }
          { photoUrl }
        </div>
        <div>
          { uploadButton }
          { submitButton }
        </div>
        </div>
      </form>
    </Aux>
  );
}

export default upload;
