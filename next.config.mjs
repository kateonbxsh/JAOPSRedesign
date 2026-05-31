const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPages = repoName?.endsWith(".github.io");
const githubPagesBasePath = isGithubPages && repoName && !isUserOrOrgPages ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath ? `${githubPagesBasePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath
  }
};

export default nextConfig;
