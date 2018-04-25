import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-photos';

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
  // componentWillReceiveProps(nextProps) {
    // this.setState({ photos: nextProps.photos });
  // }

  state = {
    layoutReady: false
  }

  handleLayoutReady = () => {
		if (!this.state.layoutReady) {
			this.setState({ layoutReady: true });
		}
	}

  render() {
    let propsphotos = [
      { id: 9, 
        photoUrl: "https://c2.staticflickr.com/4/3261/3228647240_ff320e465f_z.jpg" 
      },
      { id: 10, 
        photoUrl: "https://c2.staticflickr.com/4/3851/14586984988_be404b8229.jpg" 
      },
      { id: 11, 
        photoUrl: "https://c2.staticflickr.com/2/1008/5187060734_fe0f56630f_z.jpg" 
      },
      { id: 17, 
        photoUrl: "https://c2.staticflickr.com/8/7051/6967003046_2859fa47ea_b.jpg" 
      },
     ]

    let photos = <Spin />;
    if ( !this.props.loading ) {
      photos = knuthShuffle(propsphotos);
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

const mapStateToProps = state => {
  return {
    photos: state.photos.photos,
    // loading: state.user.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserPhotos: (userId) => dispatch( actions.fetchUserPhotos(userId) ),
    onFetchSinglePhoto: (photoId) => dispatch( actions.fetchSinglePhoto(photoId) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( UserPhotos, axios ));
