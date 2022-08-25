const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  registerUser,
  loginUser,
  isTokenValid,
  getUser,
  getUserByID,
  editUserDetails,
  resetPassword,
  resetPasswordMail,
  confirmEmail,
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
  getUserByIDAdmin,
  addClick,
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
} = require("../controllers/userControllers");


//invoice
router.get("/invoice/:type/:price/:id",DownloadInvoice);

//member 
router.get("/getsilvermember", auth, getSilverMember);
router.get("/getgoldmember", auth, getGoldMember);
router.get("/getplatmember", auth, getPlatMember);
router.get("/getAllmembers", auth,getAllMembers);
router.get("/getMember",auth, getMember);

// router.get("/pdfFromHTML",auth,generateInvoice);
// router.get("/invoice/downloadS",auth,Invoice);

router.post("/signup", registerUser);
router.post("/editUserDetails", auth, editUserDetails); 
router.post("/allUsers", auth, getAllUsers);

router.post("/login", loginUser);

router.post("/isTokenValid", auth, isTokenValid);

router.get("/users", auth, getUser);
router.get("/getWhoViewedMyProfile", auth, getWhoViewedMyProfile);
router.get("/match/:userid", auth, match);

router.get('/nameavailable/:userid',nameavailable)
router.get('/saveuserid/:userid',auth,saveuserid)

router.get("/:userid", getUserByID);
router.get("/uid/:userid", getUserByUID);

router.post("/savedProfile", auth, savedProfiles);
router.post("/saveProfile", auth, saveProfile);
router.post("/blockProfile", auth, blockProfile);
router.post("/blockedProfiles", auth, blockedProfiles);
//reset password
router.post("/reset", resetPasswordMail);
router.post("/reset/:token", resetPassword);
router.post("/confirmation/:email/:token", confirmEmail);
//recently viewed profiles
router.post("/storeRecentProfile", auth, storeRecentProfile);
router.post("/recentProfiles", auth, getRecentProfiles);
// who viewed my profile
router.post("/whoViewedMyProfile", auth, whoViewedMyProfile);

router.post("/getpreferenceByGenderAndAge", auth, getpreferenceByGenderAndAge);
router.post("/basicSearch", basicSearch);
router.post("/advancedSearch", advancedSearch);

//razorpay
router.post("/orders", auth, Membership);
router.post("/verify",auth, Verify)



router.post("/unsubscribe", auth, unSubscribe)
// admin 
router.post('/adminlogin', adminLogin);
router.post('/adminregister', registerAdmin);
router.post('/checkAdmin', auth, checkAdmin);
router.delete('/deleteUser/:userid', auth, deleteUser);
router.post('/recentSignup', auth, recentSignupUsers);
router.post('/updateLastView', auth, updateLastViewed);
router.get('/admin/getAllUsers', auth, getAllUsersForAdmin);
router.get('/admin/userIdsearch/:userid', auth, getUserByUserIDAdmin);


router.get('/admin/:userid', auth, getUserByIDAdmin);
router.post('/admin/addClick', addClick);
router.post("/admin/savedProfile", auth, savedProfilesAdminView);
router.post("/admin/usersheet/:id",userSearchSheet) 


module.exports = router;