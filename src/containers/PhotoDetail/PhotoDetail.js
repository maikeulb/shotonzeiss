import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import Aux from '../../../hoc/Aux';

class PhotoDetail extends Component {
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({ 
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({ 
      visible: false 
    });
  }

  render() {
    const { userId, photoUrl, user, userPhotoUrl } = this.props.photo;
    const photoButton =(
      <Button type="primary" onClick = {this.showModal}>
        <li>
          <img src={ photoUrl } />
          <div>
            <span>
              { user }
            </span>
          </div>
        </li>
      </Button>
    );

    return(
      <Aux>
        { photoButton }
          <Modal 
            visible={this.state.showModal}
            onCancel={this.handleCancel}
            onCreate={this.handleCancel}>
            <div>
              <img src={ photoUrl} />
              <div>
              <Link to={`/user/${userId}`}>
                <img src={ userPhotoUrl} />{ user }
              </Link>
              </div>
            </div>
          </Modal>
      </Aux>
    );
  }
}

export default PhotoDetail;
