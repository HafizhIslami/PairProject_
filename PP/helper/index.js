const post = require("../models/post");

function dateToString(params) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'medium' }).format(params)
}

module.exports = dateToString