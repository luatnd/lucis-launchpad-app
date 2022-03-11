import {
  BoxCampaign,
  GBoxCampaign,
  GBoxCampaignRound,
} from "../../src/generated/graphql";

export const upcommingVirtualRound: GBoxCampaignRound = {
  id: 9998,
  name: "Upcoming",
  start: "",
  end: "",
  is_whitelist: false,
  require_whitelist: false,

  // @ts-ignore
  is_abstract_round: true,
};

export const closedVirtualRound: GBoxCampaignRound = {
  id: 9999,
  name: "Closed",
  start: "", // (new Date()).toISOString()
  end: "",
  is_whitelist: false,
  require_whitelist: false,

  // @ts-ignore
  is_abstract_round: true,
};

export function getCurrentCampaignRound(c: GBoxCampaign): GBoxCampaignRound {
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
    if (nowDateStr >= r.start && nowDateStr <= r.end) {
      currentRound = r;
    }
  }

  return currentRound;
}

export function getOriginCurrentCampaignRound(c: GBoxCampaign) {
  if (c?.rounds == null) {
    return;
  }
  const now = new Date();
  const nowDateStr = now.toISOString();
  for (let item of c.rounds) {
    if (nowDateStr >= item.start && nowDateStr <= item.end) {
      return item;
    }
  }
}

export function isCampaignOpening(c: BoxCampaign): boolean {
  const now = new Date();
  return c.opening_at <= now;
}
