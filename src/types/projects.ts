import { z } from 'zod';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CHF = 'CHF',
  GBP = 'GBP',
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

const PictureVariants = z.object({
  projectPicture: z.string(),
  banner: z.null(),
  thumbnail: z.string(),
  medium: z.string(),
  overlay: z.string(),
});

export const MasterProject = z.object({
  masterProjectId: z.string(),
  uuid: z.string(),
  isinNumber: z.string(),
  projectName: z.string(),
  projectHolder: z.null(),
  issuer: z.null(),
  contactName: z.string(),
  countryCallingCode: z.null(),
  phoneNumber: z.string(),
  email: z.string(),
  issuerBank: z.null(),
  issuerBankEmail: z.null(),
  projectListingMarketType: z.nativeEnum(ProjectListingMarketType),
  projectListingType: z.nativeEnum(ProjectListingType),
  investmentGroup: z.nativeEnum(InvestmentGroup),
  investmentType: z.nativeEnum(InvestmentType),
  fundingType: z.string(),
  status: z.string(),
  createdDate: z.string(),
  realStateProject: z.null(),
  privateEquityProject: z.null(),
  artProject: z.null(),
  infrastructureProject: z.null(),
  commoditiesProject: z.null(),
  fundProject: z.object({
    fundManagerTrackRecord: z.null(),
    trackRecordWithHSBC: z.null(),
    typeAndStructureOfTheFund: z.string(),
    fundManager: z.string(),
    portfolioManager: z.string(),
    keyFundInvestmentThemes: z.string(),
    overviewOfFundExistingInvestment: z.string(),
    targetFundSize: z.null(),
    investmentLocation: z.string(),
    managementFeesPaidDuringInvestmentPeriod: z.null(),
    managementFeesPaidOnPostInvestmentPeriod: z.null(),
    distributionFee: z.null(),
    carriedInterestOrPromoteFee: z.null(),
    totalFundEquityInvested: z.null(),
    followOnEquityContributed: z.null(),
    expectedMOIC: z.null(),
    expectedIRR: z.string(),
    investmentObjective: z.string(),
    fundTerm: z.string(),
    durationOfTheInvestmentPeriod: z.string(),
    targetClosingDate: z.string(),
    transactionFees: z.null(),
    elligibleInvestorsAndSpecificRestrictions: z.null(),
  }),
  defaultCurrency: z.nativeEnum(Currency),
  faceValuePerUnit: z.number(),
  availableBalance: z.number(),
  projectSupportingDocument: z.object({
    financialStatementAvailable: z.null(),
    financialProjections: z.null(),
    teaserInformationMemorandum: z.null(),
    taxLegalDueDiligenceReport: z.null(),
    projectPicture: PictureVariants,
    certificateOfIncorporation: z.null(),
    byLaws: z.null(),
    shareHolderAgreement: z.null(),
    guaranteeAgreements: z.null(),
    termSheet: z.string(),
    subscriptionContract: z.null(),
    otherDocument1: z.null(),
    otherDocument2: z.null(),
    otherDocument3: z.null(),
    capTable: z.null(),
    summaryBusinessDeck: z.string(),
    newsExposure: z.null(),
    kycDocumentsRequired: z.null(),
    trackRecordsResumes: z.null(),
    otherProjectDocumentation: z.null(),
    otherLegalDocument1: z.null(),
    otherLegalDocument2: z.null(),
    otherLegalDocument3: z.null(),
    valuationFromExpert: z.null(),
    documentJson: z.null(),
  }),
  createdBy: z.string(),
  updatedBy: z.null(),
  projectBalance: z.number(),
  companyName: z.null(),
  fundRaisingExpireDate: z.string(),
  fundRaisingExpireInDays: z.number(),
  isNdaDocumentSign: z.boolean(),
  isTransferToSecondaryMarket: z.boolean(),
  projectDescription: z.string(),
  isCompleted: z.boolean(),
  fundraisingPeriodInDays: z.number(),
  softCap: z.number(),
  softCapCurrency: z.nativeEnum(Currency),
  hardCap: z.number(),
  hardCapCurrency: z.nativeEnum(Currency),
  faceValuePerUnitCurrency: z.nativeEnum(Currency),
  minimumNumberOfUnit: z.number(),
  lastPriceOnSecondaryMarket: z.null(),
  lastPriceOnSecondaryMarketCurrency: z.null(),
  minimumInvestmentValue: z.number(),
  projectNda: z.string(),
  ndaTemplateId: z.string(),
  projectNdaAgreement: z.string(),
  isPrivateProject: z.boolean(),
  featured: z.boolean(),
  projectDetailStep: z.string(),
  isVisibleInLandingPage: z.boolean(),
  campaignId: z.null(),
  isFavorite: z.boolean(),
  reason: z.null(),
  deals: z.null(),
  subscription: z.array(z.unknown()),
  isSendNotificationEnabled: z.boolean(),
  hasLlmConsent: z.boolean(),
  events: z.array(z.unknown()),
  jsonFields: z.null(),
});

export const Project = z.object({
  masterProject: MasterProject,
  projectInfo: z.object({
    isinNumber: z.string(),
    projectName: z.string(),
    projectHolder: z.null(),
    projectDescription: z.string(),
    issuer: z.null(),
    contactName: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    issuerBank: z.null(),
    issuerBankEmail: z.null(),
    projectListingMarketType: z.string(),
    projectListingType: z.string(),
    investmentType: z.string(),
    status: z.string(),
    projectDefaultCurrency: z.nativeEnum(Currency),
    companyName: z.null(),
    companyBank: z.null(),
    companyBankEmail: z.null(),
    fundraisingPeriodInDays: z.number(),
    softCap: z.number(),
    softCapCurrency: z.nativeEnum(Currency),
    hardCap: z.number(),
    hardCapCurrency: z.nativeEnum(Currency),
    faceValuePerUnit: z.number(),
    faceValuePerUnitCurrency: z.nativeEnum(Currency),
    minimumNumberOfUnit: z.number(),
    availableInvestmentValue: z.number(),
    projectBalance: z.number(),
    isTransferToSecondaryMarket: z.boolean(),
  }),
});

export type Project = z.infer<typeof Project>;
export type MasterProject = z.infer<typeof MasterProject>;
export type PictureVariants = z.infer<typeof PictureVariants>;

export const FormValues = z.object({
  email: z.string().email().trim().min(1, 'Please enter a valid email'),
  name: z.string().trim().min(1, 'Please enter your full name'),
  amount: z.coerce
    .string({ required_error: 'Please enter a valid quantity' })
    .min(1)
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) >= 25000,
      'Minimum quantity is 25.000'
    ),
  value: z.coerce
    .string({
      required_error: 'Please enter a valid quantity',
    })
    .min(1),
  currency: z.enum(['USD']),
});

export type formValues = z.infer<typeof FormValues>;
