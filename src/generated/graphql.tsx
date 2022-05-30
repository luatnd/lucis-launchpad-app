import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthGraphql = {
  __typename?: 'AuthGraphql';
  token: Scalars['String'];
  user?: Maybe<UserGraphql>;
};

export type BoxCampaign = {
  __typename?: 'BoxCampaign';
  CampaignRef?: Maybe<Array<CampaignRef>>;
  PresaleTransaction?: Maybe<Array<PresaleTransaction>>;
  _count: BoxCampaignCount;
  banner_img?: Maybe<Scalars['String']>;
  boxTypes?: Maybe<Array<BoxType>>;
  buyHistory?: Maybe<Array<BoxCampaignBuyHistory>>;
  cover_img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  game: Game;
  game_uid: Scalars['String'];
  highlight?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notification?: Maybe<Array<Notification>>;
  opening_at: Scalars['DateTime'];
  publish_status?: Maybe<PublishStatus>;
  rounds?: Maybe<Scalars['JSON']>;
  rules?: Maybe<Scalars['String']>;
  spotlight_position?: Maybe<Scalars['Int']>;
  start: Scalars['DateTime'];
  status?: Maybe<BoxCampaignsStatus>;
  subscribeCampaign?: Maybe<Array<BoxCampaignSubscribes>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  whitelists?: Maybe<Array<BoxCampaignWhitelist>>;
};

export enum BoxCampaignBuyHistoriesStatus {
  Confirming = 'CONFIRMING',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Succeed = 'SUCCEED'
}

export type BoxCampaignBuyHistory = {
  __typename?: 'BoxCampaignBuyHistory';
  box: BoxCampaign;
  box_campaign_uid: Scalars['String'];
  box_price?: Maybe<Scalars['JSON']>;
  box_price_uid: Scalars['String'];
  box_type_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  data?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
  round?: Maybe<Scalars['JSON']>;
  status: BoxCampaignBuyHistoriesStatus;
  tx_hash?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type BoxCampaignCount = {
  __typename?: 'BoxCampaignCount';
  CampaignRef: Scalars['Int'];
  PresaleTransaction: Scalars['Int'];
  boxTypes: Scalars['Int'];
  buyHistory: Scalars['Int'];
  notification: Scalars['Int'];
  subscribeCampaign: Scalars['Int'];
  whitelists: Scalars['Int'];
};

export type BoxCampaignSubscribes = {
  __typename?: 'BoxCampaignSubscribes';
  box_campaign: BoxCampaign;
  box_campaign_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  enable_notify: Scalars['Boolean'];
  finish: Scalars['Boolean'];
  id: Scalars['ID'];
  round?: Maybe<Scalars['JSON']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type BoxCampaignWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>;
};

export type BoxCampaignWhitelist = {
  __typename?: 'BoxCampaignWhitelist';
  box_campaign_uid: Scalars['String'];
  campaign: BoxCampaign;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export enum BoxCampaignsStatus {
  Closed = 'CLOSED',
  Opening = 'OPENING',
  Upcoming = 'UPCOMING'
}

export type BoxContract = {
  __typename?: 'BoxContract';
  _count: BoxContractCount;
  address: Scalars['String'];
  admin_address?: Maybe<Scalars['String']>;
  admin_prv_key?: Maybe<Scalars['String']>;
  boxPrices?: Maybe<Array<BoxPrice>>;
  chain: Chain;
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  currency_symbol?: Maybe<Scalars['String']>;
  is_transfered: Scalars['Boolean'];
  owner?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type BoxContractCount = {
  __typename?: 'BoxContractCount';
  boxPrices: Scalars['Int'];
};

export type BoxPrice = {
  __typename?: 'BoxPrice';
  boxType: BoxType;
  box_type_uid: Scalars['String'];
  contract?: Maybe<BoxContract>;
  contract_address?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  currency: Currency;
  currency_uid: Scalars['String'];
  price?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type BoxType = {
  __typename?: 'BoxType';
  _count: BoxTypeCount;
  box_campaign_uid: Scalars['String'];
  campaign: BoxCampaign;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  limit_per_user?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<BoxPrice>>;
  series_content?: Maybe<Scalars['String']>;
  sold_amount: Scalars['Int'];
  thumb_img?: Maybe<Scalars['String']>;
  total_amount: Scalars['Int'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type BoxTypeCount = {
  __typename?: 'BoxTypeCount';
  prices: Scalars['Int'];
};

export type BuyBoxInput = {
  box_price_uid: Scalars['String'];
  quantity: Scalars['Int'];
  round_id: Scalars['Int'];
};

export type CampaignRef = {
  __typename?: 'CampaignRef';
  box: BoxCampaign;
  box_campaign_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  ref_code: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type Chain = {
  __typename?: 'Chain';
  _count: ChainCount;
  chain_id?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currencies?: Maybe<Array<Currency>>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftBox?: Maybe<Array<BoxContract>>;
  rpc_url?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  symbol: ChainSymbol;
  updated_at: Scalars['DateTime'];
};

export type ChainCount = {
  __typename?: 'ChainCount';
  currencies: Scalars['Int'];
  nftBox: Scalars['Int'];
};

export enum ChainSymbol {
  Avax = 'AVAX',
  Bsc = 'BSC',
  Eth = 'ETH',
  Flow = 'FLOW',
  Near = 'NEAR',
  Polkadot = 'POLKADOT',
  Polygon = 'POLYGON',
  Solana = 'SOLANA'
}

export type Currency = {
  __typename?: 'Currency';
  _count: CurrencyCount;
  address: Scalars['String'];
  boxPrices?: Maybe<Array<BoxPrice>>;
  chain: Chain;
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type CurrencyCount = {
  __typename?: 'CurrencyCount';
  boxPrices: Scalars['Int'];
};

export type GBoxCampaign = {
  __typename?: 'GBoxCampaign';
  CampaignRef?: Maybe<Array<CampaignRef>>;
  PresaleTransaction?: Maybe<Array<PresaleTransaction>>;
  banner_img?: Maybe<Scalars['String']>;
  boxTypes?: Maybe<Array<GBoxType>>;
  /** get the chains which campaign supports */
  chains: Array<GChain>;
  cover_img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  game: GGame;
  game_uid: Scalars['String'];
  highlight?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notification?: Maybe<Array<Notification>>;
  opening_at: Scalars['DateTime'];
  publish_status?: Maybe<PublishStatus>;
  rounds: Array<GBoxCampaignRound>;
  rules?: Maybe<Scalars['String']>;
  spotlight_position?: Maybe<Scalars['Int']>;
  start: Scalars['DateTime'];
  status?: Maybe<BoxCampaignsStatus>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxCampaignBase = {
  __typename?: 'GBoxCampaignBase';
  CampaignRef?: Maybe<Array<CampaignRef>>;
  PresaleTransaction?: Maybe<Array<PresaleTransaction>>;
  banner_img?: Maybe<Scalars['String']>;
  cover_img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  game: GGame;
  game_uid: Scalars['String'];
  highlight?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notification?: Maybe<Array<Notification>>;
  opening_at: Scalars['DateTime'];
  publish_status?: Maybe<PublishStatus>;
  rounds?: Maybe<Scalars['JSON']>;
  rules?: Maybe<Scalars['String']>;
  spotlight_position?: Maybe<Scalars['Int']>;
  start: Scalars['DateTime'];
  status?: Maybe<BoxCampaignsStatus>;
  subscribeCampaign?: Maybe<Array<BoxCampaignSubscribes>>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxCampaignBuyHistory = {
  __typename?: 'GBoxCampaignBuyHistory';
  box: GBoxCampaignBase;
  box_campaign_uid: Scalars['String'];
  box_price?: Maybe<GBoxPriceHistory>;
  box_price_uid: Scalars['String'];
  box_type_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  data?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
  round?: Maybe<Scalars['JSON']>;
  status: BoxCampaignBuyHistoriesStatus;
  tx_hash?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type GBoxCampaignInclude = {
  boxPrices?: InputMaybe<Scalars['Boolean']>;
  boxTypes?: InputMaybe<Scalars['Boolean']>;
  chain?: InputMaybe<Scalars['Boolean']>;
  currency?: InputMaybe<Scalars['Boolean']>;
  game?: InputMaybe<Scalars['Boolean']>;
};

export type GBoxCampaignRound = {
  __typename?: 'GBoxCampaignRound';
  /** Number of box can buy per phase, current not use */
  box_limit_this_phase?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  end: Scalars['String'];
  id: Scalars['Int'];
  is_whitelist?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  /** whitelist limit */
  participant_limit?: Maybe<Scalars['Int']>;
  presale_price?: Maybe<Scalars['Float']>;
  require_presale?: Maybe<Scalars['Boolean']>;
  require_whitelist?: Maybe<Scalars['Boolean']>;
  start: Scalars['String'];
};

export type GBoxCampaignSubscribes = {
  __typename?: 'GBoxCampaignSubscribes';
  box_campaign: BoxCampaign;
  box_campaign_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  enable_notify: Scalars['Boolean'];
  id: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type GBoxContract = {
  __typename?: 'GBoxContract';
  address: Scalars['String'];
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  currency_symbol?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxPrice = {
  __typename?: 'GBoxPrice';
  boxType: BoxType;
  box_type_uid: Scalars['String'];
  contract?: Maybe<GBoxContract>;
  contract_address?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  currency: GCurrency;
  currency_uid: Scalars['String'];
  price?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxPriceHistory = {
  __typename?: 'GBoxPriceHistory';
  boxType?: Maybe<GBoxTypeHistory>;
  box_type_uid: Scalars['String'];
  chain_icon?: Maybe<Scalars['String']>;
  chain_name?: Maybe<Scalars['String']>;
  chain_symbol?: Maybe<ChainSymbol>;
  contract?: Maybe<BoxContract>;
  contract_address?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  currency_icon?: Maybe<Scalars['String']>;
  currency_name?: Maybe<Scalars['String']>;
  currency_symbol?: Maybe<Scalars['String']>;
  currency_uid: Scalars['String'];
  price?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxType = {
  __typename?: 'GBoxType';
  box_campaign_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  limit_per_user?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<GBoxPrice>>;
  series_content?: Maybe<Scalars['String']>;
  sold_amount: Scalars['Int'];
  thumb_img?: Maybe<Scalars['String']>;
  total_amount: Scalars['Int'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxTypeHistory = {
  __typename?: 'GBoxTypeHistory';
  box_campaign_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  limit_per_user?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  series_content?: Maybe<Scalars['String']>;
  sold_amount: Scalars['Int'];
  thumb_img?: Maybe<Scalars['String']>;
  total_amount: Scalars['Int'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GChain = {
  __typename?: 'GChain';
  created_at: Scalars['DateTime'];
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  symbol: ChainSymbol;
  updated_at: Scalars['DateTime'];
};

export type GCurrency = {
  __typename?: 'GCurrency';
  address: Scalars['String'];
  chain: Chain;
  chain_symbol: ChainSymbol;
  created_at: Scalars['DateTime'];
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GGame = {
  __typename?: 'GGame';
  boxCampaigns?: Maybe<Array<BoxCampaign>>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  desc_team?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pitchdeck?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  trailer_video?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  website?: Maybe<Scalars['String']>;
  whitepaper?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type Game = {
  __typename?: 'Game';
  _count: GameCount;
  boxCampaigns?: Maybe<Array<BoxCampaign>>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  desc_team?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pitchdeck?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  trailer_video?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  website?: Maybe<Scalars['String']>;
  whitepaper?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type GameCount = {
  __typename?: 'GameCount';
  boxCampaigns: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Buy box */
  buyBox?: Maybe<Scalars['Boolean']>;
  disableNotification?: Maybe<Scalars['Boolean']>;
  enableNotification?: Maybe<Scalars['Boolean']>;
  /** Generate nonce for user login */
  generateNonce: Scalars['String'];
  getNotifications?: Maybe<Array<Notification>>;
  /** User login */
  login: AuthGraphql;
  /** Box campaign ref */
  newBoxCampaignRef?: Maybe<Scalars['Boolean']>;
  /** Presale */
  presale?: Maybe<Scalars['Boolean']>;
  /** Register whitelist */
  registerWhitelist?: Maybe<Scalars['Boolean']>;
  updateEmail?: Maybe<Scalars['Boolean']>;
  updateProfile?: Maybe<UserProfile>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
};


export type MutationBuyBoxArgs = {
  input: BuyBoxInput;
};


export type MutationDisableNotificationArgs = {
  box_campaign_id: Scalars['String'];
};


export type MutationEnableNotificationArgs = {
  box_campaign_id: Scalars['String'];
};


export type MutationGenerateNonceArgs = {
  address: Scalars['String'];
};


export type MutationLoginArgs = {
  address: Scalars['String'];
  sign: Scalars['String'];
};


export type MutationNewBoxCampaignRefArgs = {
  box_campaign_uid: Scalars['String'];
  ref: Scalars['String'];
};


export type MutationPresaleArgs = {
  address: Scalars['String'];
  box_campaign_uid: Scalars['String'];
  quantity: Scalars['Int'];
  tx_hash: Scalars['String'];
};


export type MutationRegisterWhitelistArgs = {
  box_campaign_uid: Scalars['String'];
};


export type MutationUpdateEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  data: ProfileUpdateInput;
};


export type MutationVerifyEmailArgs = {
  email: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  box: BoxCampaign;
  box_campaign_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  is_Seen: Scalars['Boolean'];
  notification: NotificationType;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type NotificationStatus = {
  __typename?: 'NotificationStatus';
  content: Scalars['String'];
  user_id: Scalars['Float'];
};

export enum NotificationType {
  BuyBox = 'BuyBox',
  CampaignClosed = 'CampaignClosed',
  CampaignOpenAfter15Minutes = 'CampaignOpenAfter15Minutes',
  CampaignOpenAfterOneDay = 'CampaignOpenAfterOneDay',
  RegisterWhitelist = 'RegisterWhitelist',
  SoldOut = 'SoldOut',
  WhitelistRegistrationOpen = 'WhitelistRegistrationOpen',
  WhitelistRegistrationOpenAfterOneDay = 'WhitelistRegistrationOpenAfterOneDay'
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type PresaleTransaction = {
  __typename?: 'PresaleTransaction';
  box: BoxCampaign;
  box_campaign_uid: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  price: Scalars['Decimal'];
  quantity: Scalars['Int'];
  reason?: Maybe<Scalars['String']>;
  status: TransactionStatus;
  tx_hash: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type ProfileUpdateInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  cover?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  discord?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facebook?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  full_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  telegram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export enum PublishStatus {
  Draft = 'DRAFT',
  Hidden = 'HIDDEN',
  Pending = 'PENDING',
  Publish = 'PUBLISH'
}

export type Query = {
  __typename?: 'Query';
  /** Box campaign transaction */
  boxCampaignBuyHistories?: Maybe<Array<GBoxCampaignBuyHistory>>;
  /** box_campaign_subscribes information */
  boxCampaignSubscriptionDetail?: Maybe<GBoxCampaignSubscribes>;
  /** Box campaign detail */
  campaignDetail?: Maybe<GBoxCampaign>;
  closedBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  countUnreadNotifications?: Maybe<Scalars['Int']>;
  getAllowanceAmount: Scalars['Float'];
  /** Check current user joined whitelist */
  isInWhitelist?: Maybe<Scalars['Boolean']>;
  me?: Maybe<UserGraphql>;
  openingBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  searchCampaign?: Maybe<Array<GBoxCampaign>>;
  spotlightBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  upcomingBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  /** Check registered whitelist status */
  whitelistRegistered?: Maybe<WhitelistStatus>;
};


export type QueryBoxCampaignBuyHistoriesArgs = {
  include?: InputMaybe<GBoxCampaignInclude>;
};


export type QueryBoxCampaignSubscriptionDetailArgs = {
  box_campaign_uid: Scalars['String'];
};


export type QueryCampaignDetailArgs = {
  include: GBoxCampaignInclude;
  where: BoxCampaignWhereUniqueInput;
};


export type QueryGetAllowanceAmountArgs = {
  address: Scalars['String'];
  boxPriceUid: Scalars['String'];
};


export type QueryIsInWhitelistArgs = {
  box_campaign_uid: Scalars['String'];
};


export type QuerySearchCampaignArgs = {
  search: Scalars['String'];
};


export type QueryWhitelistRegisteredArgs = {
  box_campaign_uid: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Box type state change when box purchased */
  purchasedBox?: Maybe<GBoxType>;
  pushNotification: NotificationStatus;
  recentlyPurchasedBox?: Maybe<GBoxCampaignBuyHistory>;
  whitelistRegisteredRecently?: Maybe<WhitelistStatus>;
};


export type SubscriptionPurchasedBoxArgs = {
  box_campaign_uid: Scalars['String'];
};


export type SubscriptionPushNotificationArgs = {
  user_id: Scalars['Float'];
};


export type SubscriptionRecentlyPurchasedBoxArgs = {
  box_campaign_uid: Scalars['String'];
  user_id: Scalars['Float'];
};


export type SubscriptionWhitelistRegisteredRecentlyArgs = {
  box_campaign_uid: Scalars['String'];
};

export enum TransactionStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Succeed = 'SUCCEED'
}

export type User = {
  __typename?: 'User';
  CampaignRef?: Maybe<Array<CampaignRef>>;
  PresaleTransaction?: Maybe<Array<PresaleTransaction>>;
  _count: UserCount;
  address: Scalars['String'];
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  enable_notify?: Maybe<Array<BoxCampaignSubscribes>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  notification?: Maybe<Array<Notification>>;
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  ref_code?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  updated_at: Scalars['DateTime'];
};

export type UserCount = {
  __typename?: 'UserCount';
  CampaignRef: Scalars['Int'];
  PresaleTransaction: Scalars['Int'];
  enable_notify: Scalars['Int'];
  notification: Scalars['Int'];
};

export type UserGraphql = {
  __typename?: 'UserGraphql';
  CampaignRef?: Maybe<Array<CampaignRef>>;
  PresaleTransaction?: Maybe<Array<PresaleTransaction>>;
  _count: UserCount;
  address: Scalars['String'];
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  enable_notify?: Maybe<Array<BoxCampaignSubscribes>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  notification?: Maybe<Array<Notification>>;
  profile?: Maybe<UserProfile>;
  ref_code?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  updated_at: Scalars['DateTime'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  avatar?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  discord?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['ID'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED'
}

export type WhitelistStatus = {
  __typename?: 'WhitelistStatus';
  box_campaign_uid: Scalars['String'];
  limit: Scalars['Int'];
  registered: Scalars['Int'];
};
