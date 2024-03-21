import { SxProps, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { SelectOption } from './inputsConfig';

export enum ProjectListingConfigType {
  AreaDynamicType = 'AreaDynamicType',
  AssetEconomicalImpactType = 'AssetEconomicalImpactType',
  AssetPurposeType = 'AssetPurposeType',
  AssetStatusType = 'AssetStatusType',
  BankAccountType = 'BankAccountType',
  BuildingPermitType = 'BuildingPermitType',
  CommonPropertyType = 'CommonPropertyType',
  DemographyType = 'DemographyType',
  EnvironmentImpactType = 'EnvironmentImpactType',
  EstimatedProjectDurationType = 'EstimatedProjectDurationType',
  ExploitationType = 'ExploitationType',
  FundingType = 'FundingType',
  GeopoliticalRiskType = 'GeopoliticalRiskType',
  GuaranteeRankType = 'GuaranteeRankType',
  GuaranteeType = 'GuaranteeType',
  NaturalTechnologicalRiskType = 'NaturalTechnologicalRiskType',
  PaymentPeriodicity = 'PaymentPeriodicity',
  PropertyType = 'PropertyType',
  SocialContributionType = 'SocialContributionType',
  TransportProximityType = 'TransportProximityType',
  UrbanizationLevelType = 'UrbanizationLevelType',
  InvestmentType = 'InvestmentType',
  FundingSeries = 'FundingSeries',
  InvestmentPurposeType = 'InvestmentPurposeType',
}

export enum InvestmentType {
  DEBT = 'DEBT',
  EQUITY = 'EQUITY',
  /**
   * @type {string}
   * @deprecated Not implemented
   */
  LOAN = 'CONVERTIBLE_LOAN',
  FUND = 'FUND',
}

export enum ProjectStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  LISTED = 'Listed',
  DRAFT = 'Draft',
  PENDING = 'Pending',
  DUPLICATED = 'Duplicated',
  DE_LIST = 'DeList',
  REJECTED = 'Rejected',
  TERMINATED = 'Terminated',
  APPROVED = 'Approved',
  WITHDRAW = 'Withdraw',
  CHANGE_REQUEST = 'Change_Request',
  IN_REVIEW_BY_COMMITTEE = 'In_Review_By_Committee',
}

export enum ProjectListingMarketType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export enum ProjectListingType {
  REAL_ESTATE = 'REAL_ESTATE',
  PRIVATE_EQUITY = 'PRIVATE_EQUITY',
  /**
   * @type {string}
   * @deprecated in favor of {@link DEDICATED_FUND} & {@link HEDGE_FUND}.
   */
  FUND = 'FUNDING_PROJECT', // @deprecated
  ART = 'ART_PROJECT',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  OTHER = 'OTHER_REAL_ASSETS',
  DEDICATED_FUND = 'DEDICATED_FUND',
  HEDGE_FUND = 'HEDGE_FUND',
  COMMODITIES = 'COMMODITIES',
}

export enum InvestmentGroup {
  DIRECT_INVESTMENT = 'DIRECT_INVESTMENT',
  COLLECTIVE_INVESTMENT = 'COLLECTIVE_INVESTMENT',
}

/**
 * Project Input Group used to map each project group to the correct inputs to render
 * according to the inputs needed in each step on the UI
 */
export enum ProjectInputGroup {
  core = 'core',
  campaign = 'campaign',
  generalInfo = 'generalInfo',
  assetInfo = 'assetInfo',
  businessInfo = 'businessInfo',
  keyPerformanceIndicators = 'keyPerformanceIndicators',
  investmentInfo = 'investmentInfo',
  guaranteeLevels = 'guaranteeLevels',
  documents = 'documents',
  contactInfo = 'contactInfo',
  fundStrategy = 'fundStrategy',
  nonFinancialInfo = 'nonFinancialInfo',
}

export const mappingInputGroupToName = {
  [ProjectInputGroup.core]: 'Preliminary information',
  [ProjectInputGroup.campaign]: 'Market campaign',
  [ProjectInputGroup.generalInfo]: 'General Information',
  [ProjectInputGroup.assetInfo]: 'Asset Information',
  [ProjectInputGroup.businessInfo]: 'Business Information',
  [ProjectInputGroup.keyPerformanceIndicators]: "KPI's",
  [ProjectInputGroup.investmentInfo]: 'Investment Information',
  [ProjectInputGroup.guaranteeLevels]: 'Guarantee Levels',
  [ProjectInputGroup.documents]: 'Documents',
  [ProjectInputGroup.contactInfo]: 'Contact Information',
  [ProjectInputGroup.fundStrategy]: 'Fund Strategy',
  [ProjectInputGroup.nonFinancialInfo]: 'Non Financial Information',
};

/**
 * This enum states the values in backend response in the
 */
export enum ProjectInputGroupsFromAPI {
  PROJECT_UPLOADED = 'PROJECT_UPLOADED',
  PROJECT_GENERAL_INFO = 'PROJECT_GENERAL_INFO',
  ASSET_INFO = 'ASSET_INFO',
  BUSINESS_INFO = 'BUSINESS_INFO',
  KEY_PERFORMANCE_INDICATOR = 'KEY_PERFORMANCE_INDICATOR',
  INVESTMENT_INFO = 'INVESTMENT_INFO',
  GUARANTEE_LEVEL = 'GUARANTEE_LEVEL',
  PROJECT_DOCUMENT = 'PROJECT_DOCUMENT',
  LEGAL_INFO = 'LEGAL_INFO',
  CONTACT_INFO = 'CONTACT_INFO',
  FUND_STRATEGY = 'FUND_STRATEGY', // funds specific
  FUNDING_INFO = 'FUNDING_INFO',
  NON_FINANCIAL_INFO = 'NON_FINANCIAL_INFO',
  DOCUMENT = 'DOCUMENT', // funds specific
  PROJECT_DETAIL_COMPLETED = 'PROJECT_DETAIL_COMPLETED', // funds specific
}

export const MappingGroupsFromAPItoUI = {
  [ProjectInputGroupsFromAPI.PROJECT_GENERAL_INFO]:
    ProjectInputGroup.generalInfo,
  [ProjectInputGroupsFromAPI.ASSET_INFO]: ProjectInputGroup.assetInfo,
  [ProjectInputGroupsFromAPI.BUSINESS_INFO]: ProjectInputGroup.businessInfo,
  [ProjectInputGroupsFromAPI.KEY_PERFORMANCE_INDICATOR]:
    ProjectInputGroup.keyPerformanceIndicators,
  [ProjectInputGroupsFromAPI.INVESTMENT_INFO]: ProjectInputGroup.investmentInfo,
  [ProjectInputGroupsFromAPI.GUARANTEE_LEVEL]:
    ProjectInputGroup.guaranteeLevels,
  [ProjectInputGroupsFromAPI.PROJECT_DOCUMENT]: ProjectInputGroup.documents,
  [ProjectInputGroupsFromAPI.LEGAL_INFO]: ProjectInputGroup.investmentInfo, //todo: check
  [ProjectInputGroupsFromAPI.CONTACT_INFO]: ProjectInputGroup.contactInfo,
  [ProjectInputGroupsFromAPI.FUND_STRATEGY]: ProjectInputGroup.fundStrategy,
  [ProjectInputGroupsFromAPI.FUNDING_INFO]: ProjectInputGroup.investmentInfo,
  [ProjectInputGroupsFromAPI.NON_FINANCIAL_INFO]:
    ProjectInputGroup.nonFinancialInfo,
  [ProjectInputGroupsFromAPI.DOCUMENT]: ProjectInputGroup.documents,
  [ProjectInputGroupsFromAPI.PROJECT_DETAIL_COMPLETED]:
    ProjectInputGroup.generalInfo,
};

export enum PROJECT_DOCUMENTS {
  teaserInformationMemorandum = 'teaserInformationMemorandum',
  financialStatementAvailable = 'financialStatementAvailable',
  taxLegalDueDiligenceReport = 'taxLegalDueDiligenceReport',
  financialProjections = 'financialProjections',
  projectPicture = 'projectPicture',
  trackRecordsResumes = 'trackRecordsResumes',
  otherProjectDocumentation = 'otherProjectDocumentation',
  certificateOfIncorporation = 'certificateOfIncorporation',
  byLaws = 'byLaws',
  shareHolderAgreement = 'shareHolderAgreement',
  kycDocumentsRequired = 'kycDocumentsRequired',
  otherLegalDocument1 = 'otherLegalDocument1',
  otherLegalDocument2 = 'otherLegalDocument2',
  otherLegalDocument3 = 'otherLegalDocument3',
  termSheet = 'termSheet',
  subscriptionContract = 'subscriptionContract',
  otherDocument1 = 'otherDocument1',
  otherDocument2 = 'otherDocument2',
  otherDocument3 = 'otherDocument3',
  summaryBusinessDeck = 'summaryBusinessDeck',
}

export enum EQUITY_DOCUMENTS {
  capTable = 'capTable',
  newsExposure = 'newsExposure',
}

export enum ART_DOCUMENTS {
  valuationFromExpert = 'valuationFromExpert',
}

export enum GENERAL_INFO_INPUTS {
  ProjectName = 'projectName',
  ProjectDescription = 'projectDescription',
  Issuer = 'issuer',
  CompanyName = 'companyName',
  IssuerBank = 'issuerBank',
  IssuerBankEmail = 'issuerBankEmail',
}

export enum GUARANTEE_INPUTS {
  Type = 'guaranteeType',
  Rank = 'guaranteeRank',
  Description = 'guaranteeDescription',
  Agreements = 'guaranteeAgreements',
}

export enum GUARANTEE_HIDDEN_INPUTS {
  ProjectId = 'masterProjectId',
  Uuid = 'uuid',
  Id = 'id',
  Agreements = 'guaranteeAgreements',
}

export enum ASSET_INFO_INPUTS {
  AssetDescription = 'assetDescription',
  AssetPurpose = 'assetPurpose',
  AssetLocation = 'assetLocation',
  EstimatedMarketValue = 'estimatedMarketValue',
  EstimatedMarketValueCurrency = 'estimatedMarketValueCurrency',
  Country = 'country',
  Street = 'street',
  City = 'city',
  InvestmentPurpose = 'investmentPurpose',
  PropertyArea = 'propertyArea',
  AssetStatus = 'assetStatus',
  OperationOfAsset = 'operationOfAsset',

  LevelOfUrbanization = 'levelOfUrbanization',
  UrbanizationLevel = 'urbanizationLevel',

  Miscellaneous = 'miscellaneous',
}

export enum KPI_INPUTS {
  LoanToValueRatio = 'loanToValueRatio',
  OccupationRate = 'occupationRate',
  CapExOpExRequirement = 'capExOpExRequirement',
  WeightedAverage = 'weightedAverage',
  WeightedAverageTime = 'weightedAverageTime',
  Miscellaneous = 'miscellaneous',
  CompanyRevenue = 'companyRevenue',
  CompanyRevenueCurrency = 'companyRevenueCurrency',
  CurrentCompanyValuation = 'currentCompanyValuation',
  CurrentCompanyValuationCurrency = 'currentCompanyValuationCurrency',
  DebtToEquityRatio = 'debtToEquityRatio',
  EbitdaRevenue = 'ebitdaRevenue',
}

export enum INVESTMENT_INFO_INPUTS {
  IssuerJurisdiction = 'issuerJurisdiction',
  StructureOrArranger = 'structureOrArranger',
  PayingAndSettlementAgent = 'payingAndSettlementAgent',
  EligibleInvestors = 'eligibleInvestors',
  IssueDate = 'issueDate',
  FaceValuePerUnit = 'faceValuePerUnit',
  FaceValuePerUnitCurrency = 'faceValuePerUnitCurrency',
  InterestPerAnnum = 'interestPerAnnum',
  PaymentPeriodicity = 'paymentPeriodicity',
  PaymentPeriodicityTime = 'paymentPeriodicityTime',
  Maturity = 'maturity',
  MaturityTime = 'maturityTime',
  EarlyRedemptionDate = 'earlyRedemptionDate',

  FundraisingPeriodInDays = 'fundraisingPeriodInDays',
  fundraisingTime = 'fundraisingTime',
  HardCap = 'hardCap',
  HardCapCurrency = 'hardCapCurrency',
  IsTransferToSecondaryMarket = 'isTransferToSecondaryMarket',
  MinimumNumberOfUnit = 'minimumNumberOfUnit',
  SoftCap = 'softCap',
  SoftCapCurrency = 'softCapCurrency',

  LastPriceOnSecondaryMarket = 'lastPriceOnSecondaryMarket',
  LastPriceOnSecondaryMarketCurrency = 'lastPriceOnSecondaryMarketCurrency',

  CorporateRules = 'corporateRules',
  ExitProvisions = 'exitProvisions',
  FundingSeries = 'fundingSeries',
  InvestmentType = 'investmentType',
  MainProvision = 'mainProvision',
  Miscellaneous = 'miscellaneous',

  DividendAndExitStrategy = 'dividendAndExitStrategy',
  ExpectedMultipleOfInvestmentCapital = 'expectedMultipleOfInvestmentCapital',
  ExpectedReturnPerAnnum = 'expectedReturnPerAnnum',
}

export enum NON_FINANCIAL_INFO_INPUTS {
  AreaDynamic = 'areaDynamic',
  SocialContributionOfTheAsset = 'socialContributionOfTheAsset',
  AssetEconomyImpact = 'assetEconomyImpact',
  ImpactOfTheEnvironment = 'impactOfTheEnvironment',
  Miscellaneous = 'miscellaneous',
}

export enum CONTACT_INFO_INPUTS {
  ContactName = 'contactName',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
}

export enum BUSINESS_INFO_INPUTS {
  BusinessDescription = 'businessDescription',
  CompanyIndustry = 'companyIndustry',
  IndustryTrends = 'industryTrends',
  CompanyLocation = 'companyLocation',
  ManagingTeamResume = 'managingTeamResume',
  CompanyWebsite = 'companyWebsite',
  Miscellaneous = 'miscellaneous',
  NumberOfEmployee = 'numberOfEmployee',
  CompanyAge = 'companyAge',
  CompanyAgeTime = 'companyAgeTime',
}

export enum CORE_INFO_INPUTS {
  isinNumber = 'isinNumber',
  investmentType = 'investmentType',
  projectListingMarketType = 'projectListingMarketType',
  projectListingType = 'projectListingType',
  createCampaign = 'isCampaignCreateRequest',
  isPrivateProject = 'isPrivateProject',
  investmentGroup = 'investmentGroup',
}

export enum NEW_CAMPAIGN_INPUTS {
  CampaignName = 'campaignName',
  InvestmentType = 'investmentType',
  Description = 'description',
  Location = 'location',
  IssueDate = 'issueDate',
  AmountTarget = 'targetAmount',
  TargetAmountCurrency = 'targetAmountCurrency',
  ExpectedIRR = 'expectedIRR',
  CampaignExpire = 'campaignExpireNoOfDays',
  MaturityExitDate = 'maturityExitDate',
  CampaignPicture = 'campaignPicture',
  TermSheet = 'termSheet',
}

export enum FUND_GENERAL_INFO_INPUTS {
  projectName = 'projectName',
  projectDescription = 'projectDescription',
  fundManagerTrackRecord = 'fundManagerTrackRecord',
  typeAndStructureOfTheFund = 'typeAndStructureOfTheFund',
  fundManager = 'fundManager',
  portfolioManager = 'portfolioManager',
}

export enum FUND_STRATEGY_INPUTS {
  keyFundInvestmentThemes = 'keyFundInvestmentThemes',
  overviewOfFund = 'overviewOfFundExistingInvestment',
  targetFundSize = 'targetFundSize',
  investmentLocation = 'investmentLocation',
  faceValuePerUnitCurrency = 'faceValuePerUnitCurrency',
  softCapCurrency = 'softCapCurrency',
  hardCapCurrency = 'hardCapCurrency',
  managementFeesPaidDuringInvestmentPeriod = 'managementFeesPaidDuringInvestmentPeriod',
  managementFeesPaidOnPostInvestmentPeriod = 'managementFeesPaidOnPostInvestmentPeriod',
  distributionFee = 'distributionFee',
  carriedInterestOrPromoteFee = 'carriedInterestOrPromoteFee',
  isTransferToSecondaryMarket = 'isTransferToSecondaryMarket',
  faceValuePerUnit = 'faceValuePerUnit',
  fundraisingPeriodInDays = 'fundraisingPeriodInDays',
  fundraisingTime = 'fundraisingTime',
  softCap = 'softCap',
  hardCap = 'hardCap',
  minimumNumberOfUnit = 'minimumNumberOfUnit',
  lastPriceOnSecondaryMarket = 'lastPriceOnSecondaryMarket',
  lastPriceOnSecondaryMarketCurrency = 'lastPriceOnSecondaryMarketCurrency',
}

export enum FUND_KPI_INPUTS {
  totalFundEquityInvested = 'totalFundEquityInvested',
  followOnEquityContributed = 'followOnEquityContributed',
  expectedMOIC = 'expectedMOIC',
  expectedIRR = 'expectedIRR',
  liquidity = 'liquidity',
  assetsUnderManagement = 'assetsUnderManagement',
  netAssetValue = 'netAssetValue',
}

export enum FUND_INVESTMENT_INFO_INPUTS {
  investmentObjective = 'investmentObjective',
  fundTerm = 'fundTerm',
  durationOfTheInvestmentPeriod = 'durationOfTheInvestmentPeriod',
  targetClosingDate = 'targetClosingDate',
  transactionFees = 'transactionFees',
  elligibleInvestorsAndSpecificRestrictions = 'elligibleInvestorsAndSpecificRestrictions',
  incrementalInvestmentSize = 'incrementalInvestmentSize',
  minimumInvestmentSize = 'minimumInvestmentSize',
  targetVolatility = 'targetVolatility',
}

export enum FUND_DOCUMENTS_INPUTS {
  teaserInformationMemorandum = 'teaserInformationMemorandum',
  financialProjections = 'financialProjections',
  financialStatementAvailable = 'financialStatementAvailable',
  summaryBusinessDeck = 'summaryBusinessDeck',
  taxLegalDueDiligenceReport = 'taxLegalDueDiligenceReport',
  trackRecordsResumes = 'trackRecordsResumes',
  newsExposure = 'newsExposure',
  projectPicture = 'projectPicture',
  certificateOfIncorporation = 'certificateOfIncorporation',
  byLaws = 'byLaws',
  shareHolderAgreement = 'shareHolderAgreement',
  capTable = 'capTable',
  termSheet = 'termSheet',
  subscriptionContract = 'subscriptionContract',
  otherDocument1 = 'otherDocument1',
  otherDocument2 = 'otherDocument2',
  otherDocument3 = 'otherDocument3',
}

export enum FUNDING_SERIES {
  NA = 'N/A',
  SERIES_A = 'Series A',
  SERIES_B = 'Series B',
  SERIES_C = 'Series C',
  PRE_IPO = 'Pre IPO',
}

export const MARKETPLACE_OPTIONS_MAPPING = {
  realEstate: ProjectListingType.REAL_ESTATE,
  privateEquity: ProjectListingType.PRIVATE_EQUITY,
  primaryMarket: ProjectListingMarketType.PRIMARY,
  secondaryMarket: ProjectListingMarketType.SECONDARY,
  equityFinancing: InvestmentType.EQUITY,
  debtFinancing: InvestmentType.DEBT,
  convertibleLoanFinancing: InvestmentType.LOAN,
  fundFinancing: InvestmentType.FUND,
  infrastructureProject: ProjectListingType.INFRASTRUCTURE,
  commoditiesProject: ProjectListingType.COMMODITIES,
  otherAssets: ProjectListingType.OTHER,
  artProject: ProjectListingType.ART,
  marketCampaigns: 'CAMPAIGNS',
  hedgeFunds: ProjectListingType.HEDGE_FUND,
  closeEndedFunds: ProjectListingType.DEDICATED_FUND,
};

export type JsonFieldsStruct = {
  id: string;
  label: string | null;
  value: string | null;
};

export type ProjectInputProps = TextFieldProps & ProjectInputCustomProps;

interface ProjectInputCustomProps {
  subInputName?: InputsUnionWithSteps | InputsUnion;
  helperTitle?: string;
  decorator?: string;
  decoratorPosition?: 'start' | 'end';
  subInputLabel?: string;
  subValue?: string | number;
  defaultSubValue?: string | number;
  subDisabled?: boolean;
  dependencies?: unknown[];
  min?: string | number;
  accept?: unknown;
  'data-testid'?: 'hide';
  sx?: SxProps;
  onValueChange?: unknown;
  options?: string[] | SelectOption[];
  native?: boolean;
  validation?: (getValues: UseFormGetValues<any>) => boolean;
  tooltip?: ReactNode;
}

export type InputsUnion =
  | GENERAL_INFO_INPUTS
  | ASSET_INFO_INPUTS
  | KPI_INPUTS
  | INVESTMENT_INFO_INPUTS
  | NON_FINANCIAL_INFO_INPUTS
  | PROJECT_DOCUMENTS
  | EQUITY_DOCUMENTS
  | ART_DOCUMENTS
  | CONTACT_INFO_INPUTS
  | CORE_INFO_INPUTS
  | FUND_STRATEGY_INPUTS
  | BUSINESS_INFO_INPUTS
  | FUND_GENERAL_INFO_INPUTS
  | FUND_KPI_INPUTS
  | FUND_INVESTMENT_INFO_INPUTS
  | FUND_DOCUMENTS_INPUTS
  | GUARANTEE_INPUTS
  | NEW_CAMPAIGN_INPUTS;

//todo can be improved
export type InputsUnionWithSteps = `${ProjectInputGroup}.${InputsUnion}`;

export interface ProjectInput<V = InputsUnion> {
  name: string;
  value: V;
  props?: ProjectInputProps;
}
