import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  width: 500px;
  margin: 2px;

  @media screen and (max-width: 600px){
    width: 100%;
  }
`;

const Footer = styled.div `
  paddingTop: 10px;
`;

const Li = styled.div `
  list-style-type: none;
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
    const { photoUrl, username, userId } = this.props.photo;

    return(
      <div>
        <Li>
          <Img src={ photoUrl }  alt="img"  onClick={ this.showModal }></Img>
        </Li>
          <Modal 
            visible={ this.state.visible }
            wrapClassName="vertical-center-modal"
            width='500'
            footer={ null }
            onCancel={ this.handleCancel }
            onCreate={ this.handleCancel }>
              <ImgModal src={ photoUrl } alt="img" />
            <Footer>
              <Link to={`/users/${userId}`}>
              <h3> { username } </h3>
              </Link>
           </Footer>
          </Modal>
      </div>
    );
  }
}

export default PhotoDetail;
