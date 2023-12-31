const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const { config } = require("../core/config")

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
})

const uploadManager = (destination) => {
  return multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: `PrinceVisual/${destination}`,
      },
    }),
  })
}

const uploadFileManager = (destination) => {
  return multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: `PrinceVisual/manage/${destination}`,
      },
    }),
  })
}

const videoManager = (destination) => {
  return multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: `PrinceVisual/manage/${destination}`,
        format: "mp4",
        resource_type: "video",
      },
    }),
    fileFilter,
  })
}

const audioManager = (destination) => {
  return multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: `PrinceVisual/manage/${destination}`,
        resource_type: "auto",
      },
    }),
    fileFilter,
  })
}

function fileFilter(req, file, cb) {
  if (req.get("Authorization") !== undefined) {
    cb(null, true)
  } else {
    cb(null, true)
  }
}

module.exports = {
  uploadManager,
  uploadFileManager,
  videoManager,
  audioManager,
}
