import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Modal, Avatar } from 'antd';
import styled from 'styled-components';
import Moment from 'react-moment';
import './PhotoDetail.css';

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
  align-items: center;
  justify-content: space-between;
`;

class UserDetails extends Component {
  state = {
    visible: false
  }

  render() {
    return(
      <div>
        <Li>
          <Img src={ this.props.user.avatarUrl }  alt="img"  onClick={ this.showModal }></Img>
        </Li>
      </div>
    );
  }
}

export default withRouter(UserDetails);
