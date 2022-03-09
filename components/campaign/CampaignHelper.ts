import { BoxCampaign, GBoxCampaignRound } from "../../src/generated/graphql";

export const upcommingVirtualRound: GBoxCampaignRound = {
  id: 9998,
  name: "Upcoming",
  start: "",
  end: "",
  is_whitelist: false,
  require_whitelist: false,
}

export const closedVirtualRound: GBoxCampaignRound = {
  id: 9999,
  name: "Closed",
  start: "", // (new Date()).toISOString()
  end: "",
  is_whitelist: false,
  require_whitelist: false,
}

export function getCurrentCampaignRound(c: BoxCampaign): GBoxCampaignRound {
  const rounds = c.rounds;
  const now = new Date();
  if (now < c.opening_at) {
    return upcommingVirtualRound;
  } else if (c.end < now) {
    return closedVirtualRound;
  }

  let currentRound = upcommingVirtualRound;
  const nowDateStr = now.toISOString();
  for (let i = 0, c = rounds.length; i < c; i++) {
    const r: GBoxCampaignRound = rounds[i];
    if (r.start < nowDateStr) {
      currentRound = r
    }
  }

  return currentRound
}

export function isCampaignOpening(c: BoxCampaign): boolean {
  const now = new Date();
  return c.opening_at <= now
}