// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/allArticleList', component: '../pages/allArticleList/index' },
        { path: '/recommendArticleList', component: '../pages/recommendArticleList/index' },
        { path: '/login', component: '../pages/login/index' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: { webpackChunkName: true, loadingComponent: '@/components/Loading/index' },
        title: 'frontend',
        dll: true,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
