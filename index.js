var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var app = express();
const path = require('path')

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req, file, cb) =>{
    console.log(file)
    cb(null,Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });



app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/fileanalyse', function(req, res) {
  res.render('upload');
});


app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (req.file) {
    res.json({
      name: req.file.originalname, 
      type: req.file.mimetype, 
      size: req.file.size });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
