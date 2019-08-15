const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const db = req.app.get("db");
      const { email, password } = req.body;
      console.log("32332", req.body);

      const user = await db.find_email([email]);
      if (user.length > 0) {
        return res.status(400).send({ message: "Email in use." });
      } // came through as an array of objects [{}]
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await db.insert_user_info({ email, hash });
      req.session.user = newUser[0];
      console.log(req.session)
      delete newUser[0].hash;
      res.status(200).send({
        message: "Logged in",
        user: req.session.user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).send({ message: "Failed to register" });
    }
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    console.log('Req.body',req.body);
    const user = await db.find_user_info([email]);
    if (user.length === 0) {
      return res.status(400).send({ message: "Email not found" });
    }
    console.log('User',user)
    const result = bcrypt.compareSync(password, user[0].hash);
    if (result) {
        delete user[0].hash;
      req.session.user = user[0];
      return res
        .status(200)
        .send({ message: "Logged in", user: req.session.user, loggedIn: true });
    }    
  },
  getSession: (req,res) => {
    res.status(200).send(req.session.user)
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out" });
  }
};
