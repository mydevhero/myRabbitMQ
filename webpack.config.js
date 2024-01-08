const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: "production",
  target: 'node',
  entry: './src/myRabbitMQ.ts', // Il punto di ingresso del tuo modulo
  output: {
    filename: './dist/myRabbitMQ.js', // Il nome del file di output
//    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
