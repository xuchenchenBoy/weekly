import React from 'react';
import BasicLayout from './BasicLayout';
import Login from '@/pages/login';

class EntryLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectMenuKey: '', // 选择的菜单
    };

    // 重新登陆
    if (!this.isLogin()) {
      this.props.history.replace('/login');
    }
  }

  isLogin() {
    const { pathname } = this.props.location;
    const isNotLoginPath = pathname.indexOf('login') === -1;
    return localStorage.getItem('username') && isNotLoginPath;
  }

  render() {
    const { pathname } = this.props.location;
    return this.isLogin() ? (
      <BasicLayout pathname={pathname}>{this.props.children}</BasicLayout>
    ) : (
      <Login />
    );
  }
}

export default EntryLayout;
