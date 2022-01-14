const uses = require("../data/uses-data");

const useExists = (req, res, next) => {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  } else {
    next({
      status: 404,
      message: `Use id not found: ${useId}`
    })
  }
}

const list = (req, res, next) => {
  const { useId } = req.params;
  res.json({ data: uses.filter(useId ? use => use.id == useId : () => true)})
}

const read = (req, res, next) => {
  res.json({ data: res.locals.use })
}

const destroy = (req, res, next) => {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy]
}