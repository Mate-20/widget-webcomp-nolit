const path = require('path');

module.exports = {
  entry: './index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'eventgeni.js', // Output filename
  },
  module: {
    rules: [
      {
        test: /\.json$/, // Match JSON files
        loader: 'json-loader', // Use json-loader to handle JSON files
        type: 'javascript/auto', // Specify the type as 'javascript/auto' to avoid webpack 5 deprecation warnings
      },
    ],
  },
};
