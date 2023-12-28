const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser)
    return res
      .status(401)
      .json({ message: "Unauthorized: Username not found" });

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    res.json({ message: `User : ${user} is logged in!` });
  } else {
    res.status(401).json({ message: "Unauthorized: Password is incorrect" });
  }
};

module.exports = { handleLogin };
