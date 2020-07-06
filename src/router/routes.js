import store from "../store/index";
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/ask",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/QuestionPage.vue") }
    ],
    beforeEnter(to, from, next) {
      if (store().getters.getAuth) {
        next(true);
      } else {
        store().dispatch("showAlert", "Login to ask questions");
        next("/");
      }
    }
  },
  {
    path: "/search",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("components/Search.vue") }]
  },
  {
    path: "/ask-one",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/SingleQuestion.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
