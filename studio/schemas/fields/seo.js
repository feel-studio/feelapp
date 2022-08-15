export default {
  title: "SEO",
  type: "object",
  name: "seo",
  description:
    "Page specific SEO information. Will overwrite Default SEO set in Options",
  fields: [
    {
      title: "Index",
      name: "index",
      type: "boolean",
      description: "Tells search engines to index this page. (Default: true)",
    },
    {
      title: "Follow",
      name: "follow",
      type: "boolean",
      description:
        "Tells search engines to follow links on this page. (Default: true)",
    },
    {
      title: "Description",
      name: "description",
      type: "text",
      rows: 3,
      description:
        "The recommended length for descriptions is between 50 and 160 characters",
      validation: (Rule) => [
        Rule.min(50)
          .max(160)
          .warning("Description should be 50–160 characters"),
      ],
    },
    {
      title: "Preview",
      name: "preview",
      type: "image",
      description:
        "Preview image for social media. Recommended size is 1200px x 630px",
    },
  ],
};
