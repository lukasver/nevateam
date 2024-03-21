// @ts-nocheck
import { DateTime } from 'luxon';

import {
  INPUTS_TYPES,
  INVESTMENT_GROUP,
  INVESTMENT_TYPE,
  LISTING_TYPE,
  MARKET_TYPE,
} from './inputsConfig';
import { PROJECTS_MAPPING } from './inputsMapping';
import {
  ASSET_INFO_INPUTS,
  CORE_INFO_INPUTS,
  BUSINESS_INFO_INPUTS,
  CONTACT_INFO_INPUTS,
  GENERAL_INFO_INPUTS,
  INVESTMENT_INFO_INPUTS,
  KPI_INPUTS,
  NON_FINANCIAL_INFO_INPUTS,
  FUND_GENERAL_INFO_INPUTS,
  FUND_STRATEGY_INPUTS,
  FUND_KPI_INPUTS,
  FUND_INVESTMENT_INFO_INPUTS,
  FUND_DOCUMENTS_INPUTS,
  PROJECT_DOCUMENTS,
  GUARANTEE_INPUTS,
  InvestmentType,
  ProjectListingType,
  NEW_CAMPAIGN_INPUTS,
  EQUITY_DOCUMENTS,
  ART_DOCUMENTS,
  InvestmentGroup,
  ProjectInput,
} from './listingConfig';
import { ProjectInputGroup } from './listingConfig';

// This file should not be edited directly, each const represents the inputs of a particular project group / step
// to be used in the src/config/inputsMapping.ts mapping constant.

export const SECONDARY_MARKET_SPECIFIC_IPUTS: ProjectInput[] = [
  {
    name: 'Last price on Secondary Market',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Last price on Secondary Market Currency',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency,
    props: { type: null },
  },
];

export const CORE_INPUTS: ProjectInput[] = [
  {
    name: 'ISIN number',
    value: CORE_INFO_INPUTS.isinNumber,
    props: {
      type: INPUTS_TYPES.Text,
      required: false,
      tooltip:
        'This must be unique, if not provided a random ISIN number will be temporary assigned to your deal.',
    },
  },
  {
    name: 'Investment type',
    value: CORE_INFO_INPUTS.investmentGroup,
    props: {
      options: INVESTMENT_GROUP.filter(({ disabled }) => !disabled),
      type: INPUTS_TYPES.Select,
      required: true,
      native: true,
    },
  },
  {
    name: 'Instrument',
    value: CORE_INFO_INPUTS.investmentType,
    props: {
      options: (getValue) => {
        const options = [];

        const investmentGroup: InvestmentGroup = getValue?.(
          addStepPrefix(
            ProjectInputGroup.core,
            CORE_INFO_INPUTS.investmentGroup
          )
        );
        const keysArr = Object.keys(
          PROJECTS_MAPPING[investmentGroup] || {}
        ) as ProjectListingType[];
        if (keysArr) {
          for (const key of keysArr) {
            const opt = INVESTMENT_TYPE.find(({ value }) => value === key);
            if (opt?.disabled) {
              continue;
            }
            options.push(opt);
          }
        }
        return options;
      },
      type: INPUTS_TYPES.Select,
      required: true,
      native: true,
      validation: (getValue) => {
        if (
          !getValue?.(
            addStepPrefix(
              ProjectInputGroup.core,
              CORE_INFO_INPUTS.investmentGroup
            )
          )
        ) {
          return true;
        }
        return false;
      },
    },
  },
  {
    name: 'Listing asset type',
    value: CORE_INFO_INPUTS.projectListingType,
    props: {
      options: (getValue) => {
        const options = [];
        const investmentGroup: InvestmentGroup = getValue?.(
          addStepPrefix(
            ProjectInputGroup.core,
            CORE_INFO_INPUTS.investmentGroup
          )
        );

        let keysArr;
        if (investmentGroup === InvestmentGroup.COLLECTIVE_INVESTMENT) {
          keysArr = Object.keys(
            PROJECTS_MAPPING[investmentGroup]?.[InvestmentType.FUND] || {}
          ) as ProjectListingType[];
        } else {
          const investmentType: InvestmentType = getValue?.(
            addStepPrefix(
              ProjectInputGroup.core,
              CORE_INFO_INPUTS.investmentType
            )
          );
          keysArr = Object.keys(
            PROJECTS_MAPPING[investmentGroup]?.[investmentType] || {}
          ) as ProjectListingType[];
        }

        if (keysArr) {
          for (const key of keysArr) {
            const opt = LISTING_TYPE.find(({ value }) => value === key);
            if (opt?.disabled) {
              continue;
            }
            options.push(opt);
          }
        }
        return options;
      },
      type: INPUTS_TYPES.Select,
      required: true,
      native: true,
      validation: (getValue) => {
        if (
          !getValue?.(
            addStepPrefix(
              ProjectInputGroup.core,
              CORE_INFO_INPUTS.investmentType
            )
          )
        ) {
          return true;
        }
        return false;
      },
    },
  },
  {
    name: 'Distribution / Market type',
    value: CORE_INFO_INPUTS.projectListingMarketType,
    props: {
      options: (getValue) =>
        getValue?.(
          addStepPrefix(ProjectInputGroup.core, CORE_INFO_INPUTS.investmentType)
        )
          ? MARKET_TYPE
          : [],
      type: INPUTS_TYPES.Select,
      required: true,
      native: true,
      validation: (getValue) => {
        if (
          !getValue?.(
            addStepPrefix(
              ProjectInputGroup.core,
              CORE_INFO_INPUTS.investmentType
            )
          ) ||
          !getValue?.(
            addStepPrefix(
              ProjectInputGroup.core,
              CORE_INFO_INPUTS.projectListingType
            )
          ) ||
          !getValue?.(
            addStepPrefix(
              ProjectInputGroup.core,
              CORE_INFO_INPUTS.investmentGroup
            )
          )
        ) {
          return true;
        }
        return false;
      },
    },
  },
  {
    name: 'Want to create a campaign for this project?',
    value: CORE_INFO_INPUTS.createCampaign,
    props: {
      type: INPUTS_TYPES.Checkbox,
      tooltip:
        'Creating a campaign will allow you to showcase a preview of your deal and get feedback from the community sooner. This can be changed later.',
    },
  },
  {
    name: 'List as private project',
    value: CORE_INFO_INPUTS.isPrivateProject,
    props: {
      type: INPUTS_TYPES.Checkbox,
      tooltip:
        'Listing a project as private can be helpful if you only want to list your deals without anyone having access to it, or to only allow specific users to view it. This can be changed later.',
    },
  },
];

export const CAMPAIGN_INPUTS: ProjectInput[] = [
  {
    name: 'Campaign Name',
    value: NEW_CAMPAIGN_INPUTS.CampaignName,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Description',
    value: NEW_CAMPAIGN_INPUTS.Description,
    props: {
      type: INPUTS_TYPES.TextArea,
      multiline: true,
      rows: 4,
      required: true,
    },
  },
  {
    name: 'Location',
    value: NEW_CAMPAIGN_INPUTS.Location,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Issue Date',
    value: NEW_CAMPAIGN_INPUTS.IssueDate,
    props: { type: INPUTS_TYPES.Date, required: true },
  },
  {
    name: 'Amount Target',
    value: NEW_CAMPAIGN_INPUTS.AmountTarget,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.campaign}.${NEW_CAMPAIGN_INPUTS.TargetAmountCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Target Amount Currency',
    value: NEW_CAMPAIGN_INPUTS.TargetAmountCurrency,
    props: { type: null, 'data-testid': 'hide' },
  },
  {
    name: 'Interest / Expected IRR',
    value: NEW_CAMPAIGN_INPUTS.ExpectedIRR,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Campaign Expire (N° of days)',
    value: NEW_CAMPAIGN_INPUTS.CampaignExpire,
    props: {
      type: INPUTS_TYPES.Number,
      required: true,
      tooltip: 'Amount of days your campaign will be visible.',
    },
  },
  {
    name: 'Maturity / Exit date',
    value: NEW_CAMPAIGN_INPUTS.MaturityExitDate,
    props: { type: INPUTS_TYPES.Date, required: true },
  },
  {
    name: 'Campaign Picture',
    value: NEW_CAMPAIGN_INPUTS.CampaignPicture,
    props: {
      type: INPUTS_TYPES.File,
      required: true,
      accept: ['image/*'],
    },
  },
  {
    name: 'Term sheet',
    value: NEW_CAMPAIGN_INPUTS.TermSheet,
    props: {
      type: INPUTS_TYPES.File,
      required: true,
      accept: ['image/*', 'application/pdf'],
    },
  },
];

export const MASTER_PROJECT_IMPORTANT_DATA: ProjectInput[] = [
  // { name: 'Project UUID', value: CORE_INFO_INPUTS.masterProjectId },
  { name: 'ISIN number', value: CORE_INFO_INPUTS.isinNumber },
  { name: 'Investment type', value: CORE_INFO_INPUTS.investmentType },
  { name: 'Listing type', value: CORE_INFO_INPUTS.projectListingType },
  {
    name: 'Market type',
    value: CORE_INFO_INPUTS.projectListingMarketType,
  },
];

const PRIVATE_EQUITY_INVESTMENT_SPECIFIC: ProjectInput[] = [
  {
    name: 'Funding series',
    value: INVESTMENT_INFO_INPUTS.FundingSeries,
    props: { type: INPUTS_TYPES.Select, required: true },
  },
  {
    name: "Main provision of the Shareholders' agreement",
    value: INVESTMENT_INFO_INPUTS.MainProvision,
    props: {
      type: INPUTS_TYPES.TextArea,
      multiline: true,
      rows: 4,
      helperTitle: 'Legal',
    },
  },
  {
    name: 'Corporate governance rules',
    value: INVESTMENT_INFO_INPUTS.CorporateRules,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Exit provisions',
    value: INVESTMENT_INFO_INPUTS.ExitProvisions,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const CONTACT_INFO: ProjectInput[] = [
  {
    name: 'Contact Name',
    value: CONTACT_INFO_INPUTS.ContactName,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Contact Email',
    value: CONTACT_INFO_INPUTS.Email,
    props: { type: INPUTS_TYPES.Email },
  },
  {
    name: 'Phone Number',
    value: CONTACT_INFO_INPUTS.PhoneNumber,
    props: { type: INPUTS_TYPES.Phone },
  },
];

export const GUARANTEE_INFO: ProjectInput[] = [
  {
    name: 'Guarantee Type',
    value: GUARANTEE_INPUTS.Type,
    props: { type: INPUTS_TYPES.Select },
  },
  {
    name: 'Guarantee Rank',
    value: GUARANTEE_INPUTS.Rank,
    props: { type: INPUTS_TYPES.Select },
  },
  {
    name: 'Guarantee Description',
    value: GUARANTEE_INPUTS.Description,
    props: { type: INPUTS_TYPES.Text, required: false },
  },
  {
    name: 'Guarantee Agreements',
    value: GUARANTEE_INPUTS.Agreements,
    props: { type: INPUTS_TYPES.File, accept: ['text/*', 'application/*'] },
  },
];

// DEBT INSTRUMENT > REAL ESTATE > PRIMARY MARKET

export const DEBT_RE_PM_GENERAL_INFO: ProjectInput[] = [
  {
    name: 'Project Name',
    value: GENERAL_INFO_INPUTS.ProjectName,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Project Description',
    value: GENERAL_INFO_INPUTS.ProjectDescription,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Issuer',
    value: GENERAL_INFO_INPUTS.Issuer,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Company Name',
    value: GENERAL_INFO_INPUTS.CompanyName,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Issuer’s bank',
    value: GENERAL_INFO_INPUTS.IssuerBank,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Issuer’s bank email',
    value: GENERAL_INFO_INPUTS.IssuerBankEmail,
    props: { type: 'email', required: true },
  },
];

export const DEBT_RE_PM_ASSET_INFO: ProjectInput[] = [
  {
    name: 'Asset Description',
    value: ASSET_INFO_INPUTS.AssetDescription,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Asset purpose',
    value: ASSET_INFO_INPUTS.AssetPurpose,
    props: { type: INPUTS_TYPES.Select, required: true },
  },
  {
    name: 'Estimated market value',
    value: ASSET_INFO_INPUTS.EstimatedMarketValue,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.assetInfo}.${ASSET_INFO_INPUTS.EstimatedMarketValueCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Estimated market value Currency',
    value: ASSET_INFO_INPUTS.EstimatedMarketValueCurrency,
    props: { type: null },
  },
  {
    name: 'Country',
    value: ASSET_INFO_INPUTS.Country,
    props: { type: INPUTS_TYPES.Country, required: true },
  },
  {
    name: 'Street',
    value: ASSET_INFO_INPUTS.Street,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'City',
    value: ASSET_INFO_INPUTS.City,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Investment purpose',
    value: ASSET_INFO_INPUTS.InvestmentPurpose,
    props: { type: INPUTS_TYPES.Select, required: true },
  },
  {
    name: 'Property area (SQM)',
    value: ASSET_INFO_INPUTS.PropertyArea,
    props: { type: INPUTS_TYPES.Number },
  },
  {
    name: 'Current status of the asset',
    value: ASSET_INFO_INPUTS.AssetStatus,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Operation of asset',
    value: ASSET_INFO_INPUTS.OperationOfAsset,
    props: { type: INPUTS_TYPES.Select, required: true },
  },
  {
    name: 'Level of urbanization',
    value: ASSET_INFO_INPUTS.LevelOfUrbanization,
    props: { type: INPUTS_TYPES.Select, required: true },
  },
  {
    name: 'Miscellaneous',
    value: ASSET_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
];

export const DEBT_RE_PM_KPI: ProjectInput[] = [
  {
    name: 'Loan to value ratio (LTV)',
    value: KPI_INPUTS.LoanToValueRatio,
    props: {
      type: INPUTS_TYPES.Number,
      helperTitle: 'Company',
      required: false,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
  {
    name: 'Occupation rate',
    value: KPI_INPUTS.OccupationRate,
    props: {
      type: INPUTS_TYPES.Number,
      helperTitle: 'Asset',
      required: false,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
  {
    name: 'CapEX/OpEX requirement',
    value: KPI_INPUTS.CapExOpExRequirement,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Weighted average lease expiry',
    value: KPI_INPUTS.WeightedAverage,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      subInputName: `${ProjectInputGroup.keyPerformanceIndicators}.${KPI_INPUTS.WeightedAverageTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'years',
      subValue: 'years',
    },
  },
  {
    name: 'Weighted average lease expiry time',
    value: KPI_INPUTS.WeightedAverageTime,
    props: { type: null },
  },
  {
    name: 'Miscellaneous',
    value: KPI_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const DEBT_RE_PM_INVESTMENT_INFO: ProjectInput[] = [
  {
    name: 'Issuer jurisdiction',
    value: INVESTMENT_INFO_INPUTS.IssuerJurisdiction,
    props: {
      type: INPUTS_TYPES.Country,
      required: true,
    },
  },
  {
    name: 'Structurer/Arranger',
    value: INVESTMENT_INFO_INPUTS.StructureOrArranger,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Paying and settlement agent',
    value: INVESTMENT_INFO_INPUTS.PayingAndSettlementAgent,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Eligible investors', // not in fieldnames
    value: INVESTMENT_INFO_INPUTS.EligibleInvestors,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Issue date',
    value: INVESTMENT_INFO_INPUTS.IssueDate,
    props: {
      type: INPUTS_TYPES.Date,
      required: true,
    },
  },
  {
    name: 'Denomination (Face value per unit)',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnit,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency}`,
      subInputLabel: 'Currency',
      dependencies: [
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      ],
      helperText: 'This field will not be editable after approval',
    },
  },
  {
    name: 'Denomination (Face value per unit) currency',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency,
    props: { type: null },
  },
  {
    name: 'Interest p.a',
    value: INVESTMENT_INFO_INPUTS.InterestPerAnnum,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
      // placeholder: 'e.g. + 5.20% per annum',
    },
  },
  {
    name: 'Interest payment periodicity',
    value: INVESTMENT_INFO_INPUTS.PaymentPeriodicity,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'months',
      subValue: 'months',
    },
  },
  {
    name: 'Interest payment periodicity Time',
    value: INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime,
    props: { type: null },
  },
  {
    name: 'Maturity',
    value: INVESTMENT_INFO_INPUTS.Maturity,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.MaturityTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'months',
      subValue: 'months',
    },
  },
  {
    name: 'Maturity Time',
    value: INVESTMENT_INFO_INPUTS.MaturityTime,
    props: { type: null },
  },
  {
    name: 'Early redemption date',
    value: INVESTMENT_INFO_INPUTS.EarlyRedemptionDate,
    props: {
      type: INPUTS_TYPES.Date,
      inputProps: { min: DateTime.now().toFormat('yyyy-MM-dd') },
    },
  },
  {
    name: 'Fundraising period In days',
    value: INVESTMENT_INFO_INPUTS.FundraisingPeriodInDays,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.fundraisingTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'days',
      subValue: 'days',
      helperTitle: 'Funding info',
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising Time',
    value: INVESTMENT_INFO_INPUTS.fundraisingTime,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Soft cap)',
    value: INVESTMENT_INFO_INPUTS.SoftCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
      subDisabled: true,
      subInputLabel: ' ',
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising size (Soft cap) Currency',
    value: INVESTMENT_INFO_INPUTS.SoftCapCurrency,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Hard cap)',
    value: INVESTMENT_INFO_INPUTS.HardCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      subInputLabel: ' ',
      subDisabled: true,
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising size (Hard cap) Currency',
    value: INVESTMENT_INFO_INPUTS.HardCapCurrency,
    props: { type: null },
  },
  {
    name: 'Minimum number of investment units',
    value: INVESTMENT_INFO_INPUTS.MinimumNumberOfUnit,
    props: {
      type: INPUTS_TYPES.Number,
      required: true,
    },
  },
  {
    name: 'Miscellaneous',
    value: INVESTMENT_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Transfer to secondary market',
    value: INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Checkbox,
    },
  },
];

export const DEBT_RE_PM_NONFINANCIAL_INFO: ProjectInput[] = [
  {
    name: 'Area dynamic',
    value: NON_FINANCIAL_INFO_INPUTS.AreaDynamic,
    props: { type: INPUTS_TYPES.Select },
  },
  {
    name: 'Social contribution',
    value: NON_FINANCIAL_INFO_INPUTS.SocialContributionOfTheAsset,
    props: { type: INPUTS_TYPES.Select },
  },
  {
    name: 'Asset economy impact',
    value: NON_FINANCIAL_INFO_INPUTS.AssetEconomyImpact,
    props: { type: INPUTS_TYPES.Select },
  },
  {
    name: 'Impact on environment',
    value: NON_FINANCIAL_INFO_INPUTS.ImpactOfTheEnvironment,
    props: { type: INPUTS_TYPES.Select },
  },
  {
    name: 'Miscellaneous',
    value: NON_FINANCIAL_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const DEBT_RE_PM_DOCUMENTS: ProjectInput[] = [
  {
    name: 'Teaser',
    value: PROJECT_DOCUMENTS.teaserInformationMemorandum,
    props: {
      type: INPUTS_TYPES.File,
      helperTitle: 'Asset / Company / Project holder',
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Image of the project',
    value: PROJECT_DOCUMENTS.projectPicture,
    props: { type: INPUTS_TYPES.File, accept: ['image/*'], required: true },
  },
  {
    name: 'Summary business deck',
    value: PROJECT_DOCUMENTS.summaryBusinessDeck,
    props: { type: INPUTS_TYPES.File, accept: ['image/*', 'application/pdf'] },
  },
  {
    name: 'Financial statements available',
    value: PROJECT_DOCUMENTS.financialStatementAvailable,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Tax/Legal Due diligence reports',
    value: PROJECT_DOCUMENTS.taxLegalDueDiligenceReport,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial projections (Business plan)',
    value: PROJECT_DOCUMENTS.financialProjections,
    props: {
      type: INPUTS_TYPES.File,

      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: "Project Holders' track records Resumes",
    value: PROJECT_DOCUMENTS.trackRecordsResumes,
    props: {
      type: INPUTS_TYPES.File,

      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other Project Documentation',
    value: PROJECT_DOCUMENTS.otherProjectDocumentation,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Term sheet',
    value: PROJECT_DOCUMENTS.termSheet,
    props: {
      type: INPUTS_TYPES.File,
      required: true,
      helperTitle: 'Financial',
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Subscription contract',
    value: PROJECT_DOCUMENTS.subscriptionContract,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (1)',
    value: PROJECT_DOCUMENTS.otherDocument1,
    props: {
      type: INPUTS_TYPES.File,

      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (2)',
    value: PROJECT_DOCUMENTS.otherDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (3)',
    value: PROJECT_DOCUMENTS.otherDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Certificate of incorporation of the SPV',
    value: PROJECT_DOCUMENTS.certificateOfIncorporation,
    props: { type: INPUTS_TYPES.File, helperTitle: 'Legal' },
  },
  {
    name: 'SPV by-laws',
    value: PROJECT_DOCUMENTS.byLaws,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'SPV shareholder agreements',
    value: PROJECT_DOCUMENTS.shareHolderAgreement,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'List of KYC documents required for suscribing investor',
    value: PROJECT_DOCUMENTS.kycDocumentsRequired,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (1)',
    value: PROJECT_DOCUMENTS.otherLegalDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (2)',
    value: PROJECT_DOCUMENTS.otherLegalDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (3)',
    value: PROJECT_DOCUMENTS.otherLegalDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
];

// DEBT INSTRUMENT > REAL ESTATE > SECONDARY MARKET

export const DEBT_RE_SM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_GENERAL_INFO,
].filter(
  (el) =>
    !(
      el.value === GENERAL_INFO_INPUTS.IssuerBankEmail ||
      el.value === GENERAL_INFO_INPUTS.IssuerBank
    )
);

export const DEBT_RE_SM_ASSET_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_ASSET_INFO.filter((el) => {
    if (ASSET_INFO_INPUTS.LevelOfUrbanization === el.value) {
      return false;
    }
    return true;
  }),
  {
    name: 'Urbanization Level',
    value: ASSET_INFO_INPUTS.UrbanizationLevel,
    props: { type: INPUTS_TYPES.Select },
  },
];

export const DEBT_RE_SM_KPI: ProjectInput[] = [...DEBT_RE_PM_KPI];

export const DEBT_RE_SM_INVESTMENT_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_INVESTMENT_INFO,
]
  .filter((el) => {
    if (
      [
        INVESTMENT_INFO_INPUTS.SoftCap,
        INVESTMENT_INFO_INPUTS.SoftCapCurrency,
        INVESTMENT_INFO_INPUTS.HardCap,
        INVESTMENT_INFO_INPUTS.HardCapCurrency,
        INVESTMENT_INFO_INPUTS.MinimumNumberOfUnit,
        INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
        INVESTMENT_INFO_INPUTS.FundraisingPeriodInDays,
        INVESTMENT_INFO_INPUTS.fundraisingTime,
      ].includes(el.value as INVESTMENT_INFO_INPUTS)
    ) {
      return false;
    }
    return true;
  })
  .concat(SECONDARY_MARKET_SPECIFIC_IPUTS);

export const DEBT_RE_SM_NONFINANCIAL_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_NONFINANCIAL_INFO,
];

export const DEBT_RE_SM_DOCUMENTS: ProjectInput[] = [
  ...DEBT_RE_PM_DOCUMENTS,
].filter((el) => {
  if (
    [
      PROJECT_DOCUMENTS.kycDocumentsRequired,
      PROJECT_DOCUMENTS.subscriptionContract,
    ].includes(el.value as PROJECT_DOCUMENTS)
  ) {
    return false;
  }
  return true;
});

// DEBT INSTRUMENT > PRIVATE COMPANIES > PRIMARY MARKET

export const DEBT_PE_PM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_GENERAL_INFO,
];

export const DEBT_PE_PM_BUSINESS_INFO: ProjectInput[] = [
  {
    name: 'Business Description',
    value: BUSINESS_INFO_INPUTS.BusinessDescription,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: "Company's years of existence",
    value: BUSINESS_INFO_INPUTS.CompanyAge,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.businessInfo}.${BUSINESS_INFO_INPUTS.CompanyAgeTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'years',
      subValue: 'years',
    },
  },
  {
    name: 'Company age time',
    value: BUSINESS_INFO_INPUTS.CompanyAgeTime,
    props: { type: null, 'data-testid': 'hide' },
  },
  {
    name: "Company's industry",
    value: BUSINESS_INFO_INPUTS.CompanyIndustry,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Company Location',
    value: BUSINESS_INFO_INPUTS.CompanyLocation,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: "Company's website",
    value: BUSINESS_INFO_INPUTS.CompanyWebsite,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Industry trends',
    value: BUSINESS_INFO_INPUTS.IndustryTrends,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Managing team resume',
    value: BUSINESS_INFO_INPUTS.ManagingTeamResume,
    props: { type: INPUTS_TYPES.TextArea, multiline: true, rows: 4 },
  },
  {
    name: 'Number of employees',
    value: BUSINESS_INFO_INPUTS.NumberOfEmployee,
    props: { type: INPUTS_TYPES.Number },
  },
  {
    name: 'Miscellaneous',
    value: BUSINESS_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const DEBT_PE_PM_KPI: ProjectInput[] = [
  {
    name: 'Company revenue',
    value: KPI_INPUTS.CompanyRevenue,
    props: {
      type: INPUTS_TYPES.Currency,
      subInputName: `${ProjectInputGroup.keyPerformanceIndicators}.${KPI_INPUTS.CompanyRevenueCurrency}`,
      subInputLabel: ' ',
    },
  },
  {
    name: 'Company revenue Currency',
    value: KPI_INPUTS.CompanyRevenueCurrency,
    props: { type: null },
  },
  {
    name: 'Loan to value ratio (LTV)',
    value: KPI_INPUTS.LoanToValueRatio,
    props: {
      type: INPUTS_TYPES.Number,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
  {
    name: 'EBITDA',
    value: KPI_INPUTS.EbitdaRevenue,
    props: {
      type: INPUTS_TYPES.Number,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
  {
    name: 'Debt to equity ratio',
    value: KPI_INPUTS.DebtToEquityRatio,
    props: {
      type: INPUTS_TYPES.Number,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
  {
    name: 'Current company valuation',
    value: KPI_INPUTS.CurrentCompanyValuation,
    props: {
      type: INPUTS_TYPES.Currency,
      subInputName: `${ProjectInputGroup.keyPerformanceIndicators}.${KPI_INPUTS.CurrentCompanyValuationCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Current company valuation Currency',
    value: KPI_INPUTS.CurrentCompanyValuationCurrency,
    props: { type: null },
  },
  {
    name: 'Miscellaneous',
    value: KPI_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const DEBT_PE_PM_INVESTMENT_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_INVESTMENT_INFO,
]
  .filter((el) => {
    if (el.value === INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket) {
      return false;
    }
    return true;
  })
  .concat([
    ...PRIVATE_EQUITY_INVESTMENT_SPECIFIC,
    {
      name: 'Transfer to secondary market',
      value: INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
      props: {
        type: INPUTS_TYPES.Checkbox,
      },
    },
  ]);

export const DEBT_PE_PM_DOCUMENTS: ProjectInput[] = [
  {
    name: 'Teaser',
    value: PROJECT_DOCUMENTS.teaserInformationMemorandum,
    props: {
      type: INPUTS_TYPES.File,
      helperTitle: 'Asset / Company / Project holder',
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Image of the project',
    value: PROJECT_DOCUMENTS.projectPicture,
    props: { type: INPUTS_TYPES.File, accept: ['image/*'], required: true },
  },
  {
    name: 'Summary business deck',
    value: PROJECT_DOCUMENTS.summaryBusinessDeck,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial statements available',
    value: PROJECT_DOCUMENTS.financialStatementAvailable,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Tax/Legal Due diligence reports',
    value: PROJECT_DOCUMENTS.taxLegalDueDiligenceReport,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial projections (Business plan)',
    value: PROJECT_DOCUMENTS.financialProjections,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: "Project Holders' track records Resumes",
    value: PROJECT_DOCUMENTS.trackRecordsResumes,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other Project Documentation',
    value: PROJECT_DOCUMENTS.otherProjectDocumentation,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Term sheet',
    value: PROJECT_DOCUMENTS.termSheet,
    props: {
      type: INPUTS_TYPES.File,
      required: true,
      helperTitle: 'Financial',
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Subscription contract',
    value: PROJECT_DOCUMENTS.subscriptionContract,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (1)',
    value: PROJECT_DOCUMENTS.otherDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (2)',
    value: PROJECT_DOCUMENTS.otherDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (3)',
    value: PROJECT_DOCUMENTS.otherDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Certificate of incorporation of the SPV',
    value: PROJECT_DOCUMENTS.certificateOfIncorporation,
    props: { type: INPUTS_TYPES.File, helperTitle: 'Legal' },
  },
  {
    name: 'SPV by-laws',
    value: PROJECT_DOCUMENTS.byLaws,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'SPV shareholder agreements',
    value: PROJECT_DOCUMENTS.shareHolderAgreement,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Cap table',
    value: EQUITY_DOCUMENTS.capTable,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'News exposure',
    value: EQUITY_DOCUMENTS.newsExposure,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (1)',
    value: PROJECT_DOCUMENTS.otherLegalDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (2)',
    value: PROJECT_DOCUMENTS.otherLegalDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (3)',
    value: PROJECT_DOCUMENTS.otherLegalDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
];

// DEBT INSTRUMENT > PRIVATE COMPANIES > SECONDARY MARKET

export const DEBT_PE_SM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_RE_SM_GENERAL_INFO,
];

export const DEBT_PE_SM_BUSINESS_INFO: ProjectInput[] = [
  ...DEBT_PE_PM_BUSINESS_INFO,
];

export const DEBT_PE_SM_INVESTMENT_INFO: ProjectInput[] = [
  ...DEBT_RE_SM_INVESTMENT_INFO,
].concat(PRIVATE_EQUITY_INVESTMENT_SPECIFIC);

export const DEBT_PE_SM_DOCUMENTS = [...DEBT_PE_PM_DOCUMENTS].filter((el) => {
  if ([PROJECT_DOCUMENTS.subscriptionContract].includes(el.value as any)) {
    return false;
  }
  return true;
});

export const DEBT_PE_SM_KPI: ProjectInput[] = [...DEBT_PE_PM_KPI];

// EQUITY INSTRUMENT > REAL ESTATE > PRIMARY MARKET

export const EQUITY_RE_PM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_GENERAL_INFO,
];

export const EQUITY_RE_PM_ASSET_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_ASSET_INFO,
];

export const EQUITY_RE_PM_KPI_INFO: ProjectInput[] = [...DEBT_RE_PM_KPI];

export const EQUITY_RE_PM_INVESTMENT_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_INVESTMENT_INFO.filter((el) => {
    if (
      [
        INVESTMENT_INFO_INPUTS.EarlyRedemptionDate,
        INVESTMENT_INFO_INPUTS.InterestPerAnnum,
        INVESTMENT_INFO_INPUTS.Maturity,
        INVESTMENT_INFO_INPUTS.MaturityTime,
        INVESTMENT_INFO_INPUTS.PaymentPeriodicity,
        INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime,
        INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
      ].includes(el.value as INVESTMENT_INFO_INPUTS)
    ) {
      return false;
    }
    return true;
  }),
  {
    name: 'Dividend and exit strategy',
    value: INVESTMENT_INFO_INPUTS.DividendAndExitStrategy,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Expected Multiple of Investment Capital',
    value: INVESTMENT_INFO_INPUTS.ExpectedMultipleOfInvestmentCapital,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Expected IRR',
    value: INVESTMENT_INFO_INPUTS.ExpectedReturnPerAnnum,
    props: { type: INPUTS_TYPES.Text, placeholder: 'From __ % to __ %' },
  },
  {
    name: 'Transfer to secondary market',
    value: INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Checkbox,
    },
  },
];

export const EQUITY_RE_PM_NONFINANCIAL_INFO: ProjectInput[] = [
  ...DEBT_RE_PM_NONFINANCIAL_INFO,
];

export const EQUITY_RE_PM_DOCUMENTS: ProjectInput[] = [...DEBT_RE_PM_DOCUMENTS];

// EQUITY INSTRUMENT > REAL ESTATE > SECONDARY MARKET

export const EQUITY_RE_SM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_RE_SM_GENERAL_INFO,
];

export const EQUITY_RE_SM_ASSET_INFO: ProjectInput[] = [
  ...DEBT_RE_SM_ASSET_INFO,
];

export const EQUITY_RE_SM_KPI_INFO: ProjectInput[] = [...DEBT_RE_SM_KPI];

export const EQUITY_RE_SM_INVESTMENT_INFO: ProjectInput[] = [
  {
    name: 'Issuer jurisdiction',
    value: INVESTMENT_INFO_INPUTS.IssuerJurisdiction,
    props: {
      type: INPUTS_TYPES.Country,
      required: true,
    },
  },
  {
    name: 'Structurer/Arranger',
    value: INVESTMENT_INFO_INPUTS.StructureOrArranger,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Paying and settlement agent',
    value: INVESTMENT_INFO_INPUTS.PayingAndSettlementAgent,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Eligible investors',
    value: INVESTMENT_INFO_INPUTS.EligibleInvestors,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Issue date',
    value: INVESTMENT_INFO_INPUTS.IssueDate,
    props: {
      type: INPUTS_TYPES.Date,
      required: true,
    },
  },
  {
    name: 'Denomination (Face value per unit)',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnit,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency}`,
      subInputLabel: 'Currency',
      dependencies: [
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      ],
      helperText: 'This field will not be editable after approval',
    },
  },
  {
    name: 'Denomination (Face value per unit) currency',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency,
    props: { type: null },
  },
  {
    name: 'Dividend and exit strategy',
    value: INVESTMENT_INFO_INPUTS.DividendAndExitStrategy,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Expected Multiple of Investment Capital',
    value: INVESTMENT_INFO_INPUTS.ExpectedMultipleOfInvestmentCapital,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Expected IRR',
    value: INVESTMENT_INFO_INPUTS.ExpectedReturnPerAnnum,
    props: { type: INPUTS_TYPES.Text, placeholder: 'From __ % to __ %' },
  },
  {
    name: 'Last price on Secondary Market',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Last price on Secondary Market Currency',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency,
    props: { type: null },
  },
  {
    name: 'Miscellaneous',
    value: INVESTMENT_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const EQUITY_RE_SM_NONFINANCIAL_INFO: ProjectInput[] = [
  ...EQUITY_RE_PM_NONFINANCIAL_INFO,
];

export const EQUITY_RE_SM_DOCUMENTS: ProjectInput[] = [...DEBT_RE_SM_DOCUMENTS];

// EQUITY INSTRUMENT > PRIVATE COMPANIES > PRIMARY MARKET

export const EQUITY_PE_PM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_PE_PM_GENERAL_INFO,
];

export const EQUITY_PE_PM_BUSINESS_INFO: ProjectInput[] = [
  ...DEBT_PE_PM_BUSINESS_INFO,
].filter((el) => el.value !== BUSINESS_INFO_INPUTS.CompanyAgeTime);

export const EQUITY_PE_PM_KPI: ProjectInput[] = [...DEBT_PE_PM_KPI];

export const EQUITY_PE_PM_INVESTMENT_INFO: ProjectInput[] = [
  ...EQUITY_RE_PM_INVESTMENT_INFO,
]
  .filter((el) => {
    if (el.value === INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket) {
      return false;
    }
    return true;
  })
  .concat([
    ...PRIVATE_EQUITY_INVESTMENT_SPECIFIC,
    {
      name: 'Transfer to secondary market',
      value: INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
      props: {
        type: INPUTS_TYPES.Checkbox,
      },
    },
  ]);

export const EQUITY_PE_PM_DOCUMENTS = [...DEBT_PE_PM_DOCUMENTS];

// EQUITY INSTRUMENT > PRIVATE COMPANIES > SECONDARY MARKET

export const EQUITY_PE_SM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_PE_SM_GENERAL_INFO,
];

export const EQUITY_PE_SM_BUSINESS_INFO: ProjectInput[] = [
  ...DEBT_PE_SM_BUSINESS_INFO,
];

export const EQUITY_PE_SM_KPI_INFO: ProjectInput[] = [...DEBT_PE_SM_KPI];

export const EQUITY_PE_SM_INVESTMENT_INFO: ProjectInput[] = [
  {
    name: 'Issuer jurisdiction',
    value: INVESTMENT_INFO_INPUTS.IssuerJurisdiction,
    props: {
      type: INPUTS_TYPES.Country,
      required: true,
    },
  },
  {
    name: 'Structurer/Arranger',
    value: INVESTMENT_INFO_INPUTS.StructureOrArranger,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Paying and settlement agent',
    value: INVESTMENT_INFO_INPUTS.PayingAndSettlementAgent,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Eligible investors',
    value: INVESTMENT_INFO_INPUTS.EligibleInvestors,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Funding series',
    value: INVESTMENT_INFO_INPUTS.FundingSeries,
    props: { type: INPUTS_TYPES.Select, required: true },
  },
  {
    name: 'Issue date',
    value: INVESTMENT_INFO_INPUTS.IssueDate,
    props: {
      type: INPUTS_TYPES.Date,
      required: true,
    },
  },
  {
    name: 'Denomination (Face value per unit)',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnit,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency}`,
      subInputLabel: 'Currency',
      dependencies: [
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      ],
      helperText: 'This field will not be editable after approval',
    },
  },
  {
    name: 'Denomination (Face value per unit) currency',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency,
    props: { type: null },
  },
  {
    name: 'Last price on Secondary Market',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Last price on Secondary Market Currency',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency,
    props: { type: null },
  },
  {
    name: 'Expected IRR',
    value: INVESTMENT_INFO_INPUTS.ExpectedReturnPerAnnum,
    props: { type: INPUTS_TYPES.Text, placeholder: 'From __ % to __ %' },
  },
  {
    name: 'Expected MOIC',
    value: INVESTMENT_INFO_INPUTS.ExpectedMultipleOfInvestmentCapital,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Dividend and exit strategy',
    value: INVESTMENT_INFO_INPUTS.DividendAndExitStrategy,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: "Main provision of the Shareholders' agreement",
    value: INVESTMENT_INFO_INPUTS.MainProvision,
    props: {
      type: INPUTS_TYPES.Text,
      multiline: true,
      rows: 4,
      helperTitle: 'Legal',
    },
  },
  {
    name: 'Corporate governance rules',
    value: INVESTMENT_INFO_INPUTS.CorporateRules,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Exit provisions',
    value: INVESTMENT_INFO_INPUTS.ExitProvisions,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Miscellaneous',
    value: INVESTMENT_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const EQUITY_PE_SM_DOCUMENTS = [...DEBT_PE_SM_DOCUMENTS].filter((el) => {
  if (
    [PROJECT_DOCUMENTS.subscriptionContract].includes(
      el.value as PROJECT_DOCUMENTS
    )
  ) {
    return false;
  }
  return true;
});

// FUND INSTRUMENT > PRIMARY MARKET

export const FUND_FUND_PM_GENERAL_INFO: ProjectInput[] = [
  {
    name: 'Name of the fund',
    value: FUND_GENERAL_INFO_INPUTS.projectName,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'General description',
    value: FUND_GENERAL_INFO_INPUTS.projectDescription,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Fund manager track record',
    value: FUND_GENERAL_INFO_INPUTS.fundManagerTrackRecord,
    props: {
      type: INPUTS_TYPES.TextArea,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Type and Structure of the fund',
    value: FUND_GENERAL_INFO_INPUTS.typeAndStructureOfTheFund,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
      helperTitle: 'Description on the fund',
    },
  },
  {
    name: 'Fund manager',
    value: FUND_GENERAL_INFO_INPUTS.fundManager,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Portfolio manager',
    value: FUND_GENERAL_INFO_INPUTS.portfolioManager,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
];

export const FUND_FUND_PM_STRATEGY: ProjectInput[] = [
  {
    name: 'Key Fund investment themes / Strategy',
    value: FUND_STRATEGY_INPUTS.keyFundInvestmentThemes,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Overview of Fund existing investments',
    value: FUND_STRATEGY_INPUTS.overviewOfFund,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Target Fund size',
    value: FUND_STRATEGY_INPUTS.targetFundSize,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Investment location',
    value: FUND_STRATEGY_INPUTS.investmentLocation,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Management fees',
    value: FUND_STRATEGY_INPUTS.managementFeesPaidDuringInvestmentPeriod,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Denomination (Face value per unit)',
    value: FUND_STRATEGY_INPUTS.faceValuePerUnit,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.fundStrategy}.${FUND_STRATEGY_INPUTS.faceValuePerUnitCurrency}`,
      subInputLabel: 'Currency',
      dependencies: [
        `${ProjectInputGroup.fundStrategy}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
        `${ProjectInputGroup.fundStrategy}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      ],
      helperText: 'This field will not be editable after approval',
    },
  },
  {
    name: 'Denomination (Face value per unit) currency',
    value: FUND_STRATEGY_INPUTS.faceValuePerUnitCurrency,
    props: { type: null },
  },
  {
    name: 'Fundraising period In days',
    value: FUND_STRATEGY_INPUTS.fundraisingPeriodInDays,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.fundStrategy}.${FUND_STRATEGY_INPUTS.fundraisingTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'days',
      subValue: 'days',
      helperTitle: 'Funding info',
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising period In days time',
    value: FUND_STRATEGY_INPUTS.fundraisingTime,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Soft cap)',
    value: FUND_STRATEGY_INPUTS.softCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.fundStrategy}.${FUND_STRATEGY_INPUTS.softCapCurrency}`,
      subDisabled: true,
      subInputLabel: ' ',
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising size (Soft cap) Currency',
    value: FUND_STRATEGY_INPUTS.softCapCurrency,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Hard cap)',
    value: FUND_STRATEGY_INPUTS.hardCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.fundStrategy}.${FUND_STRATEGY_INPUTS.hardCapCurrency}`,
      subInputLabel: ' ',
      subDisabled: true,
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising size (Hard cap) Currency',
    value: FUND_STRATEGY_INPUTS.hardCapCurrency,
    props: { type: null },
  },
  {
    name: 'Minimum number of investment units',
    value: FUND_STRATEGY_INPUTS.minimumNumberOfUnit,
    props: { type: INPUTS_TYPES.Number },
  },
  {
    name: 'Distribution fee',
    value: FUND_STRATEGY_INPUTS.distributionFee,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Carried Interest / Promote fee',
    value: FUND_STRATEGY_INPUTS.carriedInterestOrPromoteFee,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Will transfer to secondary market',
    value: FUND_STRATEGY_INPUTS.isTransferToSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Checkbox,
      tooltip:
        'Toogle this if you want your project to be available in the Secondary Market after the fundraising period is expired',
    },
  },
];

export const FUND_FUND_PM_KPI: ProjectInput[] = [
  {
    name: 'Expected IRR (Internal rate of return)',
    value: FUND_KPI_INPUTS.expectedIRR,
    props: {
      type: INPUTS_TYPES.Text,
      required: false,
    },
  },
  {
    name: 'Total fund equity invested',
    value: FUND_KPI_INPUTS.totalFundEquityInvested,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Expected MOIC (Multiple of invested capital)',
    value: FUND_KPI_INPUTS.expectedMOIC,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  // {
  //   name: 'Net Asset Value (NAV)',
  //   value: `jsonFields.${FUND_KPI_INPUTS.netAssetValue}`,
  //   props: {
  //     type: INPUTS_TYPES.Text,
  //   },
  // },
  // {
  //   name: 'Follow-on equity contributed',
  //   value: FUND_KPI_INPUTS.followOnEquityContributed,
  //   props: {
  //     type: null,
  //   },
  // },
  // {
  //   name: 'Liquidity',
  //   value: `jsonFields.${FUND_KPI_INPUTS.liquidity}`,
  //   props: {
  //     type: INPUTS_TYPES.Text,
  //   },
  // },
  // {
  //   name: 'Assets under management (AUM)',
  //   value: `jsonFields.${FUND_KPI_INPUTS.assetsUnderManagement}`,
  //   props: {
  //     type: INPUTS_TYPES.Text,
  //   },
  // },
];

export const FUND_FUND_PM_INVESTMENT_INFO: ProjectInput[] = [
  {
    name: 'Investment Objective',
    value: FUND_INVESTMENT_INFO_INPUTS.investmentObjective,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Fund term',
    value: FUND_INVESTMENT_INFO_INPUTS.fundTerm,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Investment Period',
    value: FUND_INVESTMENT_INFO_INPUTS.durationOfTheInvestmentPeriod,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  // {
  //   name: 'Minimum investment size',
  //   value: `jsonFields.${FUND_INVESTMENT_INFO_INPUTS.minimumInvestmentSize}`,
  //   props: {
  //     type: INPUTS_TYPES.Text,
  //   },
  // },
  // {
  //   name: 'Incremental investment size',
  //   value: `jsonFields.${FUND_INVESTMENT_INFO_INPUTS.incrementalInvestmentSize}`,
  //   props: {
  //     type: INPUTS_TYPES.Text,
  //   },
  // },
  // {
  //   name: 'Target volatility',
  //   value: `jsonFields.${FUND_INVESTMENT_INFO_INPUTS.targetVolatility}`,
  //   props: {
  //     type: INPUTS_TYPES.Text,
  //   },
  // },
  {
    name: 'Target Closing Date',
    value: FUND_INVESTMENT_INFO_INPUTS.targetClosingDate,
    props: {
      type: INPUTS_TYPES.Date,
      required: false,
      inputProps: { min: DateTime.now().toFormat('yyyy-MM-dd') },
    },
  },
  {
    name: 'Transaction fees',
    value: FUND_INVESTMENT_INFO_INPUTS.transactionFees,
    props: {
      type: INPUTS_TYPES.Text,
      required: false,
    },
  },
  {
    name: 'Eligible investors and specific investment restrictions',
    value:
      FUND_INVESTMENT_INFO_INPUTS.elligibleInvestorsAndSpecificRestrictions,
    props: {
      type: INPUTS_TYPES.Text,
      required: false,
    },
  },
];

export const FUND_FUND_PM_DOCUMENTS: ProjectInput[] = [
  {
    name: 'Teaser',
    value: PROJECT_DOCUMENTS.teaserInformationMemorandum,
    props: {
      type: INPUTS_TYPES.File,
      helperTitle: 'Asset / Company / Project holder',
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Image of the project',
    value: FUND_DOCUMENTS_INPUTS.projectPicture,
    props: { type: INPUTS_TYPES.File, accept: ['image/*'], required: true },
  },
  {
    name: 'Financial projections (Business plan)',
    value: FUND_DOCUMENTS_INPUTS.financialProjections,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial statements available',
    value: FUND_DOCUMENTS_INPUTS.financialStatementAvailable,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Summary business deck',
    value: FUND_DOCUMENTS_INPUTS.summaryBusinessDeck,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Tax/Legal Due diligence reports',
    value: FUND_DOCUMENTS_INPUTS.taxLegalDueDiligenceReport,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: "Project Holders' track records Resumes",
    value: FUND_DOCUMENTS_INPUTS.trackRecordsResumes,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'News exposure',
    value: FUND_DOCUMENTS_INPUTS.newsExposure,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Certificate of incorporation of the SPV',
    value: FUND_DOCUMENTS_INPUTS.certificateOfIncorporation,
    props: { type: INPUTS_TYPES.File, helperTitle: 'Legal' },
  },
  {
    name: 'SPV by-laws',
    value: FUND_DOCUMENTS_INPUTS.byLaws,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'SPV shareholder agreements',
    value: FUND_DOCUMENTS_INPUTS.shareHolderAgreement,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Cap table',
    value: FUND_DOCUMENTS_INPUTS.capTable,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Fund term sheet',
    value: FUND_DOCUMENTS_INPUTS.termSheet,
    props: {
      type: INPUTS_TYPES.File,
      helperTitle: 'Financial',
      required: true,
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Subscription contract',
    value: FUND_DOCUMENTS_INPUTS.subscriptionContract,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (1)',
    value: FUND_DOCUMENTS_INPUTS.otherDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (2)',
    value: FUND_DOCUMENTS_INPUTS.otherDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (3)',
    value: FUND_DOCUMENTS_INPUTS.otherDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
];

// FUND INSTRUMENT > SECONDARY MARKET

export const FUND_FUND_SM_GENERAL_INFO: ProjectInput[] = [
  ...FUND_FUND_PM_GENERAL_INFO,
];

export const FUND_FUND_SM_STRATEGY: ProjectInput[] = [
  {
    name: 'Key Fund investment themes / Strategy',
    value: FUND_STRATEGY_INPUTS.keyFundInvestmentThemes,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Overview of Fund existing investments',
    value: FUND_STRATEGY_INPUTS.overviewOfFund,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Target Fund size',
    value: FUND_STRATEGY_INPUTS.targetFundSize,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Investment location',
    value: FUND_STRATEGY_INPUTS.investmentLocation,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Denomination (Face value per unit)',
    value: FUND_STRATEGY_INPUTS.faceValuePerUnit,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.fundStrategy}.${FUND_STRATEGY_INPUTS.faceValuePerUnitCurrency}`,
      subInputLabel: 'Currency',
      helperText: 'This field will not be editable after approval',
    },
  },
  {
    name: 'Denomination (Face value per unit) currency',
    value: FUND_STRATEGY_INPUTS.faceValuePerUnitCurrency,
    props: { type: null },
  },
  {
    name: 'Minimum number of investment units',
    value: FUND_STRATEGY_INPUTS.minimumNumberOfUnit,
    props: { type: INPUTS_TYPES.Number },
  },
  {
    name: 'Last price on Secondary Market',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Currency,
      required: false,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Last price on Secondary Market Currency',
    value: INVESTMENT_INFO_INPUTS.LastPriceOnSecondaryMarketCurrency,
    props: { type: null },
  },
  {
    name: 'Management fees',
    value: FUND_STRATEGY_INPUTS.managementFeesPaidDuringInvestmentPeriod,
    props: {
      type: INPUTS_TYPES.Text,
      helperTitle: 'Structure of fees',
    },
  },
  {
    name: 'Distribution fee',
    value: FUND_STRATEGY_INPUTS.distributionFee,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Carried Interest / Promote fee',
    value: FUND_STRATEGY_INPUTS.carriedInterestOrPromoteFee,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
];

export const FUND_FUND_SM_KPI: ProjectInput[] = [...FUND_FUND_PM_KPI];

export const FUND_FUND_SM_INVESTMENT_INFO: ProjectInput[] = [
  ...FUND_FUND_PM_INVESTMENT_INFO,
];

export const FUND_FUND_SM_DOCUMENTS: ProjectInput[] = [
  ...FUND_FUND_PM_DOCUMENTS,
].filter((el) => el.value !== FUND_DOCUMENTS_INPUTS.subscriptionContract);

// DEBT INSTRUMENT > ART PROJECT > PRIMARY MARKET

export const DEBT_ART_PM_GENERAL_INFO: ProjectInput[] = [
  {
    name: 'Project Name',
    value: GENERAL_INFO_INPUTS.ProjectName,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Project Description',
    value: GENERAL_INFO_INPUTS.ProjectDescription,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Issuer',
    value: GENERAL_INFO_INPUTS.Issuer,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Company Name',
    value: GENERAL_INFO_INPUTS.CompanyName,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Issuer’s bank',
    value: GENERAL_INFO_INPUTS.IssuerBank,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Issuer’s bank email',
    value: GENERAL_INFO_INPUTS.IssuerBankEmail,
    props: { type: 'email', required: true },
  },
];

export const DEBT_ART_PM_ASSET_INFO: ProjectInput[] = [
  {
    name: 'Estimated market value',
    value: ASSET_INFO_INPUTS.EstimatedMarketValue,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.assetInfo}.${ASSET_INFO_INPUTS.EstimatedMarketValueCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Estimated market value Currency',
    value: ASSET_INFO_INPUTS.EstimatedMarketValueCurrency,
    props: { type: null },
  },
  {
    name: 'Asset location',
    value: ASSET_INFO_INPUTS.AssetLocation,
    props: { type: INPUTS_TYPES.Text, required: false },
  },
  {
    name: 'Miscellaneous',
    value: ASSET_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
];

export const DEBT_ART_PM_KPI: ProjectInput[] = [
  {
    name: 'Loan to value ratio (LTV)',
    value: KPI_INPUTS.LoanToValueRatio,
    props: {
      type: INPUTS_TYPES.Number,
      helperTitle: 'Company',
      required: false,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
];

export const DEBT_ART_PM_INVESTMENT_INFO: ProjectInput[] = [
  {
    name: 'Issuer jurisdiction',
    value: INVESTMENT_INFO_INPUTS.IssuerJurisdiction,
    props: {
      type: INPUTS_TYPES.Country,
      required: true,
    },
  },
  {
    name: 'Structurer/Arranger',
    value: INVESTMENT_INFO_INPUTS.StructureOrArranger,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Paying and settlement agent',
    value: INVESTMENT_INFO_INPUTS.PayingAndSettlementAgent,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    name: 'Eligible investors', // not in fieldnames
    value: INVESTMENT_INFO_INPUTS.EligibleInvestors,
    props: {
      type: INPUTS_TYPES.Text,
    },
  },
  {
    name: 'Issue date',
    value: INVESTMENT_INFO_INPUTS.IssueDate,
    props: {
      type: INPUTS_TYPES.Date,
      required: true,
    },
  },
  {
    name: 'Denomination (Face value per unit)',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnit,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency}`,
      subInputLabel: 'Currency',
      helperText: 'This field will not be editable after approval',
      dependencies: [
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      ],
    },
  },
  {
    name: 'Denomination (Face value per unit) currency',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency,
    props: { type: null },
  },
  {
    name: 'Interest p.a',
    value: INVESTMENT_INFO_INPUTS.InterestPerAnnum,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
      placeholder: 'e.g. + 5.20% per annum',
    },
  },
  {
    name: 'Interest payment periodicity',
    value: INVESTMENT_INFO_INPUTS.PaymentPeriodicity,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'months',
      subValue: 'months',
    },
  },
  {
    name: 'Interest payment periodicity Time',
    value: INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime,
    props: { type: null },
  },
  {
    name: 'Maturity',
    value: INVESTMENT_INFO_INPUTS.Maturity,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.MaturityTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'months',
      subValue: 'months',
    },
  },
  {
    name: 'Maturity Time',
    value: INVESTMENT_INFO_INPUTS.MaturityTime,
    props: { type: null },
  },
  {
    name: 'Early redemption date',
    value: INVESTMENT_INFO_INPUTS.EarlyRedemptionDate,
    props: {
      type: INPUTS_TYPES.Date,
      inputProps: { min: DateTime.now().toFormat('yyyy-MM-dd') },
    },
  },
  {
    name: 'Fundraising period In days',
    value: INVESTMENT_INFO_INPUTS.FundraisingPeriodInDays,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.fundraisingTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'days',
      subValue: 'days',
      helperTitle: 'Funding info',
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising Time',
    value: INVESTMENT_INFO_INPUTS.fundraisingTime,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Soft cap)',
    value: INVESTMENT_INFO_INPUTS.SoftCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
      subDisabled: true,
      subInputLabel: ' ',
    },
  },
  {
    name: 'Fundraising size (Soft cap) Currency',
    value: INVESTMENT_INFO_INPUTS.SoftCapCurrency,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Hard cap)',
    value: INVESTMENT_INFO_INPUTS.HardCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      subInputLabel: ' ',
      subDisabled: true,
    },
  },
  {
    name: 'Fundraising size (Hard cap) Currency',
    value: INVESTMENT_INFO_INPUTS.HardCapCurrency,
    props: { type: null },
  },

  {
    name: 'Minimum number of investment units',
    value: INVESTMENT_INFO_INPUTS.MinimumNumberOfUnit,
    props: {
      type: INPUTS_TYPES.Number,
      required: true,
    },
  },
  {
    name: 'Miscellaneous',
    value: INVESTMENT_INFO_INPUTS.Miscellaneous,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Transfer to secondary market',
    value: INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Checkbox,
    },
  },
];

export const DEBT_ART_PM_DOCUMENTS: ProjectInput[] = [
  {
    name: 'Image of the project',
    value: PROJECT_DOCUMENTS.projectPicture,
    props: { type: INPUTS_TYPES.File, accept: ['image/*'], required: true },
  },
  {
    name: 'Teaser',
    value: PROJECT_DOCUMENTS.teaserInformationMemorandum,
    props: { type: INPUTS_TYPES.File, accept: ['image/*', 'application/pdf'] },
  },
  {
    name: 'Summary business deck',
    value: PROJECT_DOCUMENTS.summaryBusinessDeck,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial statements available',
    value: PROJECT_DOCUMENTS.financialStatementAvailable,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Valuation report from expert',
    value: ART_DOCUMENTS.valuationFromExpert,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial projections (Business plan)',
    value: PROJECT_DOCUMENTS.financialProjections,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: "Project Holders' track records Resumes",
    value: PROJECT_DOCUMENTS.trackRecordsResumes,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other Project Documentation',
    value: PROJECT_DOCUMENTS.otherProjectDocumentation,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Certificate of incorporation of the SPV',
    value: PROJECT_DOCUMENTS.certificateOfIncorporation,
    props: { type: INPUTS_TYPES.File, helperTitle: 'Legal' },
  },
  {
    name: 'SPV by-laws',
    value: PROJECT_DOCUMENTS.byLaws,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'SPV shareholder agreements',
    value: PROJECT_DOCUMENTS.shareHolderAgreement,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'List of KYC documents required for suscribing investor',
    value: PROJECT_DOCUMENTS.kycDocumentsRequired,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (1)',
    value: PROJECT_DOCUMENTS.otherLegalDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (2)',
    value: PROJECT_DOCUMENTS.otherLegalDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (3)',
    value: PROJECT_DOCUMENTS.otherLegalDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Project term sheet',
    value: PROJECT_DOCUMENTS.termSheet,
    props: {
      type: INPUTS_TYPES.File,
      required: true,
      helperTitle: 'Financial',
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Subscription contract',
    value: PROJECT_DOCUMENTS.subscriptionContract,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (1)',
    value: PROJECT_DOCUMENTS.otherDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (2)',
    value: PROJECT_DOCUMENTS.otherDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (3)',
    value: PROJECT_DOCUMENTS.otherDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
];

// DEBT INSTRUMENT > ART PROJECT > SECONDARY MARKET

export const DEBT_ART_SM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_RE_SM_GENERAL_INFO,
];

export const DEBT_ART_SM_ASSET_INFO: ProjectInput[] = [
  ...DEBT_ART_PM_ASSET_INFO,
];

export const DEBT_ART_SM_KPI: ProjectInput[] = [...DEBT_ART_PM_KPI];

export const DEBT_ART_SM_INVESTMENT_INFO: ProjectInput[] = [
  ...DEBT_RE_SM_INVESTMENT_INFO,
];

export const DEBT_ART_SM_DOCUMENTS: ProjectInput[] = [
  ...DEBT_ART_PM_DOCUMENTS,
].filter(
  (el) =>
    el.value !== PROJECT_DOCUMENTS.kycDocumentsRequired &&
    el.value !== PROJECT_DOCUMENTS.subscriptionContract
);

// DEBT INSTRUMENT / INFRASTRUCTURE & COMMODITIES / PRIMARY

export const DEBT_INFRASTRUCTURE_PM_GENERAL_INFO: ProjectInput[] = [
  {
    name: 'Project Name',
    value: GENERAL_INFO_INPUTS.ProjectName,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Project Description',
    value: GENERAL_INFO_INPUTS.ProjectDescription,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Issuer',
    value: GENERAL_INFO_INPUTS.Issuer,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Company Name',
    value: GENERAL_INFO_INPUTS.CompanyName,
    props: { type: INPUTS_TYPES.Text },
  },
  {
    name: 'Issuer’s bank',
    value: GENERAL_INFO_INPUTS.IssuerBank,
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    name: 'Issuer’s bank email',
    value: GENERAL_INFO_INPUTS.IssuerBankEmail,
    props: { type: 'email', required: true },
  },
];

export const DEBT_INFRASTRUCTURE_PM_ASSET_INFO: ProjectInput[] = [
  {
    name: 'Asset Description',
    value: ASSET_INFO_INPUTS.AssetDescription,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Estimated market value of underlying asset',
    value: ASSET_INFO_INPUTS.EstimatedMarketValue,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.assetInfo}.${ASSET_INFO_INPUTS.EstimatedMarketValueCurrency}`,
      subInputLabel: 'Currency',
    },
  },
  {
    name: 'Estimated market value Currency',
    value: ASSET_INFO_INPUTS.EstimatedMarketValueCurrency,
    props: { type: null },
  },
  {
    name: 'Asset location',
    value: ASSET_INFO_INPUTS.AssetLocation,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Miscellaneous',
    value: ASSET_INFO_INPUTS.Miscellaneous,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
];

export const DEBT_INFRASTRUCTURE_PM_KPI: ProjectInput[] = [
  {
    name: 'Loan to value ratio (LTV)',
    value: KPI_INPUTS.LoanToValueRatio,
    props: {
      type: INPUTS_TYPES.Number,
      required: false,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
];

export const DEBT_INFRASTRUCTURE_PM_INVESTMENT_INFO: ProjectInput[] = [
  {
    name: 'Issuer jurisdiction',
    value: INVESTMENT_INFO_INPUTS.IssuerJurisdiction,
    props: {
      type: INPUTS_TYPES.Country,
      required: true,
    },
  },
  {
    name: 'Structurer/Arranger',
    value: INVESTMENT_INFO_INPUTS.StructureOrArranger,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Paying and settlement agent',
    value: INVESTMENT_INFO_INPUTS.PayingAndSettlementAgent,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Eligible investors',
    value: INVESTMENT_INFO_INPUTS.EligibleInvestors,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Issue date',
    value: INVESTMENT_INFO_INPUTS.IssueDate,
    props: {
      type: INPUTS_TYPES.Date,
      required: true,
    },
  },
  {
    name: 'Denomination (Face value per unit)',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnit,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency}`,
      subInputLabel: 'Currency',
      helperText: 'This field will not be editable after approval',
      dependencies: [
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
        `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      ],
    },
  },
  {
    name: 'Denomination (Face value per unit) currency',
    value: INVESTMENT_INFO_INPUTS.FaceValuePerUnitCurrency,
    props: { type: null },
  },
  {
    name: 'Interest p.a',
    value: INVESTMENT_INFO_INPUTS.InterestPerAnnum,
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
      placeholder: 'e.g. + 5.20% per annum',
    },
  },
  {
    name: 'Interest payment periodicity',
    value: INVESTMENT_INFO_INPUTS.PaymentPeriodicity,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'months',
      subValue: 'months',
    },
  },
  {
    name: 'Interest payment periodicity Time',
    value: INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime,
    props: { type: null },
  },
  {
    name: 'Maturity',
    value: INVESTMENT_INFO_INPUTS.Maturity,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.MaturityTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'months',
      subValue: 'months',
    },
  },
  {
    name: 'Maturity Time',
    value: INVESTMENT_INFO_INPUTS.MaturityTime,
    props: { type: null },
  },
  {
    name: 'Early redemption date',
    value: INVESTMENT_INFO_INPUTS.EarlyRedemptionDate,
    props: {
      type: INPUTS_TYPES.Date,
      inputProps: { min: DateTime.now().toFormat('yyyy-MM-dd') },
    },
  },
  {
    name: 'Fundraising period In days',
    value: INVESTMENT_INFO_INPUTS.FundraisingPeriodInDays,
    props: {
      type: INPUTS_TYPES.PeriodicityTime,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.fundraisingTime}`,
      subInputLabel: 'Time',
      defaultSubValue: 'days',
      subValue: 'days',
      helperTitle: 'Funding info',
      helperText: 'This field will only be increasable after approval',
    },
  },
  {
    name: 'Fundraising Time',
    value: INVESTMENT_INFO_INPUTS.fundraisingTime,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Soft cap)',
    value: INVESTMENT_INFO_INPUTS.SoftCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.SoftCapCurrency}`,
      subDisabled: true,
      subInputLabel: ' ',
    },
  },
  {
    name: 'Fundraising size (Soft cap) Currency',
    value: INVESTMENT_INFO_INPUTS.SoftCapCurrency,
    props: { type: null },
  },
  {
    name: 'Fundraising size (Hard cap)',
    value: INVESTMENT_INFO_INPUTS.HardCap,
    props: {
      type: INPUTS_TYPES.Currency,
      required: true,
      subInputName: `${ProjectInputGroup.investmentInfo}.${INVESTMENT_INFO_INPUTS.HardCapCurrency}`,
      subInputLabel: ' ',
      subDisabled: true,
    },
  },
  {
    name: 'Fundraising size (Hard cap) Currency',
    value: INVESTMENT_INFO_INPUTS.HardCapCurrency,
    props: { type: null },
  },

  {
    name: 'Minimum number of investment units',
    value: INVESTMENT_INFO_INPUTS.MinimumNumberOfUnit,
    props: {
      type: INPUTS_TYPES.Number,
      required: true,
    },
  },
  {
    name: 'Miscellaneous',
    value: INVESTMENT_INFO_INPUTS.Miscellaneous,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Transfer to secondary market',
    value: INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Checkbox,
      helperText:
        'If yes, the deal will be displayed in the Secondary Market section after the fundraising period ends, otherwise it will be delisted',
    },
  },
];

export const DEBT_INFRASTRUCTURE_PM_DOCUMENTS: ProjectInput[] = [
  {
    name: 'Image of the project',
    value: PROJECT_DOCUMENTS.projectPicture,
    props: { type: INPUTS_TYPES.File, accept: ['image/*'], required: true },
  },
  {
    name: 'Teaser',
    value: PROJECT_DOCUMENTS.teaserInformationMemorandum,
    props: { type: INPUTS_TYPES.File, accept: ['image/*', 'application/pdf'] },
  },
  {
    name: 'Summary business deck',
    value: PROJECT_DOCUMENTS.summaryBusinessDeck,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial statements available',
    value: PROJECT_DOCUMENTS.financialStatementAvailable,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Valuation report from expert',
    value: ART_DOCUMENTS.valuationFromExpert,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Financial projections (Business plan)',
    value: PROJECT_DOCUMENTS.financialProjections,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: "Project Holders' track records Resumes",
    value: PROJECT_DOCUMENTS.trackRecordsResumes,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other Project Documentation',
    value: PROJECT_DOCUMENTS.otherProjectDocumentation,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Certificate of incorporation of the SPV',
    value: PROJECT_DOCUMENTS.certificateOfIncorporation,
    props: { type: INPUTS_TYPES.File, helperTitle: 'Legal' },
  },
  {
    name: 'SPV by-laws',
    value: PROJECT_DOCUMENTS.byLaws,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'SPV shareholder agreements',
    value: PROJECT_DOCUMENTS.shareHolderAgreement,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'List of KYC documents required for suscribing investor',
    value: PROJECT_DOCUMENTS.kycDocumentsRequired,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (1)',
    value: PROJECT_DOCUMENTS.otherLegalDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (2)',
    value: PROJECT_DOCUMENTS.otherLegalDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other legal document (3)',
    value: PROJECT_DOCUMENTS.otherLegalDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Project term sheet',
    value: PROJECT_DOCUMENTS.termSheet,
    props: {
      type: INPUTS_TYPES.File,
      required: true,
      helperTitle: 'Financial',
      accept: ['image/*', 'application/pdf'],
    },
  },
  {
    name: 'Subscription contract',
    value: PROJECT_DOCUMENTS.subscriptionContract,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (1)',
    value: PROJECT_DOCUMENTS.otherDocument1,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (2)',
    value: PROJECT_DOCUMENTS.otherDocument2,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
  {
    name: 'Other relevant document (3)',
    value: PROJECT_DOCUMENTS.otherDocument3,
    props: {
      type: INPUTS_TYPES.File,
      accept: ['image/*', 'application/pdf', 'application/*'],
    },
  },
];

// DEBT INSTRUMENT / INFRASTRUCTURE & COMMODITIES / SECONDARY

export const DEBT_INFRASTRUCTURE_SM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_RE_SM_GENERAL_INFO,
];

export const DEBT_INFRASTRUCTURE_SM_ASSET_INFO: ProjectInput[] = [
  ...DEBT_INFRASTRUCTURE_PM_ASSET_INFO,
];

export const DEBT_INFRASTRUCTURE_SM_KPI: ProjectInput[] = [
  ...DEBT_INFRASTRUCTURE_PM_KPI,
];

export const DEBT_INFRASTRUCTURE_SM_INVESTMENT_INFO: ProjectInput[] = [
  ...DEBT_INFRASTRUCTURE_PM_INVESTMENT_INFO,
]
  .filter((el) => {
    if (
      [
        INVESTMENT_INFO_INPUTS.SoftCap,
        INVESTMENT_INFO_INPUTS.SoftCapCurrency,
        INVESTMENT_INFO_INPUTS.HardCap,
        INVESTMENT_INFO_INPUTS.HardCapCurrency,
        INVESTMENT_INFO_INPUTS.MinimumNumberOfUnit,
        INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
        INVESTMENT_INFO_INPUTS.FundraisingPeriodInDays,
        INVESTMENT_INFO_INPUTS.fundraisingTime,
      ].includes(el.value as INVESTMENT_INFO_INPUTS)
    ) {
      return false;
    }
    return true;
  })
  .concat(SECONDARY_MARKET_SPECIFIC_IPUTS);

export const DEBT_INFRASTRUCTURE_SM_DOCUMENTS: ProjectInput[] = [
  ...DEBT_ART_PM_DOCUMENTS,
].filter(
  (el) =>
    el.value !== PROJECT_DOCUMENTS.kycDocumentsRequired &&
    el.value !== PROJECT_DOCUMENTS.subscriptionContract
);

// EQUITY INSTRUMENT / iNFRASTRUCTURE & COMMODITIES / PRIMARY MARKET

export const EQUITY_INFRASTRUCTURE_PM_GENERAL_INFO: ProjectInput[] = [
  ...DEBT_INFRASTRUCTURE_PM_GENERAL_INFO,
];

export const EQUITY_INFRASTRUCTURE_PM_ASSET_INFO: ProjectInput[] = [
  ...DEBT_INFRASTRUCTURE_PM_ASSET_INFO,
];

export const EQUITY_INFRASTRUCTURE_PM_KPI: ProjectInput[] = [
  {
    name: 'Loan to value ratio (LTV)',
    value: KPI_INPUTS.LoanToValueRatio,
    props: {
      type: INPUTS_TYPES.Number,
      required: false,
      decorator: '%',
      decoratorPosition: 'start',
    },
  },
];

export const EQUITY_INFRASTRUCTURE_PM_INVESTMENT_INFO: ProjectInput[] = [
  ...DEBT_INFRASTRUCTURE_SM_INVESTMENT_INFO.filter((el) => {
    if (
      [
        INVESTMENT_INFO_INPUTS.EarlyRedemptionDate,
        INVESTMENT_INFO_INPUTS.InterestPerAnnum,
        INVESTMENT_INFO_INPUTS.Maturity,
        INVESTMENT_INFO_INPUTS.MaturityTime,
        INVESTMENT_INFO_INPUTS.PaymentPeriodicity,
        INVESTMENT_INFO_INPUTS.PaymentPeriodicityTime,
        INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
      ].includes(el.value as INVESTMENT_INFO_INPUTS)
    ) {
      return false;
    }
    return true;
  }),
  {
    name: 'Dividend and exit strategy',
    value: INVESTMENT_INFO_INPUTS.DividendAndExitStrategy,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    name: 'Expected Multiple of Investment Capital',
    value: INVESTMENT_INFO_INPUTS.ExpectedMultipleOfInvestmentCapital,
    props: {
      type: INPUTS_TYPES.TextArea,
      required: false,
      multiline: true,
      rows: 1,
    },
  },
  {
    name: 'Expected IRR',
    value: INVESTMENT_INFO_INPUTS.ExpectedReturnPerAnnum,
    props: { type: INPUTS_TYPES.Text, placeholder: 'From __ % to __ %' },
  },
  {
    name: 'Transfer to secondary market',
    value: INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
    props: {
      type: INPUTS_TYPES.Checkbox,
    },
  },
];

export const EQUITY_INFRASTRUCTURE_PM_DOCUMENTS: ProjectInput[] = [
  ...DEBT_RE_PM_DOCUMENTS,
];

// EQUITY INSTRUMENT / iNFRASTRUCTURE & COMMODITIES / SECONDARY MARKET

export const EQUITY_INFRASTRUCTURE_SM_GENERAL_INFO: ProjectInput[] = [
  ...EQUITY_RE_SM_GENERAL_INFO,
];

export const EQUITY_INFRASTRUCTURE_SM_ASSET_INFO: ProjectInput[] = [
  ...EQUITY_INFRASTRUCTURE_PM_ASSET_INFO,
];

export const EQUITY_INFRASTRUCTURE_SM_KPI: ProjectInput[] = [
  ...EQUITY_INFRASTRUCTURE_PM_KPI,
];

export const EQUITY_INFRASTRUCTURE_SM_INVESTMENT_INFO: ProjectInput[] = [
  ...EQUITY_INFRASTRUCTURE_PM_INVESTMENT_INFO,
].filter((el) => {
  if (
    [
      INVESTMENT_INFO_INPUTS.SoftCap,
      INVESTMENT_INFO_INPUTS.SoftCapCurrency,
      INVESTMENT_INFO_INPUTS.HardCap,
      INVESTMENT_INFO_INPUTS.HardCapCurrency,
      INVESTMENT_INFO_INPUTS.MinimumNumberOfUnit,
      INVESTMENT_INFO_INPUTS.IsTransferToSecondaryMarket,
      INVESTMENT_INFO_INPUTS.FundraisingPeriodInDays,
      INVESTMENT_INFO_INPUTS.fundraisingTime,
    ].includes(el.value as INVESTMENT_INFO_INPUTS)
  ) {
    return false;
  }
  return true;
});
// .concat(SECONDARY_MARKET_SPECIFIC_IPUTS);

export const EQUITY_INFRASTRUCTURE_SM_DOCUMENTS: ProjectInput[] = [
  ...EQUITY_RE_SM_DOCUMENTS,
].filter(
  (el) =>
    el.value !== PROJECT_DOCUMENTS.kycDocumentsRequired &&
    el.value !== PROJECT_DOCUMENTS.subscriptionContract
);

export const FUNDS_CUSTOM_FIELDS = {
  [FUND_KPI_INPUTS.liquidity]: true,
  [FUND_KPI_INPUTS.assetsUnderManagement]: true,
  [FUND_KPI_INPUTS.netAssetValue]: true,
  [FUND_INVESTMENT_INFO_INPUTS.targetVolatility]: true,
  [FUND_INVESTMENT_INFO_INPUTS.minimumInvestmentSize]: true,
  [FUND_INVESTMENT_INFO_INPUTS.incrementalInvestmentSize]: true,
} as const;

export const addStepPrefix = (step: ProjectInputGroup, str: string): string => {
  return `${step}.${str}`;
};
