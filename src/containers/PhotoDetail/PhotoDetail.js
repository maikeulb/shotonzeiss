import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import './PhotoDetail.css';
import styled from 'styled-components';
import { Avatar } from 'antd';


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Img = styled.img `
  width: 350px;
  padding: 5px;

  @media screen and (max-width: 350px){
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
  padding-top: 10px;
`;

const Li = styled.div `
  list-style-type: none;
  cursor: pointer;
`;

const Span = styled.span `
  display: flex;
  text-decoration: none;
  justify-content: flex-end;
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

  closeModal = () => {
    this.setState({ 
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({ 
      visible: false 
    });
  }

  render() {
    const { photoUrl, diplayName, photoURL, userId } = this.props.photo;

    return(
      <div>
        <Li>
          <Img src={ photoUrl }  alt="img"  onClick={ this.showModal }></Img>
        </Li>

          <Modal 
            visible={ this.state.visible }
            wrapClassName="vertical-center-modal"
            width='500'
            closable={ false }
            footer={ null }
            onCancel={ this.handleCancel }
            onCreate={ this.handleCancel }>
              <ImgModal src={ photoUrl } alt="img" />
            <Footer>
              <StyledLink onClick={ this.closeModal } to={`/users/${userId}`}>
                <Span>
                  <span style={{paddingRight:"10px", paddingTop:"5px"}}>{ diplayName } </span>
                  <Avatar size="large" shape="square" src={photoURL} alt=""/>
               </Span>
              </StyledLink>
           </Footer>
          </Modal>

      </div>
    );
  }
}

export default PhotoDetail;
