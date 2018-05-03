import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { Row, Col, Input, Icon } from 'antd';


import Follow from '../../components/Follow/Follow';

import { List, Button, Spin, Avatar, Card } from 'antd';
import styled from 'styled-components';

const Search = Input.Search;

const SearchDiv= styled.div `
  margin: 0 auto;
  width: 400px;
  padding: 10px;

  @media screen and (max-width: 400px){
    padding: 5px;
    width: 100%;
  }
`;

const Container = styled.div `
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

  state = {
     username: ''
  };

  updateSearch = (event) => {
    this.setState({ 
      username: event.target.value.substr(0, 20)
    })
  }

  render() {
    let filteredUsers = <Spin />;
    if ( !this.props.loading ) {
      filteredUsers = this.props.users.filter( user => {
       return user.displayName.toLowerCase().indexOf(this.state.username) !== -1;
      })
    };

    const search = (
      <Search 
          placeholder="Enter a username" 
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="text" 
          value={this.state.username} 
          onChange={this.updateSearch}
        />
    );

    const userDetails = ( 
      <List
        className="demo-loadmore-list"
        loading={this.props.loading}
        itemLayout="horizontal"
        dataSource={filteredUsers}
        renderItem={user => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={user.avatarUrl} />}
              title={<Link to={`/users/${user.id}`}>{ user.displayName }</Link>}
            />
            {(this.props.auth.uid !== user.id) &&
              <Follow 
                isFollowing = { this.props.followings.includes(user.id) }
                followeeId = { user.id }
                followee = { user.displayName }
                followerId = { this.props.auth.uid }
              />
            }
          </List.Item>
        )}
      />
    );

    return (
    <Row type="flex" justify="center">
      <Col xs={22} s={18} m={12} lg={10} xl={10}>
        <Container>
          <SearchDiv>
            { search }
          </SearchDiv>
          { userDetails }
        </Container>
      </Col>
     </Row>
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
