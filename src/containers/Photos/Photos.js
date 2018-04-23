import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc//withErrorHandler';

import PhotoDetail from '../../components/PhotoDetail/PhotoDetail';

import Masonry from 'react-masonry-component';
import axios from '../../axios-orders';
import { Spin } from 'antd';
import * as actions from '../../store/actions/index';

class Photos extends Component {
  state = {
    type: "feed"
  };

  componentDidMount() {
    this.props.onFetchAllPhotos();
  }

  render() {
    let photos = <Spin />;
    if ( !this.props.loading ) {
      photos = this.props.photos;
    }

    let masonryOptions = {
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
          {images.map(image =>
            <PhotoDetail
              key={ image.id }
              image={ image }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotosIndex);
export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );
