const request =  require("request");

const APY_KEY = process.env.API_KEY_CURRENCY || '';

const ConvertCurrency = (cantidadConvertir,SalidaCurrency, cb) => {

    const {
        amount,
        currency
    } = cantidadConvertir;

    return request(
        {
          url: "https://free.currencyconverterapi.com/api/v6/convert",
          qs: {
            q: `${currency}_${SalidaCurrency}`,
            compact: "y",
            apiKey: APY_KEY
          },
          method: "GET",
          json: true
        },
        (error, response, body) => {
            
          if (!error && response.statusCode === 200) {
            let computedValue = Math.round(
                parseFloat(body[`${currency}_${SalidaCurrency}`]['val']) * parseFloat(amount)
            );
            cb(
              null,
              `${amount} ${currency} se convierte en aproximadamente ${SalidaCurrency} ${computedValue} según las tarifas actuales!!`
            );
          } else {
            cb(error, null);
          }
        }
      );

}





module.exports = ConvertCurrency;
