#!/usr/bin/env node
'use strict';
const meow = require('meow');
const 24 = require('./');

const cli = meow(`
Usage
  $ 2-4 [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ 2-4
  unicorns
  $ 2-4 rainbows
  unicorns & rainbows
`);
