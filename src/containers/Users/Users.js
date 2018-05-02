import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import UserDetails from '../../components/UserDetails/UserDetails';

import { Spin } from 'antd';
import styled from 'styled-components';

const Container= styled.div `
  margin-right: 0px;

  @media screen and (max-width: 700px){
    margin-left: 0;
    margin-right: 0;
  }
`;

class Users extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    let users = <Spin />;
    if ( !this.props.loading ) {
      users = this.props.users;
    }
    { console.log(this.props.users) }
    let userDetails = <Spin />;
    if ( !this.props.loading ) {
      userDetails = users.map( user =>
        <UserDetails
          key={ user.id }
          user={ user }
        />
      );
    }

    return (
      <Container>
        { userDetails }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => dispatch( actions.fetchUsers() ),
  };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Users ));
