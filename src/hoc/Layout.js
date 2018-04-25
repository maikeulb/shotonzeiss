import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './Aux';
import { Layout as AntLayout, Menu, Icon, Modal } from 'antd';
import styled from 'styled-components';
import logo from '../assets/logo.png';

import Upload from '../containers/Upload/Upload';
const { Header, Content, Footer, Sider } = AntLayout;

const Trigger = styled.div`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
}
`;

const Logo = styled.div`
  height: 100px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  padding: 0 10px;
  font-weight: bold;
`;

class Layout extends Component {
  state = {
    collapsed: true,
    visible: false
  }

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
              (<Menu.Item key="1"><Link to='/users/1'><span>Profile</span></Link></Menu.Item>):
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
            width="140"
            collapsible
            onCollapse={(collapsed, type) => { }}
            collapsed={this.state.collapsed}>
            <Logo>
              <Link to='/'><span><img style={{ maxWidth: "100px"}} src={logo} alt="zeiss" /></span></Link>
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
                onClick={this.toggle}/>
              </Trigger>
          </Header>
          <Content style={{ textAlign: 'center' }}>
            <main>
              {this.props.children}
              <Modal 
                visible={ this.state.visible }
                wrapClassName="vertical-center-modal"
                width='500'
                onCancel={ this.handleCancel }
                onCreate={ this.handleCancel }>
                 <Upload/>
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
        isAuthenticated: state.auth.user !== null
    };
};

export default connect( mapStateToProps )( Layout );
