"use strict";
const Restify = require("restify");
require('dotenv').config();

const ApiConvertirMoneda = require('./modulo/ApiCurrency');

const server = Restify.createServer({
  name: "MoneyBot"
});
const request = require("request");
const PORT = process.env.PORT || 3000;

server.use(Restify.plugins.bodyParser());
server.use(Restify.plugins.jsonp());


server.post("/", (req, res, next) => {


    let { queryResult } = req.body;

    if (queryResult) {
        const { salidaCurrency, cantidadConvertir } = queryResult.parameters;

        if (cantidadConvertir.currency === salidaCurrency) {
            const { amount } = cantidadConvertir;
      
            let responseText = `Bueno, ${amount} ${salidaCurrency} es obvio que es igual a ${amount} ${salidaCurrency}!`;
            let respObj = {
              fulfillmentText: responseText
            };
            res.json(respObj);
          }else{
              //utilizacion del api
              ApiConvertirMoneda(cantidadConvertir, salidaCurrency, (error, result) => {
                if (!error && result) {
                  let respObj = {
                    fulfillmentText: result
                  };
                  res.json(respObj);
                }
              });
          }
    }      

    return next();
});


server.listen(PORT, () => console.log(`MoneyBot running on ${PORT}`));