import React from 'react';
import { Icon } from 'antd';

const isFollowing=true

class Follow extends React.Component {
  render() {
    const followIcon= (isFollowing) ? "user-delete" : "user-add";

    return(
      <Icon type= {followIcon} style={{fontSize: '16'}} />
    );
  }

}


export default Follow;
