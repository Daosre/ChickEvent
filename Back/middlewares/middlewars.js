const validator = require("validator");
//Vérification que c'est bien un ID 
const middleId = (req, res, next) => {
  const id = req.params.id;
  if (!validator.isMongoId(id + "")) {
    return res.status(400).json({ msg: "please send a mongoId" });
  }
  req.id = id;
  next();
};

//Vérification que c'est bien un email
const middleEmail = (req, res, next) => {
  const email = req.body.email;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "please send a email" });
  }
  req.isEmail = email;
  next();
};
//Vérification que c'est bien une URL
const middleURL = (req, res, next) => {
  const link = req.body.image;
  if (!validator.isURL(link)) {
    return res.status(400).json({ msg: "Please send an url" });
  }
  req.isURL = link;
  next();
};

module.exports = { middleId, middleEmail, middleURL };
