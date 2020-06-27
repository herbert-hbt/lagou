#!/usr/bin/env node
'use strict';
const meow = require('meow');
const  = require('./');

const cli = meow(`
Usage
  $  [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ 
  unicorns
  $  rainbows
  unicorns & rainbows
`);
