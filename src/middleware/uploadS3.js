// middlewares/uploadS3.js
const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client,PutObjectCommand } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid');
const eventModel = require('../models/eventModel');

// Configure AWS SDK
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

// Set up Multer-S3
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
        cb(null, uuidv4())
    },
  }),
}).single('file')

const handleUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, uuidv4());
    }
  }),
}).array('files',12);

const uploadPartner = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, uuidv4());
    }
  }),
}).array('files',12);


// function checkFileType(file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype)

//   if (mimetype && extname) {
//       return cb(null, true)
//   } else {
//       cb(new Error('Error: Images Only!'), false)
//   }
// }


module.exports = {uploadS3, handleUpload,uploadPartner}