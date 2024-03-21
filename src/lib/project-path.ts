import {
  InvestmentGroup,
  InvestmentType,
  ProjectListingMarketType,
  ProjectListingType,
} from '@/types/projects';
import {
  PROJECTS_MAPPING,
  ProjectMappingReturn,
} from './projects/inputsMapping';

export const getProjectPath = (
  investmentGroup: InvestmentGroup,
  investmentType: InvestmentType,
  listingType: ProjectListingType,
  marketType: ProjectListingMarketType
): ProjectMappingReturn | undefined =>
  // @ts-expect-error wontfix
  PROJECTS_MAPPING?.[investmentGroup]?.[investmentType]?.[listingType]?.[
    marketType
  ];
