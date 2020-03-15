import React from 'react';
import { message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import * as umi from 'umi';
import styles from './index.css';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    localStorage.clear();
  }
  state = {
    inputWord: '',
  };

  handleChangeWord = e => {
    this.setState({
      inputWord: e.target.value,
    });
  };

  handleLogin = () => {
    const { inputWord } = this.state;

    // 输入值有效
    if (inputWord && inputWord.trim()) {
      localStorage.setItem('username', inputWord);
      umi.router.push('/allArticleList');
    } else {
      message.warning('请输入名字');
    }
  };

  handleKeyup = e => {
    // 回车
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    const { inputWord } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.loginInputContainer}>
          <input
            className={styles.inputContent}
            type="text"
            placeholder="请输入姓名"
            value={inputWord}
            onChange={this.handleChangeWord}
            onKeyUp={this.handleKeyup}
          />
          {inputWord ? (
            <ArrowRightOutlined onClick={this.handleLogin} className={styles.arrowIcon} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Login;
