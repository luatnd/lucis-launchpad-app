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
  opening_at: Scalars['DateTime'];
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
  chain: Chain;
  chain_symbol: ChainSymbol;
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
  symbol: ChainSymbol;
  updated_at: Scalars['DateTime'];
};

export type ChainCount = {
  __typename?: 'ChainCount';
  boxPrices: Scalars['Int'];
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

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type GBoxCampaign = {
  __typename?: 'GBoxCampaign';
  banner_img?: Maybe<Scalars['String']>;
  boxTypes?: Maybe<Array<GBoxType>>;
  cover_img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  game: GGame;
  game_uid: Scalars['String'];
  highlight?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  opening_at: Scalars['DateTime'];
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
  banner_img?: Maybe<Scalars['String']>;
  cover_img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  game: GGame;
  game_uid: Scalars['String'];
  highlight?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  opening_at: Scalars['DateTime'];
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
  require_whitelist?: Maybe<Scalars['Boolean']>;
  start: Scalars['String'];
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
  chain: GChain;
  chain_symbol: ChainSymbol;
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
  chain_symbol: ChainSymbol;
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
  chain_id?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rpc_url?: Maybe<Scalars['String']>;
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

export type PurchasedBoxStatus = {
  __typename?: 'PurchasedBoxStatus';
  box_campaign_uid: Scalars['String'];
  sold_amount: Scalars['Float'];
  total_amount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  /** Box campaign transaction */
  boxCampaignBuyHistories?: Maybe<Array<GBoxCampaignBuyHistory>>;
  /** Box campaign transaction */
  campaignDetail?: Maybe<GBoxCampaign>;
  closedBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  getAllowanceAmount: Scalars['Float'];
  /** Check current user joined whitelist */
  isInWhitelist?: Maybe<Scalars['Boolean']>;
  me?: Maybe<UserGraphql>;
  openingBoxCampaign?: Maybe<Array<GBoxCampaign>>;
  /** Check registered whitelist status */
  registeredWhitelist?: Maybe<WhitelistStatus>;
  /** notify emails */
  sendEmail?: Maybe<Scalars['Boolean']>;
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


export type QueryGetAllowanceAmountArgs = {
  address: Scalars['String'];
  boxPriceUid: Scalars['String'];
};


export type QueryIsInWhitelistArgs = {
  box_campaign_uid: Scalars['String'];
};


export type QueryRegisteredWhitelistArgs = {
  box_campaign_uid: Scalars['String'];
};


export type QuerySendEmailArgs = {
  content: Scalars['String'];
  from: Scalars['String'];
  to: UserInput;
};

export type Subscription = {
  __typename?: 'Subscription';
  purchasedBox: PurchasedBoxStatus;
  recentlyPurchasedBox: GBoxCampaignBuyHistory;
  whitelistRegistered: WhitelistStatus;
};


export type SubscriptionPurchasedBoxArgs = {
  box_campaign_uid: Scalars['String'];
};


export type SubscriptionRecentlyPurchasedBoxArgs = {
  box_campaign_uid: Scalars['String'];
};


export type SubscriptionWhitelistRegisteredArgs = {
  box_campaign_uid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  ref_code?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  updated_at: Scalars['DateTime'];
};

export type UserGraphql = {
  __typename?: 'UserGraphql';
  address: Scalars['String'];
  code: Scalars['String'];
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  ref_code?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  updated_at: Scalars['DateTime'];
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  userId?: InputMaybe<Scalars['Int']>;
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

export type WhitelistStatus = {
  __typename?: 'WhitelistStatus';
  box_campaign_uid: Scalars['String'];
  limit: Scalars['Int'];
  registered: Scalars['Int'];
};
