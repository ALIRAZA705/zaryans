import React from "react";

//const CheckBox = React.lazy(() => import('./controls/checkbox'));
const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() => import("./views/base/tables/Tables"));


const Patients = React.lazy(() => import('./views/patients/Patients'));
const VitalSigns = React.lazy(() => import('./views/patients/VitalSigns'));
const AddPatient = React.lazy(() => import('./views/patients/AddPatient'));
const EditPatient = React.lazy(() => import('./views/patients/EditPatient'));
const EditVitalSign = React.lazy(() => import('./views/patients/EditVitalSign'));

const Physicians = React.lazy(() => import('./views/physicians/Physicians'));
const AddPhysician = React.lazy(() => import('./views/physicians/AddPhysician'));
const EditPhysician = React.lazy(() => import('./views/physicians/EditPhysician'));

const PatientDocuments = React.lazy(() => import("./views/patients/patientDocuments"));
const AddDocuments = React.lazy(() => import("./views/patients/fileUploading"));
const VisitPatient = React.lazy(() => import("./views/patients/patientVisits"));
//const TestCalendar = React.lazy(() => import('./CalendarApp'));
const Appointments = React.lazy(() =>
  import("./views/appointments/Appointments")
);
const Receptionists = React.lazy(() =>
  import("./views/receptionists/Receptionists")
);
const GuestMeeting = React.lazy(() => import("./views/meetings/GuestMeeting"));
const HostMeeting = React.lazy(() => import("./views/meetings/HostMeeting"));
const Permission = React.lazy(() => import("./views/meetings/Permission"));
//Consultant
const ConsultantQueue = React.lazy(() =>
  import("./views/pages/Consultant/Consultant")
);

const Histories = React.lazy(() => import("./views/history/Histories"));
const AddHistory = React.lazy(() => import("./views/history/AddHistory"));
const EditHistory = React.lazy(() => import("./views/history/EditHistory"));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const BrandButtons = React.lazy(() =>
  import("./views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const routes = [
  { path: "/dashboard", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },

  { path: "/patients", name: "Patients", component: Patients, exact: true },
  { path: "/patients/Patients", name: "View Patients", component: Patients },
  { path: "/patients/VitalSigns", name: "View VitalSigns", component: VitalSigns },
  { path: "/AddPatient", name: "Add Patients", component: AddPatient },
  { path: "/EditPatient", name: "Update Patients", component: EditPatient },
  {
    path: "/patient/patientsVisits/:id",
    name: "Patient Visits",
    component: VisitPatient,
  },
  { path: "/EditVitalSign", name: "Update Vital Signs", component: EditVitalSign },

  {
    path: "/LabTest/visitLabTest/:id",
    name: "Patient Documents",
    component: PatientDocuments,
  },
  {
    path: "/Fileuploading",
    name: "Add Documents",
    component: AddDocuments,
  },
  {
    path: "/physicians",
    name: "Physicians",
    component: Physicians,
    exact: true,
  },
  {
    path: "/physicians/Physicians",
    name: "View Physicians",
    component: Physicians,
  },
  { path: "/AddPhysician", name: "Add Physicians", component: AddPhysician },
  {
    path: "/EditPhysician",
    name: "Update Physicians",
    component: EditPhysician,
  },


  {
    path: "/appointments/Appointments",
    name: "Appointments",
    component: Appointments,
  },
  {
    path: "/receptionists/Receptionists",
    name: "Receptionists",
    component: Receptionists,
  },
  // {
  //   path: "/appointments/ReactAppointments",
  //   name: "React Appointments",
  //   component: ReactAppointments,
  // },

  {
    path: "/meeting/guestMeeting",
    name: "Guest Meeting",
    component: GuestMeeting,
  },
  { path: "/meetings/Permission", name: "Host Meeting", component: Permission },
  {
    path: "/meeting/HostMeeting",
    name: "Host Meeting",
    component: HostMeeting,
  },
  //Consultant
  {
    path: "/consultation/consultationqueue",
    name: "Consultant Queue",
    component: ConsultantQueue,
  },

  { path: "/history", name: "Histories", component: Histories, exact: true },
  { path: "/history/Histories", name: "View Histories", component: Histories },
  { path: "/AddHistory", name: "Add History", component: AddHistory },
  { path: "/EditHistory", name: "Update History", component: EditHistory },

  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/forms", name: "Forms", component: BasicForms },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/brands", name: "Brands", component: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },

  { path: '/patients', name: 'Patients', component: Patients, exact: true },
  { path: '/patients/Patients', name: 'View Patients', component: Patients },
  { path: '/patients/VitalSigns', name: 'View Vital Signs', component: Patients },
  { path: '/AddPatient', name: 'Add Patients', component: AddPatient },
  { path: '/EditPatient', name: 'Update Patients', component: EditPatient },
  { path: '/EditVitalSign', name: 'Update VitalSigns', component: EditVitalSign },

  { path: '/physicians', name: 'Physicians', component: Physicians, exact: true },
  { path: '/physicians/Physicians', name: 'View Physicians', component: Physicians },
  { path: '/AddPhysician', name: 'Add Physicians', component: AddPhysician },
  { path: '/EditPhysician', name: 'Update Physicians', component: EditPhysician },

  { path: '/appointments', name: 'Appointments', component: Appointments, exact: true },
  { path: '/appointments/Appointments', name: 'View Appointments', component: Appointments },

  { path: '/appointments', name: 'Receptionists', component: Receptionists, exact: true },
  { path: '/receptionists/Receptionists', name: 'View Receptionists', component: Receptionists },

  { path: '/meetings/GuestMeeting', name: 'Guest Meeting', component: GuestMeeting },
  { path: '/meetings/Permission', name: 'Host Meeting', component: Permission },
  { path: '/meetings/HostMeeting', name: 'Host Meeting', component: HostMeeting },


  { path: '/history', name: 'Histories', component: Histories, exact: true },
  { path: '/history/Histories', name: 'View Histories', component: Histories },
  { path: '/AddHistory', name: 'Add History', component: AddHistory },
  { path: '/EditHistory', name: 'Update History', component: EditHistory },

  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
