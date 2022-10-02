const { error } = require('../helpers/requestResponses');

const isCurrentUser = async (req, res, next) => {
  const { id } = req.params;
  const { userId, roleId } = req;

  const newId = Number(id);

  if (userId !== newId && roleId !== 1) {
    return error({ res, message: 'forbidden: unauthorized user', status: 403 });
  }
  return next();
};

module.exports = { isCurrentUser };
