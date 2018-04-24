import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'antd';
import { Modal } from 'antd';
import './PhotoDetail.css';

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
    const style =  {
      maxWidth: '300px',
      padding: '5px'
    }

    return(
      <div>
        <li>
         <img src={ photoUrl } style={ style } alt="img"  onClick={ this.showModal }/>
        </li>
          <Modal 
            visible={ this.state.visible }
            wrapClassName="vertical-center-modal"
            footer={ null }
            onCancel={ this.handleCancel }
            onCreate={ this.handleCancel }>
            <img src={ photoUrl } alt="img" />
          </Modal>
      </div>
    );
  }
}

export default PhotoDetail;
