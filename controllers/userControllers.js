const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/admin");
const Token = require("../models/Token");
const nodemailer = require("nodemailer");
const Gold = require("../models/gold");
const Plat = require("../models/plat")
const Silver = require("../models/silver")
const Razorpay = require("razorpay");
const instance = require("../razorpay");
const Member = require("../models/members");

// const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const pdf = require("express-pdf");
const path = require("path");
// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: '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',
//     },
//   })
// );

const transporter = nodemailer.createTransport({
  name: "Gmail",
  service: "gmail",
  auth: {
    user: "onetouchmatrimony@gmail.com",
    pass: "vbpwydzqohvaharj",
  },
});
const saveuserid = (req, res) => {
  console.log("the id is########################################", req.user);
  User.findByIdAndUpdate(req.user, {
    userid: req.params.userid,
    useridadded: true,
  })
    .then((e) => res.status(200).json({ msg: "user successfully updated" }))
    .catch((e) => res.status(400).json({ msg: "cant update" }));
};

const getUserByUID = async (req, res) => {
  try {
    // const user = await User.findOne({shortId : req.params.userid});
    console.log("from uid");
    const user = await User.findById(req.params.userid);
    if (!user) {
      return res.json(false);
    }
    res.json(user);
  } catch (err) {
    return res.json(false);
  }
};

const nameavailable = async (req, res) => {
  const existingUser = await User.findOne({ userid: req.params.userid });
  if (existingUser) {
    res.status(404).json({ msg: "already a username" });
  } else
    res.status(200).json({ msg: "you can take this name as your username" });
};

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    // req.body.image = req.body.profileImg;
    console.log(req.body);
    req.body["useridadded"] = false;
    req.body["userid"] = "";

    //Check if user exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(405)
        .json({ msg: "An account with this email already exists." });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    req.body.password = passwordHash;

    //Create new user
    const newUser = new User(req.body);
    const user = await newUser.save();
    if (user) {
      const token = await Token.create({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      const url = `https://onetouchmatrimony.com/confirmation/${user.email}/${token.token}`;
      let mailOptions = {
        from: "onetouchmatrimony@gmail.com",
        to: user.email,
        subject: "Account Verification Link",
        html: `
        <style>
          @media screen and (max-width:1700px) {
            html{
              font-size: 100%;
            }
          }
          @media screen and (max-width:1100px) {
            html{
              font-size: 65%;
            }
          }
          @media screen and (max-width:900px) {
            html{
              font-size: 57.5%;
            }
          }
          @media screen and (max-width:600px) {
            html{
              font-size: 50%;
            }
          }
      </style>
    
      <div class="container" style="display: flex;justify-content: center;align-items: center; width: 100%; background:white;">
        <div style=" width:80%; margin-top: 5vw; min-height: 20vh;background:linear-gradient(50deg, #f5eff1,#f3f2f5, #edeff2);box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px; border-radius: 20px;">
          <div style="width: 90%;padding: 3vw 1.5vw; display: block; font-size: 0.5rem;">
            <h1 style="color: rgb(70, 68, 68); margin: 2% 5%; font-size: 0.5rem; "> Hello ${req.body.fullname},</h1>
            <h1 style="color: rgb(70, 68, 68); margin: 2% 5%; font-size: 0.5rem; "> Please click on the following button to verify your account:</h1>
            <a style="margin: 1% 5%; background: rgb(56, 245, 56);padding:5px 20px;border-radius: 10px; font-size: 0.5rem; text-decoration: none; color: #fff;" href=${url}>Click Here</a>
            <h1 style="color: rgb(70, 68, 68); margin: 2% 5%; font-size: 0.5rem;"> Thank You. </h1>
          </div>
        </div>
      </div>`,
      };

      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send({
            msg: "Technical Issue!, Please click on resend for verify your Email.",
          });
        }
        console.log("mail sent");
        return res
          .status(200)
          .send(
            "A verification email has been sent to " +
              user.email +
              ". It will be expire after one day."
          );
      });
    } else {
      res.status(400).json({ msg: "Try again" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editUserDetails = async (req, res) => {
  try {
    let { fullname, email, password, newEmail } = req.body;
    //User ID
    const id = req.user;
    //New email
    if (newEmail) {
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });
      }
    }
    //encrypt password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      req.body.password = passwordHash;
    }
    if (newEmail) {
      req.body.email = newEmail;
    }
    await User.findByIdAndUpdate(id, req.body);
    const updatedUser = await User.findById(id);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }
    //find user in database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }
    if (!user.isVerified) {
      return res.status(401).send({
        msg: "Your Email has not been verified. Please click on resend",
      });
    }
    //JSON webtoken
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    console.log("error here");
    res.status(500).json({ msg: err.message });
  }
};

const isTokenValid = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.json(false);
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(500).json({ error: err.message });
  }
  res.json(user);
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.params.userid });
    if (!user) {
      return res.json(false);
    }

    res.json(user);
  } catch (err) {
    return res.json(false);
  }
};

const confirmEmail = function (req, res, next) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired
    if (!token) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    }
    // if token is found then check valid user
    else {
      User.findOne(
        { _id: token._userId, email: req.params.email },
        function (err, user) {
          // not valid user
          if (!user) {
            return res.status(401).send({
              msg: "We were unable to find a user for this verification. Please SignUp!",
            });
          }
          // user is already verified
          else if (user.isVerified) {
            return res
              .status(200)
              .send("User has been already verified. Please Login");
          }
          // verify user
          else {
            // change isVerified to true
            user.isVerified = true;
            user.save(function (err) {
              // error occur
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // account successfully verified
              else {
                return res
                  .status(200)
                  .send("Your account has been successfully verified");
              }
            });
          }
        }
      );
    }
  });
};

const resetPasswordMail = async (req, res) => {
  try {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
      User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          return res
            .status(422)
            .json({ error: "User doesn't exists with this email" });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "onetouchmatrimony@gmail.com",
            subject: "password reset",
            html: `
                <style>
                  @media screen and (max-width:1700px) {
                    html{
                      font-size: 75%;
                    }
                  }
                  @media screen and (max-width:1100px) {
                    html{
                      font-size: 65%;
                    }
                  }
                  @media screen and (max-width:900px) {
                    html{
                      font-size: 57.5%;
                    }
                  }
                  @media screen and (max-width:600px) {
                    html{
                      font-size: 50%;
                    }
                  }
                </style>
              
                <div class="container" style="display: flex;justify-content: center;align-items: center; width: 100%; background:white;">
                  <div style=" width:80%; margin-top: 5vw; min-height: 20vh;background:linear-gradient(50deg, #f5eff1,#f3f2f5, #edeff2);box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px; border-radius: 20px;">
                    <div style="width: 90%;padding: 3vw 1.5vw; display: block; font-size: 0.5rem;">
                      <h1 style="color: rgb(70, 68, 68); margin: 2% 5%; font-size: 0.5rem; "> Hello, You had requested for password reset,</h1>
                      <h1 style="color: rgb(70, 68, 68); margin: 2% 5%; font-size: 0.5rem; "> Please click on the following button to reset your password</h1>
                      <a style="margin: 1% 5%; background: rgb(56, 245, 56);padding:5px 20px;border-radius: 10px; font-size: 0.5rem; text-decoration: none; color: #fff;" href="https://onetouchmatrimony.com/changePassword/${token}">Click Here</a>
                      <h1 style="color: rgb(70, 68, 68); margin: 2% 5%; font-size: 0.5rem;"> Thank You. </h1>
                    </div>
                  </div>
                </div>`,
          });
          res.json({ message: "Check your email" });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const sentToken = req.params.token;
    await User.findOne({
      resetToken: sentToken,
      expireToken: { $gt: Date.now() },
    })
      .then((user) => {
        if (!user) {
          return res.status(422).json({ error: "Try again session expired" });
        }
        bcrypt.hash(newPassword, 12).then((hashedpassword) => {
          user.password = hashedpassword;
          user.resetToken = undefined;
          user.expireToken = undefined;
          user.save().then((saveduser) => {
            res.json({ message: "password updated success" });
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const savedProfiles = async (req, res) => {
  User.findById(req.user)
    .then((e) => {
      User.find(
        {
          userid: { $in: e.savedProfiles },
        },
        function (err, docs) {
          console.log(docs);
          res.status(202).json(docs);
        }
      );
    })
    .catch((e) => res.status(404).json({ err: e }));

  // try {
  //   const user = await User.findById(req.user);
  //   if (!user) {
  //     return res.status(400).json({ error: "User not found" });
  //   }
  //   await user.populate("savedProfiles").execPopulate();
  //   res.json(user.savedProfiles);
  // } catch (err) {
  //   res.status(500).json({ msg: err.message });
  // }
};

const saveProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ error: err.message });
    }
    if (req.body.profileId === undefined) {
      return res.status(400).json({ error: "Enter profile id to save" });
    }

    if (user.savedProfiles.includes(req.body.profileId)) {
      const index = user.savedProfiles.indexOf(req.body.profileId);
      if (index > -1) {
        user.savedProfiles.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      user.savedProfiles.push(req.body.profileId);
    }

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const blockedProfiles = async (req, res) => {
  User.findById(req.user)
    .then((e) => {
      User.find(
        {
          userid: { $in: e.blockedProfiles },
        },
        function (err, docs) {
          console.log(docs);
          res.status(202).json(docs);
        }
      );
    })
    .catch((e) => res.status(404).json({ err: e }));

  // try {
  //   const user = await User.findById(req.user);
  //   if (!user) {
  //     return res.status(400).json({ error: "User not found" });
  //   }

  //   await user.populate("blockedProfiles").execPopulate();
  //   res.json(user.blockedProfiles);
  // } catch (err) {
  //   res.status(500).json({ msg: err.message });
  // }
};

const blockProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ error: err.message });
    }
    if (req.body.profileId === undefined) {
      return res.status(400).json({ error: "Enter profile id to block" });
    }

    if (user.blockedProfiles.includes(req.body.profileId)) {
      const index = user.blockedProfiles.indexOf(req.body.profileId);
      if (index > -1) {
        user.blockedProfiles.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      user.blockedProfiles.push(req.body.profileId);
    }
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//Function to convert DOB into integer Age to sort users for Age prefrences
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const getAllUsers = async (req, res) => {
  User.findById(req.user)
    .then((e) => {
      const oppGender = e.gender == "Female" ? "Male" : "Female";
      const APlower = e.prefAge.slice(0, 2);
      const APupper = e.prefAge.slice(3);
      console.log(APupper);
      User.find({ gender: oppGender }).then((e) => {
        console.log(getAge(e[0].dob));
        const data = e.filter((user) => {
          return (
            getAge(user.dob) < parseInt(APupper) &&
            getAge(user.dob) > parseInt(APlower)
          );
        });
        console.log(data);
        res.status(202).json(data);
      });
    })
    .catch((e) => res.status(404).json({ err: e }));

  // try {
  //   const user = await User.findById(req.user);
  //   let users;
  //   const gender = user.gender;
  //   console.log(gender);
  //   if (gender === "female") {
  //     users = await User.find({ gender: "male" });
  //   } else {
  //     users = await User.find({ gender: "female" });
  //   }
  //   console.log(gender, users);
  //   res.status(200).json(users);
  // } catch (err) {
  //   res.status(500).json({ msg: err.message });
  // }
};

const storeRecentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ error: err.message });
    }
    if (req.body.profileId === undefined) {
      return res.status(400).json({ error: "Enter profile id to save" });
    }
    if (user.recentlyViewedProfiles.includes(req.body.profileId)) {
      const index = user.recentlyViewedProfiles.indexOf(req.body.profileId);
      if (index > -1) {
        user.recentlyViewedProfiles.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    if (user.recentlyViewedProfiles.length >= 4) {
      user.recentlyViewedProfiles.shift();
    }
    user.recentlyViewedProfiles.unshift(req.body.profileId);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getRecentProfiles = async (req, res) => {
  User.findById(req.user)
    .then((e) => {
      User.find(
        {
          userid: { $in: e.recentlyViewedProfiles },
        },
        function (err, docs) {
          console.log(docs);
          res.status(202).json(docs);
        }
      );
    })
    .catch((e) => res.status(404).json({ err: e }));

  // try {
  //   const user = await User.findById(req.user);
  //   if (!user) {
  //     return res.status(400).json({ error: err.message });
  //   }
  //   await user.populate("recentlyViewedProfiles").execPopulate();
  //   res.json(user.recentlyViewedProfiles);
  // } catch (err) {
  //   res.status(500).json({ msg: err.message });
  // }
};

const whoViewedMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ error: err.message });
    }

    if (req.body.profileId === undefined) {
      return res
        .status(400)
        .json({ error: "Enter profile id of the viewed profile" });
    }

    console.log(req.body.profileId);
    const viewedUser = await User.findOne({ userid: req.body.profileId });
    console.log(viewedUser);

    if (viewedUser.userid === req.body.profileId) {
      return res
        .status(200)
        .json({ message: "You are seeing your own profile" });
    }

    if (viewedUser.whoViewedMyProfile.includes(user._id)) {
      const index = viewedUser.whoViewedMyProfile.indexOf(user._id);
      if (index > -1) {
        viewedUser.whoViewedMyProfile.splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    viewedUser.whoViewedMyProfile.unshift(user._id);

    if (viewedUser.unsubscribed === false) {
      const savedUser = await viewedUser.save().then((result) => {
        transporter.sendMail({
          to: viewedUser.email,
          from: "onetouchmatrimony@gmail.com",
          subject: "Someone Viewed your profile",
          html: `
        <style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
</style>
</head>
<body>

<img src="https://onetouchmatrimony.com/static/media/one%20touch%20matrimonial.6b5f1341ea60bf403018.png" style="width:20%">
<p>Hello ${viewedUser.fullname}, someone saw your profile recently :</p>
<div class="card">
  <img src=${user.image} alt="Avatar" style="width:200px">
  <div class="container">
    <h4><b>${user.fullname}</b></h4> 
    <p>${user.location}</p> 
    <p>${user.dob}</p> 
  </div>
<p style="font-size:18px;">To know more click <a href="https://onetouchmatrimony.com">here</a></p>
<p style="font-size:10px">To unsubscribe click <a href="https://localhost:3000/unsubscribe">here</a></p>
</div>`,
        });
      });
      console.log("Mail sent");
      res.json(savedUser);
    } else {
      const savedUser = await viewedUser.save();
      return res
        .status(200)
        .json({ message: "The person cannot receive mails." });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getWhoViewedMyProfile = async (req, res) => {
  console.log("User");
  const user = req.user;
  User.findById(user)
    .then((e) => {
      User.find(
        {
          _id: { $in: e.whoViewedMyProfile },
        },
        function (err, docs) {
          console.log(docs);
          res.status(202).json(docs);
        }
      );
    })
    .catch((e) => res.status(404).json({ err: e }));

  // try {
  //   const user = await User.findById(req.user);
  //   if (!user) {
  //     return res.status(400).json({ error: "User not found" });
  //   }
  //   await user.populate("whoViewedMyProfile").execPopulate();
  //   res.json(user.whoViewedMyProfile);
  // } catch (err) {
  //   res.status(500).json({ msg: err.message });
  // }
};
const getpreferenceByGenderAndAge = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ error: err.message });
    }
    console.log(user);
    if (user.gender === "male") {
      const users = await User.find({ gender: "Female" });
      return res.json(users);
    }
    if (user.gender === "Female") {
      const users = await User.find({ gender: "Male" });
      return res.json(users);
    }
    res.json({ data: null });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const unSubscribe = async (req, res) => {
  try {
    const user = req.user;
    const status = req.body.status;

    if (status === "yes") {
      const unsubscribinguser = await User.findByIdAndUpdate(user, {
        $set: { unsubscribed: true },
      });
      unsubscribinguser.save();
      res.json({ message: "You are unsubscribed" });
    } else {
      res.status(500).json({ message: "Error occured." });
    }
    const savedUser = await unsubscribinguser.save();
    res.status(200).json({ message: "You are now unsubscribed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// const getpreferenceByGenderAndAge = async (req, res) => {
//   res.send("Hello")
// }

const basicSearch = async (req, res) => {
  console.log(req.query);
  try {
    const user = await User.find(req.query);
    if (!user) {
      return res.status(400).json({ error: err.message });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const advancedSearch = async (req, res) => {
  try {
    let query;
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    console.log(queryStr);
    query = User.find(JSON.parse(queryStr));
    const users = await query;
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const match = async (req, res) => {
  try {
    const signedUser = await User.findById(req.user);
    const userid = req.params.userid;
    const user = await User.findOne({ userid: userid });

    let count = 0;
    if (signedUser.country === user.country) count++;
    if (signedUser.income === user.income) count++;
    if (signedUser.marital === user.marital) count++;
    if (signedUser.profession === user.profession) count++;
    if (signedUser.lang === user.lang) count++;
    if (signedUser.prefOccupation === user.profession) count++;
    if (signedUser.city === user.city) count++;
    console.log(signedUser);
    console.log(user);

    res.json({ percentMatch: `${(count / 7) * 100}%` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    // req.body.image = req.body.profileImg;
    console.log(req.body);
    //Check if user exists
    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res
        .status(405)
        .json({ msg: "An account with this email already exists." });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    req.body.password = passwordHash;

    //Create new user
    const newUser = new Admin(req.body);
    const user = await newUser.save();
    if (!user) {
      return res.status(500).send({
        msg: "Failed to register.",
      });
    }
    res.status(201).send("Admin registered successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }
    //find user in database
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }
    //JSON webtoken
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: admin._id,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addClick = async (req, res) => {
  try {
    const adminData = await Admin.findOne({}, { totalclicks: 1 });
    const totalclicks = adminData.totalclicks + 1;
    const updateData = await Admin.updateOne({ totalclicks: totalclicks });
    res.status(200).json({ msg: "Clicked" });
  } catch (error) {
    res.status(500).json({ msg: err.response.message });
  }
};

const checkAdmin = async (req, res) => {
  try {
    const id = req.user;
    const adminData = await Admin.findById(id);
    if (!adminData) {
      return res.status(401).json({ msg: "Admin unauthenticated" });
    }
    res.status(200).json(adminData);
  } catch (error) {
    res.status(500).json({ msg: err.response.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const adminid = req.user;
    const adminData = await Admin.findById(adminid);
    if (!adminData) {
      return res.status(401).json({ msg: "Admin unauthenticated" });
    }
    const id = req.params.userid;
    const user = await User.findByIdAndDelete(id);
    // console.log(id)
    res.status(200).json({ data: user, msg: "successfully deleted user" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateLastViewed = async (req, res) => {
  try {
    const adminid = req.user;
    const adminData = await Admin.findById(adminid);
    if (!adminData) {
      return res.status(401).json({ msg: "Admin unauthenticated" });
    }
    const lastViewed = req.body.lastViewed;
    const updateLastViewed = await Admin.findByIdAndUpdate(adminid, {
      lastViewed,
    });
    res.status(200).json({ msg: "updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const recentSignupUsers = async (req, res) => {
  try {
    const adminid = req.user;
    const adminData = await Admin.findById(adminid);
    if (!adminData) {
      return res.status(401).json({ msg: "Admin unauthenticated" });
    }
    const lastViewed = adminData.lastViewed;

    const users = await User.find({
      createdAt: {
        $gte: lastViewed,
        $lt: Date.now(),
      },
    });
    console.log(lastViewed);
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserByIDAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user);
    if (!admin) {
      return res.status(401).json({ msg: "Unauthorised" });
    }
    const user = await User.findById(req.params.userid);
    if (!user) {
      return res.json(false);
    }
    res.json(user);
  } catch (err) {
    return res.json(false);
  }
};

const getUserByUserIDAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user);
    if (!admin) {
      return res.status(401).json({ msg: "Unauthorised" });
    }
    const user = await User.find({ userid: req.params.userid });
    if (!user) {
      return res.json(false);
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    return res.json(false);
  }
};

const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(gender, users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const savedProfilesAdminView = async (req, res) => {
  try {
    console.log("Admin saved");
    const AdminData = await Admin.findById(req.user);
    if (!AdminData) {
      return res.status(400).json({ error: "User not found" });
    }
    const user = await User.findById(req.body.userid);
    if (!user) {
      console.log("user not found");
      return res.status(400).json({ error: "User not found" });
    }
    await user.populate("savedProfiles").execPopulate();
    console.log(user);
    res.json(user.savedProfiles);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const userSearchSheet = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.find({ userid: id });
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const Membership = async (req, res) => {
  const user = req.user;
  try {
    var instance = new Razorpay({
      key_id: process.env.YOUR_KEY_ID,
      key_secret: process.env.YOUR_KEY_SECRET,
    });

    const options = {
      amount: req.body.amountpaid * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, async (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong !" });
      }
      res.status(200).json({ data: order });
    });
  } catch (err) {
    return res.status(400).json({ msg: "Error" });
  }
};

const Verify = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      id,
      type,
      amountpaid,
      activateDate,
      expireAfterSeconds,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const signature = crypto
      .createHmac("sha256", process.env.YOUR_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === signature) {

      const member = {
        id: id,
        type: type,
        amountpaid: amountpaid,
        activateDate: activateDate,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
      };
      
      if(type === "Gold"){
        const newmember = new Gold(member)
        const re = await newmember.save();
      }
      else if (type === "Silver"){
        const newmember = new Silver(member);
        const re = await newmember.save();
      }
      else{
        const newmember = new Plat(member);
        const re = await newmember.save();
      }

      const user = await User.findById(req.user)
      var expiryDate = new Date();
      console.log(user);
      if(type==="Silver")
      {
        expiryDate = new Date(expiryDate.setMonth(expiryDate.getMonth()+1));
      }

      else if (type === "Gold"){
        expiryDate = new Date(expiryDate.setMonth(expiryDate.getMonth()+4));
      }

      else {
        expiryDate = new Date(expiryDate.setMonth(expiryDate.getMonth()+12));
      }
      
      const object = {
        plan : type,
        razorpay_payment_id: razorpay_payment_id,
        activateDate: activateDate,
        expiryDate: expiryDate
      }
      user.memberdetails.push(object);
      const newuser = await user.save();

      const nmember = {
        id: id,
        type: type,
        amountpaid: amountpaid,
        activateDate: activateDate,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        expiryDate: expiryDate
      };

      const newmember = new Member(nmember);
      await newmember.save();

      transporter.sendMail({
        to: user.email,
        from: "onetouchmatrimony@gmail.com",
        subject: "Purchase Successful",
        html: `
      <style>
.card {
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 40%;
}

.card:hover {
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
padding: 2px 16px;
}
</style>
</head>
<body>

<img src="https://onetouchmatrimony.com/static/media/one%20touch%20matrimonial.6b5f1341ea60bf403018.png" style="width:20%">
<p>Hello ${user.fullname}, your purchase is successful.</p>
<p>Click on the below link to download your invoice: </p>
<p style="font-size:18px;">To download invoice click <a href="https://onetouchmatrimony.com/payment/success/${newmember.type}/${newmember.amountpaid}/${newmember.id}">here</a></p>
<p style="font-size:10px">To unsubscribe click <a href="https://localhost:3000/unsubscribe">here</a></p>
</div>`,
      });
    console.log("Mail sent");

      return res
        .status(200)
        .json({ message: "Payment verified Successfully!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getSilverMember = async (req, res) => {
  console.log("Hello");
  try {
    const user = await User.findById(req.user);
    console.log(user);
    const response = await Silver.find({ id: user.userid });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getGoldMember = async (req, res) => {
  console.log("Hello");
  try {
    const user = await User.findById(req.user);
    console.log(user);
    const response = await Gold.find({ id: user.userid });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getPlatMember = async (req, res) => {
  console.log("Hello");
  try {
    const user = await User.findById(req.user);
    console.log(user);
    const response = await Plat.find({ id: user.userid });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    console.log(members);
    return res.status(200).json(members);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const DownloadInvoice = async (req, res) => {
  var date = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();

  date = mm + "/" + dd + "/" + yyyy;
  const { type, price, id } = req.params;
  const user = await User.findOne({ userid: id });
  const fullname = user.fullname;
  const userid = id;
  const email = user.email;

  res.pdfFromHTML({
    filename: "invoice.pdf",
    htmlContent: `<html>
    <body>
      <style>
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
        }
  
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }
  
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
  
        .invoice-box table tr td:nth-child(2) {
          text-align: right;
        }
  
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }
  
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
  
        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }
  
        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }
  
        .invoice-box table tr.item.last td {
          border-bottom: none;
        }
  
        .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }
  
        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
  
          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
  
        /** RTL **/
        .invoice-box.rtl {
          direction: rtl;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
  
        .invoice-box.rtl table {
          text-align: right;
        }
  
        .invoice-box.rtl table tr td:nth-child(2) {
          text-align: left;
        }
      </style>
  
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <img src="https://onetouchmatrimony.com/static/media/one%20touch%20matrimonial.6b5f1341ea60bf403018.png" style="width: 100%; max-width: 300px" />
                  </td>
  
                  <td>
                    Created: ${date}<br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    OneTouchMatrimony<br />
                    12345 Sunny Road<br />
                    Sunnyville, CA 12345
                  </td>
  
                  <td>
                    ${fullname}<br />
                    ${userid}<br />
                    ${email}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
          <tr class="heading">
            <td>Payment Method</td>
  
            <td>Razorpay</td>
          </tr>
  
          <tr class="heading">
            <td>Item</td>
  
            <td>Price</td>
          </tr>
  
          <tr class="item">
            <td>${type} Membership</td>
  
            <td>Rs. ${price}</td>
          </tr>
  
          <tr class="Total">
            <td></td>
  
            <td>Total: ${price}</td>
          </tr>
        </table>
      </div>
    </body>
  </html>`,
  });
  console.log("Generated Invoice");
};

const getMember = async(req,res) => {
  try{
    const user = await User.findById(req.user);
    console.log(user.userid);
    const member = await Member.find({id: user.userid});
    console.log(member);
    return res.status(200).json(member);
  }catch(err){
    return res.status(500).json(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
  confirmEmail,
  isTokenValid,
  getUser,
  resetPassword,
  resetPasswordMail,
  getUserByID,
  editUserDetails,
  savedProfiles,
  saveProfile,
  blockProfile,
  blockedProfiles,
  getAllUsers,
  storeRecentProfile,
  getRecentProfiles,
  whoViewedMyProfile,
  getWhoViewedMyProfile,
  getpreferenceByGenderAndAge,
  basicSearch,
  advancedSearch,
  match,
  adminLogin,
  registerAdmin,
  checkAdmin,
  deleteUser,
  recentSignupUsers,
  updateLastViewed,
  addClick,
  getUserByIDAdmin,
  getAllUsersForAdmin,
  nameavailable,
  savedProfilesAdminView,
  saveuserid,
  getUserByUID,
  userSearchSheet,
  getUserByUserIDAdmin,
  unSubscribe,
  Membership,
  Verify,
  getSilverMember,
  getAllMembers,
  DownloadInvoice,
  getGoldMember,
  getPlatMember,
  getMember
};
