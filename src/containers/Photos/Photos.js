import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-component';

import PhotoDetail from '../photo_detail/photo_detail';

class Photos extends Component {
  state = {
    type: "feed"
  };

  componentDidMount() {
    this.props.fetchAllPhotos();
  }

  render() {
    let images = this.props.images;
    let masonryOptions = {
      transitionDuration: 1,
      gutter: 0,
      fitWidth: false
    };

    return (
      <div className="photos-index-container">
        <div className="sidenav">
          <span className="quote">
          <SessionFormContainer />
        </div>

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

export default withRouter(Photos);
