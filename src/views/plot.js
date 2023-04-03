const { SerialPort } = require("serialport");

const port = new SerialPort({
  path: "COM4",
  baudRate: 115200,
});

const { ReadlineParser } = require("@serialport/parser-readline");
const parser = port.pipe(new ReadlineParser({ delimiter: "\n\r" }));
let receiveSerial = "";

window.addEventListener("beforeunload", () => {
  port.close((err) => {
    if (err) return console.log("Error al cerrar el puerto: ", err.message);
  });
});

let dataReceive = [];
let receiveSerialRPM = "";
let receiveSerialTIME = "";
let json;

window.addEventListener("load", () => {
  port.open(() => {
    parser.on("data", (data) => {
      receiveSerial = data;
      console.log(receiveSerial);

      if (receiveSerial) {
        const cut = receiveSerial.indexOf("|");
        receiveSerialTIME = receiveSerial
          .slice(cut + 1)
          .split(":")[1]
          .trim();
        receiveSerialRPM = receiveSerial.split("|")[0].split(":")[1].trim();

        dataReceive.push({
          time: parseInt(receiveSerialTIME),
          rpm: receiveSerialRPM,
        });

        console.log(dataReceive);
      }
    });
  });
});

// const dataJson = require("../../data.json");
// let i = 1;
// const dataFilter = dataJson.filter((data, _, array) => {
//   if (i === 1) return true;
//   if (i < array.length) {
//     i++;
//     return parseInt(data.rpm) - parseInt(array[i - 1].rpm) < 30;
//   }
// });
// console.log(dataJson);
// console.log(dataFilter);
