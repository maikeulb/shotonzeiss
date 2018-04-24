import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import styled from 'styled-components';
import { Spin, Button } from 'antd';

const Img = styled.img `
  max-width: 600px;
  max-height: 600px;

  @media screen and (max-width: 600px){
    width: 100%;
  }
`;

class Upload extends Component {
  state = {
    photo: '',
    isUploading: false,
    isUploaded: false,
    photoUrl: ''
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      photo: filename, 
      isUploading: false,
      isUploaded: true
    });
    firebase.storage().ref('photos').child(filename).getDownloadURL()
      .then(url => this.setState({
        photoUrl: url
      })
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isUploading: false,
      isUploaded: false
    });
    firebase.database().ref('photos').push(this.state.photoUrl);
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true, 
      isUploaded: false, 
    });
  };

  handleUploadError = (error) => {
    this.setState({
      isUploading: false,
      isUploaded: false, 
    });
    console.error(error);
  };

  render() {
    let button = (
      <Button type="button">
        <label for="uploader">
        <FileUploader
          hidden
          id="uploader"
          accept="image/*"
          randomizeFilename
          storageRef={firebase.storage().ref('photos')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
        />
          UPLOAD
        </label>
      </Button>
    );

    if (this.state.isUploaded) {
      button = <Button type="submit" >SUBMIT</Button>
    };

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.isUploading &&
            <Spin />
          }
          {this.state.photoUrl &&
            <Img src={this.state.photoUrl} alt="img" />
          }
          <div>
            { button }
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;
