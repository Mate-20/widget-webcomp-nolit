const path = require('path');

module.exports = {
  entry: './index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'eventgeni.js', // Output filename
  },
};
