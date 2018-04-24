import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'antd';
import { Modal } from 'antd';
import './PhotoDetail.css';
import styled from 'styled-components';

const Img = styled.img `
  width: 400px;
  padding: 5px;

  @media screen and (max-width: 400px){
    width: 100%;
  }
`;

const ImgModal = styled.img `
  width: 600px;

  @media screen and (max-width: 600px){
    width: 100%;
  }
`;



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
        <li>
          <Img src={ photoUrl }  alt="img"  onClick={ this.showModal }></Img>
        </li>
          <Modal 
            visible={ this.state.visible }
            wrapClassName="vertical-center-modal"
            width='500'
            footer={ null }
            onCancel={ this.handleCancel }
            onCreate={ this.handleCancel }>
            <ImgModal src={ photoUrl } alt="img" />
          </Modal>
      </div>
    );
  }
}

export default PhotoDetail;
