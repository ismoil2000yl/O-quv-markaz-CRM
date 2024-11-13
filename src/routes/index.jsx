import { lazy } from "react";
import { useSelector } from "react-redux";

const Home = lazy(() => import("pages/home"));
const SignIn = lazy(() => import("pages/auth/signIn"))
const XodimDirektor = lazy(() => import("pages/xodimlar/direktor"))
const XodimAdministrator = lazy(() => import("pages/xodimlar/administrator"))
const XodimUstoz = lazy(() => import("pages/xodimlar/ustozlar"))
const XodimOquvchi = lazy(() => import("pages/xodimlar/oquvchi"))
const XodimBarcha = lazy(() => import("pages/xodimlar/barcha"))
const Fanlar = lazy(() => import("pages/fanlar"))
const Xonalar = lazy(() => import("pages/xonalar"))
const Chegirmalar = lazy(() => import("pages/chegirmalar"))
const Reklama = lazy(() => import("pages/reklama"))
const Pupil = lazy(() => import("pages/pupil"))
const Xarajatlar = lazy(() => import("pages/xarajatlar"))
const Group = lazy(() => import("pages/group"))
const AddGroup = lazy(() => import("pages/group/create"))

// Direktor
const ShaxsiyDirektor = lazy(() => import("pages/xodimlar/direktor/personal"))
const CreateDirektor = lazy(() => import("pages/xodimlar/direktor/edit"))

// Administrator
const ShaxsiyAdministrator = lazy(() => import("pages/xodimlar/administrator/personal"))
const CreateAdministrator = lazy(() => import("pages/xodimlar/administrator/edit"))

// Oqituvchi
const ShaxsiyUstoz = lazy(() => import("pages/xodimlar/ustozlar/personal"))
const CreateUstoz = lazy(() => import("pages/xodimlar/ustozlar/edit"))

// Oqituvchi
const ShaxsiyOquvchi = lazy(() => import("pages/xodimlar/oquvchi/personal"))
const CreateOquvchi = lazy(() => import("pages/xodimlar/oquvchi/edit"))

// USTOZ

// OQUVCHI


// BOSHQARUVCHI


const authRoutes = [
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  }
];

const pages = {

  // ADMIN
  Manager: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ],

  //  ASSIST
  Boshqaruvchi: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ],

  //  USTOZ
  Ustoz: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ],

  //  PUPIL
  Oquvchi: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ],
}

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [{}]
  },
  {
    path: "/xodimlar",
    element: <XodimBarcha />
  },
  {
    path: "/xodimlar/direktor",
    element: <XodimDirektor />
  },
  {
    path: "/xodimlar/administrator",
    element: <XodimAdministrator />
  },
  {
    path: "/xodimlar/o'qituvchi",
    element: <XodimUstoz />
  },
  {
    path: "/xodimlar/o'quvchi",
    element: <XodimOquvchi />
  },
  {
    path: "/xodimlar/direktor/:id",
    element: <ShaxsiyDirektor />
  },
  {
    path: "/xodimlar/direktor/edit/:id",
    element: <CreateDirektor />
  },
  {
    path: "/xodimlar/administrator/:id",
    element: <ShaxsiyAdministrator />
  },
  {
    path: "/xodimlar/administrator/edit/:id",
    element: <CreateAdministrator />
  },
  {
    path: "/xodimlar/o'qituvchi/:id",
    element: <ShaxsiyUstoz />
  },
  {
    path: "/xodimlar/o'qituvchi/edit/:id",
    element: <CreateUstoz />
  },
  {
    path: "/xodimlar/o'quvchi/:id",
    element: <ShaxsiyOquvchi />
  },
  {
    path: "/xodimlar/o'quvchi/edit/:id",
    element: <CreateOquvchi />
  },
  {
    path: "/fanlar",
    element: <Fanlar />
  },
  {
    path: "/xonalar",
    element: <Xonalar />
  },
  {
    path: "/chegirmalar",
    element: <Chegirmalar />
  },
  {
    path: "/reklama",
    element: <Reklama />
  },
  {
    path: "/pupil",
    element: <Pupil />
  },
  {
    path: "/xarajatlar",
    element: <Xarajatlar />
  },
  {
    path: "/group",
    element: <Group />
  },
  {
    path: "/group/add",
    element: <AddGroup />
  }
]

export { authRoutes, pages, privateRoutes };

// myUser === "admin" && 
