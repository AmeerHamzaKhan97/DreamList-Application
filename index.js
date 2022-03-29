const express = require("express");
const userModel = require("./models/UserModel");
const dreamModel = require("./models/DreamModel");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());

//signup
app.post("/api/v1/signUp", async (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ msg: "Fill Both the Input", response: "error" });
    }

    // Check the length of the Password is at least 5 charcters
    if (password.length < 5) {
      return res.status(400).json({
        msg: "The Password need to be least 5 character long",
        response: "error",
      });
    }

    // checking duplicate emails
    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        msg: "An Account with this Email already exists",
        response: "error",
      });
    }

    // using bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create out new user
    const newUserModel = new userModel({
      name: name,
      email: email,

      password: passwordHash,
    });
    const savedUserModel = await newUserModel.save();
    res.status(200).json({ msg: "Resigter SuccessFull", response: "success" });

    //catch error
  } catch (error) {
    res.status(500).json({ error: error.message, response: "error" });
  }
});

//login
app.post("/api/v1/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //vlaidate
    if (!email || !password) {
      return res.json({
        msg: "Not all field have been entered",
        status: "400",
        response: "error",
      });
    }

    //check email
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        msg: "Invalid credentials",
        status: "400",
        response: "error",
      });
    }

    //check password and compare with hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        msg: "Invalid credentials",
        status: "400",
        response: "error",
      });
    }

    let accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 86400 }
    );
    console.log("tokenzzz", accessToken);
    return res.json({
      acessToken: accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      msg: "Success",
      status: "200",
      response: "success",
    });
  } catch (error) {
    res.json({ error: error.message, status: "500", response: "error" });
  }
});

app.post("/api/v1/addDream", async (req, res) => {
  // console.log("hit");
  // console.log(req.body);
  const { type, dream, date } = req.body;
  try {
    if (!type && !dream && !date) {
      res.json({ msg: "Fill all the fields please" });
      return;
    }

    const newDreamList = await new dreamModel({
      dream_type: type,
      dream: dream,
      date_to_complete: date,
    });
    await newDreamList.save();
    res.status(200).json({ msg: "new Dream Addded" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/api/v1/dreamlist", async (req, res) => {
  try {
    const list = await dreamModel.find();
    res.send(list);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`);
});
