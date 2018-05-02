import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { Row, Col } from 'antd';


import Follow from '../../components/Follow/Follow';

import { List, Button, Spin, Avatar, Card } from 'antd';
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
    this.props.onFetchFollowings(this.props.auth.uid);
  }

  render() {
    let users = <Spin />;
    if ( !this.props.loading ) {
      users = this.props.users;
    }

    const userDetails = ( 
    <Row type="flex" justify="center">
      <Col xs={22} s={20} m={16} xl={12}>
      <List
        className="demo-loadmore-list"
        loading={this.props.loading}
        itemLayout="horizontal"
        dataSource={this.props.users}
        renderItem={user => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={user.avatarUrl} />}
              title={<Link to={`/users/${user.id}`}>{user.displayName}</Link>}
            />
            {(this.props.auth.uid !== user.id) &&
              <Follow 
                isFollowing = { this.props.followings.includes(user.id)}
                followeeId = { user.id}
                followerId = { this.props.auth.uid }
              />
            }
          </List.Item>
        )}
      />
    </Col>
     </Row>
    );

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
    followings: state.followings.followings,
    auth: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => dispatch( actions.fetchUsers() ),
    onFetchFollowings: (id) => dispatch( actions.fetchFollowings(id) )
  };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Users ));
