const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");

userRouter.use(verifyJWT);

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = {
  userRouter,
};
