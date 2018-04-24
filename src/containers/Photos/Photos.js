import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc//withErrorHandler';

import PhotoDetail from '../PhotoDetail/PhotoDetail';

import Masonry from 'react-masonry-component';
import axios from '../../axios-photos';
import { Spin } from 'antd';
import * as actions from '../../store/actions/index';

class Photos extends Component {
  componentDidMount() {
    this.props.onFetchAllPhotos();
  }

  render() {
    let photos = <Spin />;
    if ( !this.props.loading ) {
      photos = this.props.photos;
    }

    const masonryOptions = {
      transitionDuration: 1,
      gutter: 0,
      fitWidth: false
    };

    return (
      <div>
        <Masonry className={"photos-index"}
          elementType={'ul'}
          options={masonryOptions}
          disableImagesLoaded={ false }
          updateOnEachImageLoad={ false }
          >
          {photos.map(photo =>
            <PhotoDetail
              key={ photo.id }
              photo={ photo }
              />)}
        </Masonry>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    photos: state.photos.photos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllPhotos: () => dispatch( actions.fetchAllPhotos() ),
    onFetchSinglePhoto: (photoId) => dispatch( actions.fetchSinglePhoto(photoId) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Photos, axios ) );
