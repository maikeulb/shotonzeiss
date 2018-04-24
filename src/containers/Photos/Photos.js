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
        paddingLeft: '20px'
    }
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

      { id: 12, 
        photoUrl: "https://c1.staticflickr.com/5/4131/5099175981_d81d3ced3a_z.jpg" 
      },

      { id: 13, 
        photoUrl: "https://c2.staticflickr.com/2/1093/662891484_5ec3124166_o.jpg" 
      },

      { id: 14, 
        photoUrl: "https://c1.staticflickr.com/3/2692/4244704338_440f9ac6c4_b.jpg" 
      },

      { id: 15, 
        photoUrl: "https://c1.staticflickr.com/7/6221/6223676266_f0a8d1536b_b.jpg" 
      },

      { id: 16, 
        photoUrl: "https://c1.staticflickr.com/5/4075/4914495090_ddd3695097_b.jpg" 
      },

      { id: 17, 
        photoUrl: "https://c2.staticflickr.com/8/7051/6967003046_2859fa47ea_b.jpg" 
      },

      { id: 18, 
        photoUrl: "https://c1.staticflickr.com/9/8223/8310576116_bd991eaaff_b.jpg" 
      },

      { id: 19, 
        photoUrl: "https://c2.staticflickr.com/4/3240/2397777211_bde089af4f_b.jpg" 
      },

      { id: 20, 
        photoUrl: "https://c1.staticflickr.com/9/8127/8989452243_ce77f86527_b.jpg" 
      },

      { id: 21, 
        photoUrl: "https://c2.staticflickr.com/8/7141/6638104147_b213425451_b.jpg" 
      },

      { id: 22, 
        photoUrl: "https://c1.staticflickr.com/9/8260/8698921351_6ef81d94f0_b.jpg" 
      },

      { id: 23, 
        photoUrl: "https://c2.staticflickr.com/4/3708/9475261399_acd7f52899_b.jpg" 
      },

      { id: 24, 
        photoUrl: "https://c2.staticflickr.com/8/7317/12124091956_3c18c9004e_b.jpg"
      },

     ]


    let photos = <Spin />;
    if ( !this.props.loading ) {
      photos = propsphotos;
      // photos = knuthShuffle(propsphotos);
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
