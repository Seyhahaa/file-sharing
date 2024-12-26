const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { responseHandler } = require("express-intercept");
const client = require("../redis");
const multer = require("multer");
const path = require("path");

const handleError = (err, req, res, next) => {
  return res.status(400).json(err.message);
};

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
const verifyJWT = expressAsyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const extract = token.split(" ")[1];
  const decoded = jwt.verify(extract, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id);
  //console.log(user)
  req.user = user;
  next();
});
const cacheInterceptor = (ttl) =>
  responseHandler()
    .for((req) => {
      return req.method == "GET";
    })
    .if((res) => {
      const codes = [200, 201, 202, 203, 204];
      return codes.includes(res.statusCode);
    })
    .getString(async (body, req, res) => {
      const { originalUrl } = res.req;
      client.set(originalUrl, body, {
        EX: ttl,
      });
    });

    const invalidateInterceptor = responseHandler()
    .for((req) => {
      const methods = ['POST', 'PUT', 'PATCH', 'DELETE'];
      return methods.includes(req.method);
    })
    .if((res) => {
      const codes = [200, 201, 202, 203, 204];
      return codes.includes(res.statusCode);
    })
    .getString(async (body, req, res) => {
      const { baseUrl } = req;
      console.log(baseUrl);
      const keys = await client.keys(`${baseUrl}*`);
      console.log(keys)
      for (let i = 0; i < keys.length; i++) {
        client.del(keys[i]);
      }
    });

const cacheMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { originalUrl } = req;
  if (req.method == "GET") {
    const data = await client.get(originalUrl);
    if (data !== null) {
      return res.json(JSON.parse(data));
    }
  }
  next();
});

//file Upload
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const singleUpload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
      return cb(null, true)
  } else {
      cb(new Error('Error: Images Only!'), false)
  }
}

module.exports = {
  handleError,
  verifyJWT,
  handleValidation,
  cacheMiddleware,
  invalidateInterceptor,
  cacheInterceptor,
  singleUpload,
};
