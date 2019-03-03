/* eslint-env node */
/* eslint object-shorthand: off */
'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');


plugins.push(
    new BabiliPlugin({
      regexpConstructors: false
    })
  );

