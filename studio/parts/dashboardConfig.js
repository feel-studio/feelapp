export default {
  widgets: [
    // { name: "deploy-vercel" },
    { name: "project-users" },
    { name: "project-info" },
    {
      name: "netlify",
      options: {
        title: "Netlify deploys",
        sites: [
          {
            title: "🚧 Staging [pp-feel.netlify.app] ",
            apiId: "9c7842fc-680c-4833-b23d-172bc751b449",
            buildHookId: "62fb6081cde59600aabaeb3e",
            name: "pp-feel",
          },
          {
            title: "💎 Production [feelstudio.netlify.app] ",
            apiId: "6cba921e-1dd7-4593-82fd-6abd06ce060b",
            buildHookId: "62fd2ea9be682945e7a970e0",
            name: "feelstudio",
          },
        ],
      },
    },
  ],
};
