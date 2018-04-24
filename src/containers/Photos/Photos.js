import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc//withErrorHandler';

import PhotoDetail from '../PhotoDetail/PhotoDetail';

import Masonry from 'react-masonry-component';
import axios from '../../axios-photos';
import { Spin } from 'antd';
import * as actions from '../../store/actions/index';
import { knuthShuffle } from 'knuth-shuffle';

class Photos extends Component {
  componentDidMount() {
    this.props.onFetchAllPhotos();
  }

  render() {
    const style = {
        margin: 'auto',
        padding: '100px'
    }
    let propsphotos = [
      { id: 1, 
        photoUrl: "https://c2.staticflickr.com/8/7293/8742242967_b754f7500a_n.jpg" 
      },
      { id: 2, 
        photoUrl: "https://c2.staticflickr.com/8/7141/6638104147_b213425451_n.jpg"
      },
      { id: 3, 
        photoUrl: "https://c1.staticflickr.com/9/8223/8310576116_bd991eaaff_n.jpg"
      },
      { id: 4, 
        photoUrl: "https://c1.staticflickr.com/9/8260/8698921351_6ef81d94f0_n.jpg"
      },
      { id: 5, 
        photoUrl: "https://c2.staticflickr.com/8/7096/6923520906_48d6e6cb14_n.jpg"
      },
      { id: 6, 
        photoUrl: "https://c2.staticflickr.com/4/3240/2397777211_bde089af4f_n.jpg"
      },
      { id: 7, 
        photoUrl: "https://c2.staticflickr.com/4/3096/2492584968_af2f309c59_n.jpg" 
      },

      { id: 8, 
        photoUrl: "https://c2.staticflickr.com/4/3785/8990964850_df78fc8ac9_n.jpg" 
      },

      { id: 9, 
        photoUrl: "https://c2.staticflickr.com/4/3851/14586984988_be404b8229.jpg" 
      },

     ]

    let photos = <Spin />;
    if ( !this.props.loading ) {
      photos = propsphotos;
      photos = knuthShuffle(propsphotos);
    }

    const masonryOptions = {
      transitionDuration: 1,
      fitWidth: false
    };

    return (
      <div style = {style}>
        <Masonry
          elementType={'ul'}
          options={ masonryOptions }
          disableImagesLoaded={ false }
          updateOnEachImageLoad={ false }
          >
          { photos.map( photo =>
            <PhotoDetail
              key={ photo.id }
              photo={ photo }
              />) }
        </Masonry>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
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
