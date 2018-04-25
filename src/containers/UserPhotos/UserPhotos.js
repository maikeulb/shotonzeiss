import React, { Component } from 'react';

import PhotoDetail from '../PhotoDetail/PhotoDetail';

import { Spin } from 'antd';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';
import { knuthShuffle } from 'knuth-shuffle';

const Container= styled.div `
  margin-left: 60px;
  margin-right: 50px;

  @media screen and (max-width: 700px){
    margin-left: 0;
    margin-right: 0;
  }
`;

class UserPhotos extends Component {
  state = {
    layoutReady: false
  }

  handleLayoutReady = () => {
		if (!this.state.layoutReady) {
			this.setState({ layoutReady: true });
		}
	}

  render() {
    let photos = <Spin />;
    if ( !this.props.loading ) {
      photos = knuthShuffle(this.props.photos);
    }

    let masonryOptions = {
      transitionDuration: 1,
      fitWidth: true
    };

    const photoDetails = photos.map( photo =>
      <PhotoDetail
        key={ photo.id }
        photo={ photo }
      />
    );

    const masonry = (
      <Container>
        <Masonry
          elementType={'ul'}
          options={ masonryOptions }
          disableImagesLoaded={ false }
          updateOnEachImageLoad={ false }
          >
          { photoDetails }
        </Masonry>
      </Container>
    );

    return masonry;
  }
}

export default UserPhotos;
