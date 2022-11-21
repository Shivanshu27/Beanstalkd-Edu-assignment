const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const multer = require("multer");
const morgan = require("morgan");
app.use(morgan("dev"));
const path = require("path");
// app.use("/upload", express.static(path.join(__dirname, "/upload")));

const upload = multer({ dest: 'uploads/' })


app.get("/", (req, res) => {
  res.send("hello from backend");
});

console.log(__dirname);

app.post('/upload', upload.single('avatar'), function (req, res, next) {
  // console.log(req.file)
let data = fs.readFileSync(`${__dirname}/uploads/${req.file.filename}`, "utf8");

data = data.split(/\r?\n/);
let result=[]

for (let i = 0; i < data.length; i++) {
  let jsonObject = {};
  data[i] = data[i].split(" - ");
  jsonObject.timestamp = data[i][0];
  jsonObject.loglevel = data[i][1];
  // console.log(data[i][2])
  jsonObject.transactionId = JSON.parse(data[i][2]).transactionId;
  jsonObject.err = JSON.parse(data[i][2]).err || '';
  result.push(jsonObject)
}
// console.log(result);
fs.writeFile(`outputs/output.${req.file.filename}.json`, JSON.stringify(result), (err,data)=>{
  if (err) {res.send(err)}
  res.download(path.join(__dirname, `outputs/output.${req.file.filename}.json`))  
})

})




// let data = fs.readFileSync(`${__dirname}/userApi.txt`, "utf8");

// data = data.split(/\r?\n/);
// let result=[]

// for (let i = 0; i < data.length; i++) {
//   let jsonObject = {};
//   data[i] = data[i].split(" - ");
//   jsonObject.timestamp = data[i][0];
//   jsonObject.loglevel = data[i][1];
//   // console.log(data[i][2])
//   jsonObject.transactionId = JSON.parse(data[i][2]).transactionId;
//   jsonObject.err = JSON.parse(data[i][2]).err || '';
//   result.push(jsonObject)
// }
// console.log(result);

// app.get("/api", (req, res) => {
//   res.send(JSON.stringify(result));
// });

app.listen(8001, () => {
  console.log("connected to backend");
});


