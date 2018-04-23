import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(0, 0, 0, 0.60)',
    zIndex          : 10
  },
  content : {
    position                   : 'relative',
    margin                     : 'auto',
    marginTop                  : '25px',
    border                     : '1px solid #B5B3B0',
    height                     : '450px',
    overflow                   : 'auto',
    width                      : '875px',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    backgroundColor            : 'white',
    zIndex                     : 11
  }
};



class PhotoDetail extends Component {
  state = {
    modalOpen: false,
  };

  this.closeModal = this.closeModal.bind(this);
  this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    const { user_id, image_url, title, artist, artist_image_url } = this.props.image;

    let itemButton=(
      <button className="item-button" onClick={this.openModal}>
        <li className="item">
          <img className="image" src={image_url} />
          <div className="overlay">
            <span className="artist">
              { artist }
            </span>
          </div>
        </li>
      </button>
    );

    return(

      <div className="photo-modal-container">
        { itemButton }

          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={ style }
            contentLabel="PhotoDetailModal">

            <div className="photo-modal">
              <img className="image-detail" src={image_url} />
              <div className='image-info-detail'>

                <h3 className='title-detail'> "{ title }" </h3>

              <Link to={`/user/${user_id}`}>
                <img className="artist-image" src={artist_image_url} />{ artist }
              </Link>
              </div>
            </div>
          </Modal>
      </div>
    );
  }
}

export default PhotoDetail;
