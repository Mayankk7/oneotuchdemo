const urls = {
  home: "/",
  login: "/login",
  confirmEmail: "/confirmation/:email/:token",
  forgot: "/forgotpasssword",
  changePassword: "/changepassword/:token",
  dashboard: "/dashboard",
  search: "/search",
  membership: "/membership",
  adduserid : "/adduserid",
  contact: "/contact",
  about: "/about",
  basicsearch: "/basicsearch",
  advancesearch: "/advancesearch",
  idsearch: "/idsearch",
  profilepage: "/profile",
  preferencepage: "/preference",
  myprofile: "/myprofile",
  setting: "/setting",
  notification: "/notification",
  register: "/register",
  whoviewedmyprofile: "/whoviewedmyprofile",
  unsubscribe: "/unsubscribe",
  paymentSuccess: "/payment/success/:type/:price/:id",
  contactpopup: "/contactpopup"
};

export default urls;
