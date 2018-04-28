import React from 'react';

import PhotoDetail from '../../containers/PhotoDetail/PhotoDetail';

import { Spin } from 'antd';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';
import { knuthShuffle } from 'knuth-shuffle';

const Container= styled.div `
  margin-right: 0;

  @media screen and (max-width: 700px){
    margin-left: 0;
    margin-right: 0;
  }
`;

const userPhotos = ( props ) => {
  let photos = <Spin />;
  if ( !props.loading ) {
    photos = knuthShuffle(props.photos);
  }

  const masonryOptions = {
    transitionDuration: 0,
    isFitWidth: true,
    columWidth: 360,
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
        className='grid'
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

export default userPhotos;
