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
            title: "🚧 Staging [] ",
            apiId: "",
            buildHookId: "",
            name: "",
          },
          {
            title: "💎 Production [] ",
            apiId: "",
            buildHookId: "",
            name: "",
          },
        ],
      },
    },
  ],
};
