const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

//Validation Functions
const urlExists = (req, res, next) => {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  } else {
    next({
      status: 404,
      message: `Url id not found: ${urlId}`
    });
  }
}

const containsHref = (req, res, next) => {
  const { data: { href } = {} } = req.body;
  if (href) return next();
  else next({ status: 400, message: `A 'href' property is required.`});
}

//Method Functions
const list = (req, res, next) => {
  const urlId = Number(req.params.urlId);
  res.json({ data: urls.filter(urlId ? url => url.id === urlId : () => true)});
}

const read = (req, res, next) => {
  const newRecord = {
    id: uses.length + 1,
    urlId: res.locals.url.id,
    time: Date.now()
  }
  uses.push(newRecord);
  res.json({ data: res.locals.url });
}

const create = (req, res, next) => {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

const update = (req, res, next) => {
  const url = res.locals.url;
  const { data: { href } = {} } = req.body;
  url.href = href;
  res.json({ data: url });
}

const destroy = (req, res, next) => {
  next({
      status: 405,
      message: `DELETE Method not allowed on ${req.originalUrl}`
  });
}

module.exports = {
  create: [containsHref, create],
  list,
  read: [urlExists, read],
  update: [urlExists, containsHref, update],
  delete: destroy,
  urlExists
};