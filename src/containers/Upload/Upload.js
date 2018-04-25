import React, { Component } from 'react';
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

class Upload extends Component {

  render() {
    let uploadButton = (
      <Button type="button">
        <label htmlFor="uploader">
        <FileUploader
          hidden
          id="uploader"
          accept="image/*"
          randomizeFilename
          storageRef={firebase.storage().ref('photos')}
          onUploadStart={this.props.handleUploadStart}
          onUploadError={this.props.handleUploadError}
          onUploadSuccess={this.props.handleUploadSuccess}
        />
          UPLOAD
        </label>
      </Button>
    );

    let submitButton;
    if (this.props.isUploaded) {
      submitButton = <Button htmlType="submit" >SUBMIT</Button>
    };

    return (
      <Aux>
        <form onSubmit={this.props.handleSubmit}>
          {this.props.isUploading &&
            <Spin />
          }
          {this.props.photoUrl &&
            <Img src={this.props.photoUrl} alt="img" />
          }
          <div>
            { uploadButton }
            { submitButton }
          </div>
        </form>
      </Aux>
    );
  }
}

export default Upload;
