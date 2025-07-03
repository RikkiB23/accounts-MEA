import express from "express";
import accountsController from "../controllers/accountsController.js";

const Router = express.Router();

Router.route("/accounts")
    .get(accountsController.getAllAccounts)
    .post(accountsController.createAccount);

Router.route("/accounts/:id")
    .get(accountsController.getAccountByID)
    .put(accountsController.updateAccountByID)
    .delete(accountsController.deleteAccountByID);

export default Router;