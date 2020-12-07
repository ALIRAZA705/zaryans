// var _default=nav;
import React from 'react'

import { connect } from "react-redux";
import { store } from "./../store";
var roles= sessionStorage.getItem("roles");
// roles= JSON.stringify(roles)


console.log("roles of admin",roles,roles === "Admin")

var _default=  [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  

  {
    _tag: "CSidebarNavItem",
    name: "Appointments",
    to: "/appointments/Appointments",
    icon: "cil-pencil",
  },
 
  {
    _tag: "CSidebarNavItem",
    name: "Patients",
    to: "/patients/Patients",
    icon: "cil-puzzle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Register new Patient",
    to: "/AddPatient",
    icon: "cil-pencil",
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Physicians',
    to: '/physicians/Physicians',
    icon: 'cil-puzzle',

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Register new Physicians',
    to: '/AddPhysician',
    icon: 'cil-pencil',

  },
  {
    _tag: "CSidebarNavDropdown",
    name: "History",
    route: "/history",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "View Histories",
        to: "/history/Histories",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Patient History",
        to: "/AddHistory",
      },

    ],
  },


  //Consultation
  {
    _tag: "CSidebarNavItem",
    name: "Consultant Visits    ",
    to: "/consultation/consultationqueue",
    icon: "cil-puzzle",
 
  },


 
];
var _default1=  [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },
]
var _default_Nurse=  [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  

  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Appointments",
  //   to: "/appointments/Appointments",
  //   icon: "cil-pencil",
  // },
 
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Patients",
  //   to: "/patients/Patients",
  //   icon: "cil-puzzle",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Register new Patient",
  //   to: "/AddPatient",
  //   icon: "cil-pencil",
  
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Physicians',
  //   to: '/physicians/Physicians',
  //   icon: 'cil-puzzle',

  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Register new Physicians',
  //   to: '/AddPhysician',
  //   icon: 'cil-pencil',

  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "History",
  //   route: "/history",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "View Histories",
  //       to: "/history/Histories",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Add Patient History",
  //       to: "/AddHistory",
  //     },

  //   ],
  // },


  //Consultation
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Consultant Visits    ",
  //   to: "/consultation/consultationqueue",
  //   icon: "cil-puzzle",
 
  // },


 
];
var _default_Consultant=  [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  

  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Appointments",
  //   to: "/appointments/Appointments",
  //   icon: "cil-pencil",
  // },
 
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Patients",
  //   to: "/patients/Patients",
  //   icon: "cil-puzzle",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Register new Patient",
  //   to: "/AddPatient",
  //   icon: "cil-pencil",
  
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Physicians',
  //   to: '/physicians/Physicians',
  //   icon: 'cil-puzzle',

  // },
  // // {
  // //   _tag: 'CSidebarNavItem',
  // //   name: 'Register new Physicians',
  // //   to: '/AddPhysician',
  // //   icon: 'cil-pencil',

  // // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "History",
  //   route: "/history",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "View Histories",
  //       to: "/history/Histories",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Add Patient History",
  //       to: "/AddHistory",
  //     },

  //   ],
  // },


  //Consultation
  {
    _tag: "CSidebarNavItem",
    name: "Consultant Visits    ",
    to: "/consultation/consultationqueue",
    icon: "cil-puzzle",
 
  },


 
];
var _default_Physician=  [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  

  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Appointments",
  //   to: "/appointments/Appointments",
  //   icon: "cil-pencil",
  // },
 
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Patients",
  //   to: "/patients/Patients",
  //   icon: "cil-puzzle",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Register new Patient",
  //   to: "/AddPatient",
  //   icon: "cil-pencil",
  
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Physicians',
    to: '/physicians/Physicians',
    icon: 'cil-puzzle',

  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Primary Care Physician",
  //   to: "/PhysicianHome",
  //   icon: "cil-puzzle",
    
  //   },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Register new Physicians',
  //   to: '/AddPhysician',
  //   icon: 'cil-pencil',

  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "History",
  //   route: "/history",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "View Histories",
  //       to: "/history/Histories",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Add Patient History",
  //       to: "/AddHistory",
  //     },

  //   ],
  // },


  //Consultation
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Consultant Visits    ",
  //   to: "/consultation/consultationqueue",
  //   icon: "cil-puzzle",
 
  // },


 
];
var _default_Receptionist=  [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  

  {
    _tag: "CSidebarNavItem",
    name: "Appointments",
    to: "/appointments/Appointments",
    icon: "cil-pencil",
  },
 
  {
    _tag: "CSidebarNavItem",
    name: "Patients",
    to: "/patients/Patients",
    icon: "cil-puzzle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Register new Patient",
    to: "/AddPatient",
    icon: "cil-pencil",
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Physicians',
    to: '/physicians/Physicians',
    icon: 'cil-puzzle',

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Register new Physicians',
    to: '/AddPhysician',
    icon: 'cil-pencil',

  },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "History",
  //   route: "/history",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "View Histories",
  //       to: "/history/Histories",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Add Patient History",
  //       to: "/AddHistory",
  //     },

  //   ],
  // },


  //Consultation
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Consultant Visits    ",
  //   to: "/consultation/consultationqueue",
  //   icon: "cil-puzzle",
 
  // },


 
];
var roles_side = roles == "Admin"? _default : roles == "Nurse"?_default_Nurse:roles == "Consultant"? _default_Consultant:roles == "Physician"? _default_Physician:roles == "Receptionist"? _default_Receptionist:_default1;

// if(roles=="admin")
// {
export default  roles_side;
// }
// const mapStateToProps = (state) => {
//   return {
//     userReducer: state.userReducer,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setToken: () => dispatch(alert("")),
//   };
// };

// export default connect(mapStateToProps)(_default);