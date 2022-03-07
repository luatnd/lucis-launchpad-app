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
  rounds?: Maybe<Scalars['JSON']>;
  rules?: Maybe<Scalars['String']>;
  spotlight_position?: Maybe<Scalars['Int']>;
  start: Scalars['DateTime'];
  status?: Maybe<BoxCampaignsStatus>;
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
  boxTypes: Scalars['Int'];
  buyHistory: Scalars['Int'];
  whitelists: Scalars['Int'];
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
  address: Scalars['String'];
  admin_address?: Maybe<Scalars['String']>;
  admin_prv_key?: Maybe<Scalars['String']>;
  box_campaign_uid?: Maybe<Scalars['String']>;
  chain: Chain;
  chain_symbol: Scalars['String'];
  created_at: Scalars['DateTime'];
  currency_symbol?: Maybe<Scalars['String']>;
  is_transfered: Scalars['Boolean'];
  owner?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type BoxPrice = {
  __typename?: 'BoxPrice';
  boxType: BoxType;
  box_type_uid: Scalars['String'];
  chain: Chain;
  chain_symbol: Scalars['String'];
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
  quantity: Scalars['Float'];
  round_id: Scalars['Int'];
};

export type Chain = {
  __typename?: 'Chain';
  _count: ChainCount;
  boxPrices?: Maybe<Array<BoxPrice>>;
  chain_id?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  currencies?: Maybe<Array<Currency>>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftBox?: Maybe<Array<BoxContract>>;
  rpc_url?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  symbol: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type ChainCount = {
  __typename?: 'ChainCount';
  boxPrices: Scalars['Int'];
  currencies: Scalars['Int'];
  nftBox: Scalars['Int'];
};

export type Currency = {
  __typename?: 'Currency';
  _count: CurrencyCount;
  address: Scalars['String'];
  boxPrices?: Maybe<Array<BoxPrice>>;
  chain: Chain;
  chain_symbol: Scalars['String'];
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

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type GBoxCampaign = {
  __typename?: 'GBoxCampaign';
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
  rounds: Array<GBoxCampaignRound>;
  rules?: Maybe<Scalars['String']>;
  spotlight_position?: Maybe<Scalars['Int']>;
  start: Scalars['DateTime'];
  status?: Maybe<BoxCampaignsStatus>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  whitelists?: Maybe<Array<BoxCampaignWhitelist>>;
};

export type GBoxCampaignBase = {
  __typename?: 'GBoxCampaignBase';
  _count: BoxCampaignCount;
  banner_img?: Maybe<Scalars['String']>;
  cover_img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  game: Game;
  game_uid: Scalars['String'];
  highlight?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rounds?: Maybe<Scalars['JSON']>;
  rules?: Maybe<Scalars['String']>;
  spotlight_position?: Maybe<Scalars['Int']>;
  start: Scalars['DateTime'];
  status?: Maybe<BoxCampaignsStatus>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxCampaignBuyHistory = {
  __typename?: 'GBoxCampaignBuyHistory';
  box: GBoxCampaignBase;
  box_campaign_uid: Scalars['String'];
  box_price?: Maybe<GBoxPriceHistory>;
  box_price_uid: Scalars['String'];
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
  boxTypes?: InputMaybe<Scalars['Boolean']>;
  game?: InputMaybe<Scalars['Boolean']>;
  whitelists?: InputMaybe<Scalars['Boolean']>;
};

export type GBoxCampaignRound = {
  __typename?: 'GBoxCampaignRound';
  /** Number of box can buy per user */
  box_limit_per_user?: Maybe<Scalars['Int']>;
  /** Number of box can buy per phase, current not use */
  box_limit_this_phase?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  end: Scalars['String'];
  id: Scalars['Int'];
  is_whitelist?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  /** whitelist limit */
  participant_limit?: Maybe<Scalars['Int']>;
  require_whitelist?: Maybe<Scalars['Boolean']>;
  start: Scalars['String'];
};

export type GBoxPriceHistory = {
  __typename?: 'GBoxPriceHistory';
  boxType?: Maybe<GBoxTypeHistory>;
  box_type_uid: Scalars['String'];
  chain_icon?: Maybe<Scalars['String']>;
  chain_name?: Maybe<Scalars['String']>;
  chain_symbol: Scalars['String'];
  created_at: Scalars['DateTime'];
  currency_icon?: Maybe<Scalars['String']>;
  currency_name?: Maybe<Scalars['String']>;
  currency_symbol?: Maybe<Scalars['String']>;
  currency_uid: Scalars['String'];
  price?: Maybe<Scalars['Decimal']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export type GBoxTypeHistory = {
  __typename?: 'GBoxTypeHistory';
  _count: BoxTypeCount;
  box_campaign_uid: Scalars['String'];
  campaign: BoxCampaign;
  created_at: Scalars['DateTime'];
  limit_per_user?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  series_content?: Maybe<Scalars['String']>;
  sold_amount: Scalars['Int'];
  thumb_img?: Maybe<Scalars['String']>;
  total_amount: Scalars['Int'];
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
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
  /** Generate nonce for user login */
  generateNonce: Scalars['String'];
  /** User login */
  login: AuthGraphql;
  /** Register whitelist */
  registerWhitelist?: Maybe<Scalars['Boolean']>;
  updateProfile?: Maybe<UserProfile>;
  verifyEmail?: Maybe<User>;
};


export type MutationBuyBoxArgs = {
  input: BuyBoxInput;
};


export type MutationGenerateNonceArgs = {
  address: Scalars['String'];
};


export type MutationLoginArgs = {
  address: Scalars['String'];
  sign: Scalars['String'];
};


export type MutationRegisterWhitelistArgs = {
  box_campaign_uid: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  data: ProfileUpdateInput;
};


export type MutationVerifyEmailArgs = {
  email: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type ProfileUpdateInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  cover?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  created_at?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  discord?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enable_notify?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  facebook?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  full_name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  telegram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updated_at?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Box campaign transaction */
  boxCampaignBuyHistories?: Maybe<Array<GBoxCampaignBuyHistory>>;
  /** Box campaign transaction */
  campaignDetail?: Maybe<GBoxCampaign>;
  campaigns: Array<GBoxCampaign>;
  closedBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  /** Check current user joined whitelist */
  isInWhitelist?: Maybe<Scalars['Boolean']>;
  me?: Maybe<UserGraphql>;
  /** turn on notification */
  notifications: Array<Notification>;
  openingBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  /** notify emails */
  sendEmail: User;
  spotlightBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  upcomingBoxCampaign?: Maybe<Array<GBoxCampaign>>;
};


export type QueryBoxCampaignBuyHistoriesArgs = {
  include?: InputMaybe<GBoxCampaignInclude>;
};


export type QueryCampaignDetailArgs = {
  include: GBoxCampaignInclude;
  where: BoxCampaignWhereUniqueInput;
};


export type QueryIsInWhitelistArgs = {
  box_campaign_uid: Scalars['String'];
};


export type QueryNotificationsArgs = {
  UserId: Scalars['Float'];
};


export type QuerySendEmailArgs = {
  content: Scalars['String'];
  to_userId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  address: Scalars['String'];
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
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
  notification: Scalars['Int'];
};

export type UserGraphql = {
  __typename?: 'UserGraphql';
  _count: UserCount;
  address: Scalars['String'];
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
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
  enable_notify?: Maybe<Scalars['Boolean']>;
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