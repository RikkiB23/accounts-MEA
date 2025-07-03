import database from "../services/database.js";
import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import accountSchema from "../models/account.js";

async function getAllAccounts(req, res, next) {
  try {
    const params = {
      TableName: "Accounts",
    };
    const command = new ScanCommand(params);
    const result = await database.send(command);
    res.status(200).json(result.Items);
  } catch (err) {
    next(err);
  }
}

async function createAccount(req, res, next) {
  try {
    const uuid = uuidv4();
    req.body.id = uuid;
    const { error, value } = accountSchema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { id, account_holder, sort_code, account_number, balance = 0, pay = 0, receive = 0 } = value;

    const params = {
      TableName: "Accounts",
      Item: {
        id,
        account_holder,
        sort_code,
        account_number,
        balance,
        pay,
        receive
      },
    };

    const command = new PutCommand(params);

    await database.send(command);

    res
      .status(201)
      .json({ message: "Successfully created account", data: params.Item });
  } catch (error) {
    next(error);
  }
}

async function getAccountByID(req, res, next) {
  const accountId = req.params.id;
  try {
    const params = {
      TableName: "Accounts",
      Key: { id: accountId },
    };
    const command = new GetCommand(params);
    const result = await database.send(command);
    if (!result.Item) {
      return res.status(404).json({ message: "No account found" });
    }
    res.status(200).json(result.Item);
  } catch (err) {
    next(err);
  }
}

async function updateAccountByID(req, res, next) {
  try {
    const accountId = req.params.id;
    req.body.id = accountId;
    const { error, value } = accountSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { account_holder, balance = 0, sort_code, account_number, pay = 0, receive = 0 } = value;

    const getParams = {
      TableName: "Accounts",
      Key: { id: accountId },
    };

    const getCommand = new GetCommand(getParams);

    const result = await database.send(getCommand);

    const account = result.Item;

    const updatedBalance = (account.balance || 0) + (receive || 0) - (pay || 0);

    if (!account) {
      return res.status(404).json({ message: "No account found" });
    }

    // Update the account in DynamoDB
    const updateParams = {
      TableName: "Accounts",
      Key: { id: accountId },
      UpdateExpression:
        "set #balance = :balance, #account_holder = :account_holder , #sort_code = :sort_code, #account_number = :account_number, #pay = :pay, #receive = :receive",
      ExpressionAttributeNames: {
        "#balance": "balance",
        "#account_holder": "account_holder",
        "#sort_code": "sort_code",
        "#account_number": "account_number",
        "#pay": "pay",
        "#receive": "receive"
      },
      ExpressionAttributeValues: {
        ":balance": updatedBalance,
        ":account_holder": account_holder,
        ":sort_code": sort_code,
        ":account_number": account_number,
        ":pay": pay,
        ":receive": receive

      },
      ReturnValues: "ALL_NEW",
    };
    const updateCommand = new UpdateCommand(updateParams);
    const updatedAccount = await database.send(updateCommand);

    res.status(200).json(updatedAccount.Attributes);
  } catch (err) {
    next(err);
  }
}

async function deleteAccountByID(req, res, next) {
  const accountId = req.params.id;
  try {
    const params = {
      TableName: "Accounts",
      Key: { id: accountId },
    };
    const command = new DeleteCommand(params);
    await database.send(command);
    res.status(204).end();
  } catch (err) {
    console.error("Delete error: ", err);
    next(err);
  }
}

export default {
  getAllAccounts,
  createAccount,
  getAccountByID,
  updateAccountByID,
  deleteAccountByID,
};