import React, { Component } from 'react';

import Aux from './Aux';

import { Modal, } from 'antd';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      visible: false 
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null,
          visible: false
        });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res,
        error => {
          this.setState({
            error: error,
            visible: true
          });
        });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null,
        visible: false
      });
    }

    render() {
      return (
        <Aux>
          <Modal 
            title = "Oops"
            visible={this.state.error}
            onOk={this.errorConfirmedHandler}
            onCancel={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
      </Aux>

      );
    }
  }
}

export default withErrorHandler;
