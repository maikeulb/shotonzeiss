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
    const { photoUrl } = this.props.photo;
    return(
      <div>
         <img src={ photoUrl } alt="img"  onClick= {this.showModal}/>
          <Modal 
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCancel}>
            <img src={ photoUrl } alt="img" />
          </Modal>
      </div>
    );
  }
}

export default PhotoDetail;
