import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';

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
          <img src={ photoUrl } alt="img" />
          <div>
            <span>
              { user }
            </span>
          </div>
        </li>
      </Button>
    );

    return(
      <div>
        { photoButton }
          <Modal 
            visible={this.state.showModal}
            onCancel={this.handleCancel}
            onCreate={this.handleCancel}>
            <div>
              <img src={ photoUrl } alt="img" />
              <div>
              <Link to={`/user/${userId}`}>
                <img src={ userPhotoUrl} alt="img"/>{ user }
              </Link>
              </div>
            </div>
          </Modal>
      </div>
    );
  }
}

export default PhotoDetail;
