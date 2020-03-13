import React from 'react'
import { Layout, Menu } from 'antd';
import { FileSearchOutlined, FilterOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styles from './index.css'
import { Link } from 'umi';

const { Content, Sider } = Layout;

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectMenuKey: '', // 选择的菜单
    }
  }

  componentDidMount() {
    const selectMenuKey = this.props.location.pathname.slice(1)
    this.setState({selectMenuKey})
  }

  handleSelectMenuItem = ({ key }) => {
    this.setState({
      selectMenuKey: key
    })
  }

  render() {
    const { selectMenuKey } = this.state;
    return (
      <Layout className={styles.layoutContent}>
      <Sider
        breakpoint="lg"
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
        <Menu  mode="inline" selectedKeys={[selectMenuKey]} onSelect={this.handleSelectMenuItem}>
          <Menu.Item key="allArticleList">
          <FileSearchOutlined />
            <Link to="allArticleList"><span className="nav-text">文章资源</span></Link>
          </Menu.Item>
          <Menu.Item key="recommendArticleList">
          <FilterOutlined />
          <Link to="recommendArticleList"><span className="nav-text">推荐文章</span></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
            {this.props.children}
        </Content>
      </Layout>
    </Layout>
    );

  }
}

export default BasicLayout;
