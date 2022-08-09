import type { NextPage } from "next";
import CampaignDetail from "./[...slug]";

/**
 * This has no function in project
 * BUT This is for static site generation
 * To support static generation of: /campaign/index.html
 * Match route: /campaign
 */
const CampaignIndex: NextPage = () => {
  return <CampaignDetail />;
};

export default CampaignIndex;
