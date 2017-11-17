const path = require('path');
const fs = require('fs');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: require.resolve('./main.less'),
  output: {
    filename: 'bundle.js',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('./less-loader'),
            options: {
              sourceMap: true,
              modifyVars: (loader) => {
                loader.addDependency(resolve('./theme.json'));
                return JSON.parse(fs.readFileSync(resolve('./theme.json')));
              }
            },
          },
        ],
      },
    ],
  },
  devServer: {
    inline: true,
  },
};
