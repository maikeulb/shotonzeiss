import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Aux from './Aux';
import { Layout as AntLayout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import logo from '../assets/logo.png';

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
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
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
              <img style={{ maxWidth: "100px"}} src={logo} alt="zeiss" />
            </Logo>
            <Menu theme="light" mode="inline" >
              <Menu.Item key="1"><Link to='/'><span>Photos</span></Link></Menu.Item>
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

export default Layout
