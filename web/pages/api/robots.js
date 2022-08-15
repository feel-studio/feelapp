const crawlableRobotsTxt = `User-agent: *\nAllow: /`;
const uncrawlableRobotsTxt = `User-agent: *\nDisallow: /`;

const Robots = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  // Return a non-crawlable robots.txt in non-production environments
  res.write(
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
      ? crawlableRobotsTxt
      : uncrawlableRobotsTxt
  );
  res.end();
};

export default Robots;
