const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");

const app = express();
__dirname = path.resolve();

let API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "localhost";
let API_BASE_PORT = process.env.REACT_APP_API_PORT || "8080";

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(bodyParser.json());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client"));
});

app.get("/api/products", (req, res) => {
  request.get(
    "http://" + API_BASE_URL + ":" + API_BASE_PORT + "/api/products",
    (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        var data = JSON.parse(body);
        res.send(data);
      }
    }
  );
});

app.get("/api/products/:id", function (req, res) {
  request.get(
    "http://" +
      API_BASE_URL +
      ":" +
      API_BASE_PORT +
      "/api/products/" +
      req.params.id,
    (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        var data = JSON.parse(body);
        console.log(data);
        res.send(data);
      }
    }
  );
});

app.post("/basket/add/:productId/:basketId", function (req, res) {
  request.post(
    "http://" +
      API_BASE_URL +
      ":" +
      API_BASE_PORT +
      "/api/basket/add/" +
      req.params.productId +
      "/" +
      req.params.basketId,
    (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        var data = JSON.parse(body);
        res.send(data);
      }
    }
  );
});

app.get("/basket/baskets/:id", function (req, res) {
  request.get(
    "http://" +
      API_BASE_URL +
      ":" +
      API_BASE_PORT +
      "/api/basket/baskets/" +
      req.params.id,
    (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        var data = JSON.parse(body);
        res.send(data);
      }
    }
  );
});

app.post("/auth/login", function (req, res, next) {
  axios
    .post(
      "http://" + API_BASE_URL + ":" + API_BASE_PORT + "/api/auth/signin",
      req.body
    )
    .then(
      (response) => {
        console.log(response.data);
        res.send(response.data);
      },
      (error) => {
        console.log(error.response.data);
        res.status(401).send(error.response.data);
      }
    );
});

app.post("/auth/signup", function (req, res) {
  axios
    .post(
      "http://" + API_BASE_URL + ":" + API_BASE_PORT + "/api/auth/signup",
      req.body
    )
    .then(
      (response) => {
        console.log(response.data);
        res.status(201).send(response.data);
      },
      (error) => {
        console.log(error.response.data);
        res.status(400).send(error.response.data);
      }
    );
});

app.get("/user/me", function (req, res) {
  const authHeader = req.headers.authorization
    ? req.headers.authorization
    : null;

  axios
    .get("http://" + API_BASE_URL + ":" + API_BASE_PORT + "/api/user/me", {
      headers: { Authorization: "Bearer " + authHeader },
    })
    .then(
      (response) => {
        console.log(response.data);
        res.status(200).send(response.data);
      },
      (error) => {
        console.log(error.response.data.message);
        res.status(401).send(error.response.data.message);
      }
    );
});

app.get("/basket/baskets/:id", function (req, res) {
  console.log("in basket");
  axios
    .get(
      "http://" +
        API_BASE_URL +
        ":" +
        API_BASE_PORT +
        "/api/basket/baskets/" +
        req.params.id
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(5000, () => console.log(`Server is listening on 5000`));
