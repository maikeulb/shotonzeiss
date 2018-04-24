import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import styled from 'styled-components';

const Img = styled.img `
  max-width: 600px;
  max-height: 600px;

  @media screen and (max-width: 600px){
    width: 100%;
  }
`;

class ProfilePage extends Component {
  state = {
    photo: '',
    isUploading: false,
    progress: 0,
    photoUrl: ''
  };

  handleChangePhoto = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      this.setState({
        photo
      });
    }
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      photo: filename, 
      progress: 100, 
      isUploading: false
    });
    firebase.storage().ref('photos').child(filename).getDownloadURL()
      .then(url => this.setState({
        photoUrl: url
      })
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    firebase.database().ref('photos').push(this.state.photoUrl);
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true, 
      progress: 0
    });
  };

  handleProgress = (progress) => {
    this.setState({
      progress
    });
  };

  handleUploadError = (error) => {
    this.setState({
      isUploading: false
    });
    console.error(error);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }
          {this.state.photoUrl &&
            <Img src={this.state.photoUrl} alt="img" />
          }
          <FileUploader
            accept="image/*"
            randomizeFilename
            storageRef={firebase.storage().ref('photos')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          <button type="submit" >SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default ProfilePage;
