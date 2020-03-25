import React from 'react';
import { Layout, Menu } from 'antd';
import { FileSearchOutlined, FilterOutlined } from '@ant-design/icons';
import styles from './index.css';
import * as umi from 'umi';

const { Link } = umi;

const { Content, Sider, Header } = Layout;

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectMenuKey: props.pathname.slice(1), // 选择的菜单
    };
  }

  handleSelectMenuItem = ({ key }) => {
    this.setState({
      selectMenuKey: key,
    });
  };

  render() {
    const { selectMenuKey } = this.state;
    return (
      <Layout className={styles.layoutContent}>
        <Sider
          breakpoint="sm"
          collapsedWidth="0"
          className={styles.layoutSider}
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className={styles.logo}>weekly</div>
          <Menu mode="inline" selectedKeys={[selectMenuKey]} onSelect={this.handleSelectMenuItem}>
            <Menu.Item key="allArticleList">
              <Link to="allArticleList">
                <FileSearchOutlined />
                <span className="nav-text">文章资源</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="recommendArticleList">
              <Link to="recommendArticleList">
                <FilterOutlined />
                <span className="nav-text">已推荐文章</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              backgroundColor: '#fff',
              height: '53px',
              lineHeight: '53px',
            }}
          >
            <div className="logo" />
          </Header>
          <Content style={{ margin: '16px 16px 0', paddingTop: '53px' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
