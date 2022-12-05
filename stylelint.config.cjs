'use strict';

module.exports = {
  "extends": ["stylelint-config-standard-scss", "stylelint-config-prettier"],
  "overrides": [{
    "files": ['**/*.scss'],
    "customSyntax": "postcss-scss"
  }],
};
