import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import uploadRequest from 'superagent';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler';

const UPLOAD_PRESET = "fornai9";
const UPLOAD_URL = "https://api.cloudinary.com/v1_1/maikeulb/photo/upload";

class Upload extends Component {
  state = {
    title: ' ',
    photoUrl: ''
  };

  updateHandler(e, field) = () => {
    this.setState({ [field]: e.currentTarget.value });
  }

  submitHandler(e) = () => {
    e.preventDefault();
    const photo = Object.assign({}, this.state);
    this.props.createSinglePhoto({ photo });
  }

  photoUploadHandler(photo) = () =>  {
    let upload = uploadRequest.post(UPLOAD_URL)
                        .field('upload_preset', UPLOAD_PRESET)
                        .field('file', photo);

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          photoUrl: response.body.secure_url
        });
      }
    });
  }

  displayPhoto() {
    if (this.state.photoUrl === '') {
      return (
        <div>
          <h4>Place Photo or Click here</h4>
        </div>
      );
      } else {
      return (
        <div>
          <img src={this.state.photoUrl}></img>
        </div>
      );
    }
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>

        <form onSubmit={this.submitHandler}>
          <span>
              <span>  &nbsp; upload &nbsp;</span>
              here
          </span>
          <br/>

          <div>
            <Dropzone
              multiple={false}
              accept="photo/*"
              onDrop={this.photoUploadHandler}>
              {this.displayPhoto()}
            </Dropzone>

            <div>
              <input type="submit" value={'create.'} />
              <span>{ this.renderErrors() }</span>
              <div>
                <label>
                  Title
                  <br/>
                  <input 
                    type="text"
                    value={this.state.title}
                    onChange={this.updateHandler('title')}
                  />
                </label>
                <br/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSinglePhoto: photo => dispatch(createSinglePhoto(photo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Upload ));
