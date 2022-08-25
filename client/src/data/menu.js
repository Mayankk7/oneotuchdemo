export const MenuItems = [
  // {
  //   title: "Membership",
  //   path: "/membership",
  //   dropdown: false,
  // },
  {
    title: "Preference",
    path: "/preference",
    dropdown: false,
  },
  {
    title: "Search",
    dropdown: true,
    path: "",
    anotherMenus: [
      {
        title: "Search By Id",
        path: "/idsearch",
      },
      {
        title: "Basic Search",
        path: "/basicsearch",
      },
      {
        title: "Advance Search",
        path: "/advancesearch",
      },
    ],
  },

  // {
  //   title: "About Us",
  //   path: "/about",
  //   dropdown: false,
  // },
  // {
  //   title: "Contact Us",
  //   path: "/contact",
  //   dropdown: false,
  // },
  {
    title: "Viewed My Profile",
    path: "/whoviewedmyprofile",
  },
  {
    title: "Setting",
    path: "/setting",
    dropdown: false,
  },
  //  {
  //    title: "Notification",
  //    path: "/notification",
  //    dropdown: false,
  //  },
  {
    title: "Membership",
    path: "/membership",
    dropdown: false,
  }
];
export const AdminMenuItems = [
  {
    title: "Frontend",
    path: "/",
    dropdown: false,
  },
  {
    title: "User Sheet",
    path: "/onetouchmatrimony/admin/usersheet",
    // <li><BtnLink link="/onetouchmatrimony/admin/userSheet" text="User-Sheet" /></li>
    dropdown: false,
  },
  {
    title: "My Dashboard",
    path: "/admin",
    dropdown: false,
  },

  {
    title: "Members",
    dropdown: false,
    path: "/members",
  },
  {
    title: "Logout",
    path: "/setting",
    dropdown: false,
  },
];

// {
//   title: "Search",
//   dropdown: true,
//   anotherMenus: [
//     {
//       title: "Search By Id",
//       path: "/idsearch",
//     },
//     {
//       title: "Basic Search",
//       path: "/basicsearch",
//     },
//     {
//       title: "Advance Search",
//       path: "/advancesearch",
//     },
//   ],
// },
