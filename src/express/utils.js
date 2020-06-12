'use strict';

exports.page = (req, res) => {
  res.send(req.baseUrl + req.route.path);
};
