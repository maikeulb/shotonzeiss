import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/index';

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
    this.props.onFetchAllUsers();
  }

  render() {
    let users = <Spin />;
    if ( !this.props.loading ) {
      users = this.props.users;
    }

    let userDetails = <Spin />;
    if ( !this.props.loading ) {
      userDetails = users.map( photo =>
        <UserDetail
          key={ user.id }
          photo={ user }
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
    users: state.users.photos,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllUsers: () => dispatch( actions.fetchAllUsers() ),
  };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Users ));
