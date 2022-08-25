const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    userid: {
      type: String,
    },
    useridadded: {
      type: Boolean,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    diet: {
      type: String,
    },
    smoking: {
      type: String,
    },
    drinking: {
      type: String,
    },
    aboutyou: {
      type: String,
    },
    living: {
      type: String,
    },
    height: {
      type: String,
    },
    phone: {
      type: String,
    },
    profile: {
      type: String,
    },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    religion: {
      type: String,
    },
    caste: {
      type: String,
    },
    state: {
      type: String,
    },
    lang: {
      type: String,
    },
    marital: {
      type: String,
    },
    education: {
      type: String,
    },
    work: {
      type: String,
    },
    profession: {
      type: String,
    },
    company: {
      type: String,
    },
    income: {
      type: String,
    },
    date: {
      type: String,
      default: Date.now(),
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    image1: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    image2: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    image3: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    prefAge: {
      type: String,
    },
    prefOccupation: {
      type: String,
    },
    sibling: {
      type: Number,
    },
    motherjob: {
      type: String,
    },
    fatherjob: {
      type: String,
    },
    reffer: {
      type: String,
    },
    mangolik: {
      type: String,
    },
    zodiac: {
      type: String,
    },
    resetToken: String,
    expireToken: Date,
    isVerified: { type: Boolean, default: false },
    // savedProfiles: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // blockedProfiles: [{ type: Schema.Types.ObjectId, ref: "User" }],
    blockedProfiles: [{ type: String }],
    savedProfiles: [{ type: String }],

    recentlyViewedProfiles: [{ type: String }],
    whoViewedMyProfile: [{ type: String }],
    unsubscribed : {
      type: Boolean,
      default:false,
    },
    memberdetails : [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
