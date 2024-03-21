import { showFormattedNames } from '../client/utils';
import {
  InvestmentGroup,
  InvestmentType,
  ProjectListingMarketType,
  ProjectListingType,
} from './listingConfig';

export enum INPUTS_TYPES {
  Checkbox = 'checkbox',
  Currency = 'currency',
  PeriodicityTime = 'periodicityTime',
  Select = 'select',
  Text = 'text',
  Date = 'date',
  Phone = 'phone',
  Number = 'number',
  Country = 'country',
  File = 'file',
  Email = 'email',
  Dual = 'dual',
  TextArea = 'textarea',
  Multiselect = 'multiselect',
  Switch = 'switch',
}

export const CURRENCY = [
  { name: 'USD', value: 'USD' },
  { name: 'EUR', value: 'EUR' },
  { name: 'CHF', value: 'CHF' },
  { name: 'GBP', value: 'GBP' },
];

export const PROJECT_STATUS = [
  { value: 'OPEN', name: 'Open' },
  { value: 'CLOSED', name: 'Closed' },
  { value: 'LISTED', name: 'Listed' },
  { value: 'DRAFT', name: 'Draft' },
  { value: 'PENDING', name: 'Pending' },
  { value: 'DUPLICATED', name: 'Duplicated' },
  { value: 'DE_LIST', name: 'DeList' },
  { value: 'REJECTED', name: 'Rejected' },
  { value: 'TERMINATED', name: 'Terminated' },
  { value: 'APPROVED', name: 'Approved' },
  { value: 'WITHDRAW', name: 'Withdraw' },
];

export const MARKET_TYPE: SelectOption[] = [
  { value: ProjectListingMarketType.PRIMARY, label: 'Primary' },
  { value: ProjectListingMarketType.SECONDARY, label: 'Secondary' },
];
export const LISTING_TYPE: SelectOption[] = [
  {
    value: ProjectListingType.REAL_ESTATE,
    label: showFormattedNames(ProjectListingType.REAL_ESTATE),
  },
  {
    value: ProjectListingType.PRIVATE_EQUITY,
    label: showFormattedNames(ProjectListingType.PRIVATE_EQUITY),
  },
  {
    value: ProjectListingType.INFRASTRUCTURE,
    label: showFormattedNames(ProjectListingType.INFRASTRUCTURE),
  },
  {
    value: ProjectListingType.ART,
    label: showFormattedNames(ProjectListingType.ART),
  },
  {
    value: ProjectListingType.COMMODITIES,
    label: showFormattedNames(ProjectListingType.COMMODITIES),
  },
  {
    value: ProjectListingType.OTHER,
    label: showFormattedNames(ProjectListingType.OTHER),
    disabled: true,
  },
  {
    value: ProjectListingType.HEDGE_FUND,
    label: showFormattedNames(ProjectListingType.HEDGE_FUND),
  },
  {
    value: ProjectListingType.DEDICATED_FUND,
    label: showFormattedNames(ProjectListingType.DEDICATED_FUND),
  },
];

export const INVESTMENT_TYPE: SelectOption[] = [
  { value: InvestmentType.DEBT, label: 'Debt' },
  { value: InvestmentType.EQUITY, label: 'Equity' },
  { value: InvestmentType.FUND, label: 'Fund' },
  { value: InvestmentType.LOAN, label: 'Loan', disabled: true },
];

export const INVESTMENT_GROUP: SelectOption[] = [
  {
    value: InvestmentGroup.COLLECTIVE_INVESTMENT,
    label: showFormattedNames(InvestmentGroup.COLLECTIVE_INVESTMENT),
  },
  {
    value: InvestmentGroup.DIRECT_INVESTMENT,
    label: showFormattedNames(InvestmentGroup.DIRECT_INVESTMENT),
  },
];
export const COUNTRY_LIST = [];

export const GUARANTEE_TYPES = [
  { name: '', value: '' },
  { name: 'Financial Institution', value: 'Financial Institution' },
  { name: 'Asset Mortgage', value: 'Asset Mortgage' },
  {
    name: 'Pledge on the shares of the SPV',
    value: 'Pledge on the shares of the SPV',
  },
  { name: 'Personal', value: 'Personal' },
  { name: 'Corporate', value: 'Corporate' },
];

export const GUARANTEE_TYPES_ART = GUARANTEE_TYPES.filter(
  ({ name }) => name !== 'Asset Mortgage'
).concat([
  { name: 'Pledge on the artwork asset', value: 'Pledge on the artwork asset' },
]);

export const GUARNATEE_RANK = [
  { name: '', value: '' },
  { name: 'Rank 1', value: 'Rank 1' },
  { name: 'Rank 2 or above', value: 'Rank 2 or above' },
];

export const PERIODICITY_TYME = [
  { value: 'days', name: 'days' },
  { value: 'months', name: 'months' },
  { value: 'years', name: 'years' },
];

export const fixedOptionsMapping = {
  projectListingMarketType: MARKET_TYPE,
  projectListingType: LISTING_TYPE,
  investmentType: INVESTMENT_TYPE,
  status: PROJECT_STATUS,
  projectDefaultCurrency: CURRENCY,
  softCapCurrency: CURRENCY,
  hardCapCurrency: CURRENCY,
  faceValuePerUnitCurrency: CURRENCY,
  issuerJurisdiction: COUNTRY_LIST,
  country: COUNTRY_LIST,
  guaranteeType: GUARANTEE_TYPES,
  guaranteeRank: GUARNATEE_RANK,
  weightedAverageTime: PERIODICITY_TYME,
  paymentPeriodicityTime: PERIODICITY_TYME,
  maturityTime: PERIODICITY_TYME,
};

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
