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
    const photoButton =(
      <Button type="primary" onClick = {this.showModal}>
        <li>
          <img src={ props.imageUrl } />
          <div>
            <span>
              { props.user }
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
            onCreate={this.handleCancel}
            <div>
              <img src={ props.imageUrl} />
              <div>
                <h3> "{ props.title }" </h3>
              <Link to={`/user/${props.userId}`}>
                <img src={ props.userImageUrl} />{ props.user }
              </Link>
              </div>
            </div>
          </Modal>
      </div>
    );
  }
}

export default PhotoDetail;
