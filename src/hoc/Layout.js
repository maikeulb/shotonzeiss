import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

import Aux from './Aux';
import { Layout as AntLayout, Menu, Icon, Modal } from 'antd';
import styled from 'styled-components';
import logo from '../assets/logo.png';

import Upload from '../components/Upload/Upload';
import moment from 'moment';
const { Header, Content, Footer, Sider } = AntLayout;

const Trigger = styled.div`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
}
`;

const Logo = styled.div`
  height: 88px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  padding: 0 0px;
  font-weight: bold;
`;

class Layout extends Component {
  state = {
    isUploading: false,
    isUploaded: false,
    visible: false,
    collapsed: true,
  };

  handleUploadSuccess = (filename) => {
    this.props.onUploadPhoto(filename, this.props.token);
    this.setState({
      isUploading: false,
      isUploaded: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const photoData = {
     photoUrl: this.props.photoUrl,
     userId: this.props.user.uid,
     displayName: this.props.user.displayName,
     avatarURL: this.props.user.photoURL,
     dateCreated: moment().toISOString()
    }
    this.setState({
      isUploading: false,
      isUploaded: false,
      visible: false,
    });
    this.props.onSubmitPhoto(photoData, this.props.token);
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true, 
      isUploaded: false, 
    });
  };

  handleUploadError = (error) => {
    this.setState({
      isUploading: false,
      isUploaded: false, 
    });
    console.error(error);
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
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

  render () {
    const profile = this.props.isAuthenticated ? 
              (<Menu.Item key="1"><Link to={`/users/${this.props.user.uid}`}><span>Profile</span></Link></Menu.Item>):
              ("")
    const upload = this.props.isAuthenticated ? 
              (<Menu.Item key="2"><span onClick={ this.showModal }>Upload</span></Menu.Item>):
              ("")
    const auth = this.props.isAuthenticated ? 
              (<Link to='/logout'><span>Logout</span></Link>):
              (<Link to='/login'><span>Login</span></Link>)
    return (
      <Aux>
        <AntLayout>
          <Sider
            trigger={null}
            collapsedWidth="0"
            breakpoint="md"
            width="120"
            collapsible
            onCollapse={(collapsed, type) => { }}
            collapsed={this.state.collapsed}>
            <Logo>
              <Link to='/'><span><img style={{ maxWidth: "88px"}} src={logo} alt="zeiss" /></span></Link>
            </Logo>
            <Menu theme="light" mode="inline" >
              { profile }
              { upload }
              <Menu.Item key="3">{ auth }</Menu.Item>
            </Menu>
          </Sider>

        <AntLayout style={{ height:"100vh" }}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Trigger>
              <Icon
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                style={{cursor:'pointer'}}
              />
              </Trigger>
          </Header>
          <Content style={{ textAlign: 'center' }}>
            <main>
              {this.props.children}
              <Modal 
                visible={ this.state.visible }
                wrapClassName="vertical-center-modal"
                width='500'
                closable={false}
                footer={null}
                onCancel={ this.handleCancel }
                onCreate={ this.handleCancel }>
                <Upload
                   handleUploadStart={this.handleUploadStart} 
                   handleUploadError={this.handleUploadError} 
                   handleUploadSuccess={this.handleUploadSuccess} 
                   handleSubmit={this.handleSubmit} 
                   photo={this.props.photo} 
                   photoUrl={this.props.photoUrl} 
                   isUploading={this.state.isUploading} 
                   isUploaded={this.state.isUploaded} 
                />
              </Modal>
            </main>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2018
          </Footer>
        </AntLayout>
      </AntLayout>
    </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.user !== null,
    user: state.auth.user,
    token: state.auth.token,
    loading: state.photos.loading,
    photo: state.photos.photo,
    photoUrl: state.photos.photoUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitPhoto: (photoData, token) => dispatch(actions.submitPhoto(photoData, token)),
    onUploadPhoto: (filename, token) => dispatch(actions.uploadPhoto(filename, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
