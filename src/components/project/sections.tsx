import PreviewIcon from '@mui/icons-material/Preview';
import {
  InvestmentType,
  MasterProject,
  PictureVariants,
  ProjectInputGroup,
  ProjectListingMarketType,
} from '@/types/projects';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  SxProps,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ForwardedRef,
  MouseEvent,
  ReactElement,
  ReactNode,
  forwardRef,
} from 'react';
import { Paragraph, Title as TitleParagraph } from '../ui/typography';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import {
  formatNumToIntlString,
  getProjectType,
  percentCalculator,
  showFormattedNames,
} from '@/lib/client/utils';
import { PercentBar } from './percent-bar';
import { useMediaQuery, useToggle } from '@/lib/client/hooks';
import { getProjectPath } from '@/lib/project-path';
import { getProjectJsonFieldsAsArray } from '@/lib/projects';
import { Briefcase, BusinessPlan, ChartBar, FileIcon, Mail } from '../icons';
import { ProjectMappingReturn } from '@/lib/projects/inputsMapping';
import {
  FUND_INVESTMENT_INFO_INPUTS,
  FUND_STRATEGY_INPUTS,
} from '@/lib/projects/listingConfig';
import { DateTime } from 'luxon';
import InvestComponent from './invest';

export const selectTime = ['years'];
export const maturityTime = 'months';
export const paymentPeriodicityTime = 'months';
export const fundraisingTime = 'days';
export const companyAgeTime = 'years';

export interface ProjectDetailsActionsSectionProps {
  project: MasterProject;
  details: MasterProject['fundProject'];
  handleViewDocument: (doc: string | null) => void;
}

export const ProjectDetailsActionsSection = (
  props: ProjectDetailsActionsSectionProps
) => {
  const isMobile = useMediaQuery('sm');
  return (
    <>
      <OverviewProject {...props} />
      {isMobile ? null : <InvestComponent {...props} />}
    </>
  );
};

const OverviewProject: React.FC<ProjectDetailsActionsSectionProps> = ({
  project,
  handleViewDocument,
}) => {
  const isPrimaryMarket =
    project?.projectListingMarketType === ProjectListingMarketType.PRIMARY;
  const shouldBlur = false;

  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: '2',
        borderRadius: '10px',
        padding: '2rem',
      }}
    >
      <div>
        <Box sx={{ display: 'flex', mb: '1.5rem', flexDirection: 'column' }}>
          <TitleParagraph sx={{ color: 'primary.main' }}>
            Overview
          </TitleParagraph>
          <Divider />
        </Box>

        <Row
          title={'Expected IRR'}
          value={project?.fundProject?.expectedIRR}
          render={!!project?.fundProject?.expectedIRR}
        />

        <div className='mt-2'>
          <Row
            render={!!(isPrimaryMarket && project?.hardCap)}
            title={' '}
            value={`${formatNumToIntlString({
              value: project && percentCalculator(project),
            })} % filled`}
          />
          {isPrimaryMarket && project?.hardCap && (
            <Box sx={{ width: '100%', mt: 0.25 }}>
              <PercentBar
                caption={'Hard Cap'}
                value={project && percentCalculator(project)}
                textValue={formatNumToIntlString({
                  value: project?.hardCap,
                  currency: project?.defaultCurrency,
                })}
              />
            </Box>
          )}
        </div>
      </div>
      <Divider sx={{ my: '1rem' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Row
          title='Investment type'
          value={`${showFormattedNames(project?.investmentGroup)}`}
          render={!!project?.investmentGroup}
        />

        <Row
          title='Financial instrument'
          value={getProjectType(project?.investmentType)}
          render={!!project?.investmentType}
        />
        <Row
          title='Asset class'
          value={showFormattedNames(project?.projectListingType)}
          render={
            !!(
              project?.projectListingType &&
              project?.projectListingType !== 'FUNDING_PROJECT'
            )
          }
        />
        <Row
          title='Distribution'
          value={`${showFormattedNames(project?.projectListingMarketType)}`}
          render={!!project?.projectListingMarketType}
        />
        <Row
          title='Ends in'
          value={`${project?.fundRaisingExpireInDays} days`}
          render={project?.fundRaisingExpireInDays > 0}
          blurred={shouldBlur}
        />
        <Row
          title='Min. Investment'
          value={formatNumToIntlString({
            value: project?.minimumInvestmentValue,
            currency: project?.defaultCurrency,
          })}
          render={!!(isPrimaryMarket && project?.minimumInvestmentValue)}
          blurred={shouldBlur}
        />
      </Box>
      <a rel='noopener noreferrer'>
        <Button
          variant='contained'
          sx={{ width: '100%', mt: '1rem' }}
          onClick={() =>
            handleViewDocument(
              project.projectSupportingDocument.summaryBusinessDeck
            )
          }
        >
          View Deck
        </Button>
      </a>
      {/* </CustomTooltip> */}
    </Card>
  );
};

const Row = ({
  value = undefined,
  render = true,
  title,
  blurred = false,
}: {
  value?: string | null;
  title: string;
  render?: boolean;
  blurred?: boolean;
}) => {
  return render ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&>*': { flex: 1 },
      }}
    >
      <Paragraph variant='subtitle1'>{title}</Paragraph>
      {value && (
        <Tooltip title={blurred ? 'Login to view more' : ''}>
          <Paragraph
            variant='subtitle2'
            sx={{
              color: 'text.primary',
              fontSize: '13px',
              textAlign: 'right',
              ...(blurred && { filter: 'blur(4px)', cursor: 'default' }),
            }}
          >
            {value}
          </Paragraph>
        </Tooltip>
      )}
    </Box>
  ) : null;
};

interface SectionContainerProps {
  children: string | ReactNode;
  title?: string | ReactNode;
  open?: boolean;
  sx?: SxProps;
  blurreable?: boolean;
}

type SectionProps = {
  project: MasterProject;
  details?: MasterProject['fundProject'];
  onViewDocument?: (doc: string | null) => void;
};

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  title,
  blurreable = false,
  sx = {},
  open = false,
}) => {
  const { on: show, toggle } = useToggle({ initialState: open });
  const shouldBlur = blurreable;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggle();
  };

  const DefaultActions = () => (
    <IconButton>
      <ArrowForwardIosOutlinedIcon color='primary' />
    </IconButton>
  );

  return (
    <Accordion defaultExpanded={open}>
      <AccordionSummary onClick={handleClick}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {' '}
          {title}{' '}
          <div>
            <DefaultActions />
          </div>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ ...sx }}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
};

const Title = ({
  title,
  icon,
  render = true,
}: {
  title: string;
  icon?: ReactElement;
  render?: boolean;
}) => {
  return render ? (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        '& > *': {
          color: 'primary.main',
          stroke: 'primary.main',
        },
      }}
    >
      {icon}
      <Typography variant={'subtitle1'} sx={{ color: 'primary.main' }}>
        {title}
      </Typography>
    </Box>
  ) : null;
};

export const GeneralInfo = ({ project }: SectionProps) => {
  const projectPath = getProjectPath(
    project.investmentGroup,
    project.investmentType,
    project.projectListingType,
    project.projectListingMarketType
  );
  const isFund = true;
  const customFields = getProjectJsonFieldsAsArray(
    project,
    ProjectInputGroup.generalInfo
  );

  return (
    <SectionContainer
      open
      blurreable={false}
      title={
        <Title
          title={isFund ? 'DESCRIPTION OF THE FUND' : 'GENERAL INFO'}
          icon={<Briefcase width={22} height={22} stroke={'#178097'} />}
        />
      }
    >
      {projectPath?.generalInfo?.map(({ name: label, value }) => {
        // @ts-expect-error wontfix
        const fieldValue = project[value] ?? project?.['fundProject']?.[value];

        return (
          <FieldDescription
            key={value}
            blurreable={false}
            title={label}
            content={fieldValue}
            render={!!fieldValue}
          />
        );
      })}
      {customFields?.map(({ id, value }) => {
        return (
          <FieldDescription key={id} blurreable={false} render={!!value} />
        );
      })}
    </SectionContainer>
  );
};

export const FundingInfo = ({ project }: SectionProps) => {
  const isFundProject = project.fundingType === InvestmentType.FUND;
  const {
    fundraisingPeriodInDays,
    softCap,
    hardCap,
    minimumNumberOfUnit,
    defaultCurrency,
  } = project;

  if (isFundProject) return null;
  return softCap ||
    hardCap ||
    minimumNumberOfUnit ||
    fundraisingPeriodInDays ? (
    <SectionContainer
      title={
        <Title
          icon={<BusinessPlan width={22} height={22} stroke={'#178097'} />}
          title={'FUNDING INFO'}
        />
      }
    >
      <Field
        title={'Fundraising period'}
        render={!!fundraisingPeriodInDays}
        content={formatNumToIntlString({
          value: fundraisingPeriodInDays,
          suffix:
            fundraisingPeriodInDays > 1
              ? ` ${fundraisingTime}`
              : ` ${fundraisingTime.slice(0, -1)}`,
        })}
      />
      <Field
        title={'Fundraising size (Soft cap)'}
        render={!!softCap}
        content={formatNumToIntlString({
          value: softCap,
          currency: defaultCurrency,
        })}
      />
      <Field
        title={'Fundraising size (Hard cap)'}
        render={!!hardCap}
        content={formatNumToIntlString({
          value: hardCap,
          currency: defaultCurrency,
        })}
      />
      <Field
        title={'Min. number of investment units'}
        render={!!minimumNumberOfUnit}
        content={formatNumToIntlString(minimumNumberOfUnit)}
      />
    </SectionContainer>
  ) : null;
};

export const ContactInfo = ({ project }: SectionProps) => {
  const data = {
    contactName: project.contactName,
    phoneNumber: project.phoneNumber,
    email: project.email,
  };
  const sectionValidation = objectNotNullValidation(data);
  return sectionValidation ? (
    <SectionContainer
      title={
        <Title
          title={'CONTACT INFO'}
          icon={<Mail height={22} width={22} stroke={'#178097'} />}
        />
      }
    >
      <Field
        title={'Contact'}
        content={data.contactName}
        render={!!data.contactName}
      />
      <Field
        title={'Phone number'}
        content={data.phoneNumber}
        render={!!data.phoneNumber}
      />
      <Field title={'Email'} content={data.email} render={!!data.email} />
    </SectionContainer>
  ) : null;
};

export const Documents = ({ project, onViewDocument }: SectionProps) => {
  const documentName = documentLabelMapping;
  const { projectSupportingDocument } = project;

  const getDocTitle = (element: string) => {
    // @ts-expect-error wontfix
    const value = projectSupportingDocument[element];
    const fileName = value?.split('/').pop()?.split('.')[0];
    // keepFileName: keep original fileName if its not between our own list of files.
    if (fileName) {
      // @ts-expect-error wontfix
      if (!projectSupportingDocument[fileName]) {
        return fileName;
      }
    }
    // @ts-expect-error wontfix
    return documentName.label[element];
  };

  const DocumentLink = ({
    document,
    title = '',
  }: {
    document: string | PictureVariants;
    title?: string | ReactNode;
  }) => {
    if (!document) return null;
    if (typeof document !== 'string') {
      if ('projectPicture' in document) {
        document = document.projectPicture;
      }
    }

    return (
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          flex: 1,
          py: '.25rem',
          alignItems: 'center',
        }}
      >
        <Tooltip title={`Download ${title}`}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={(() => {
              const url = document?.split('/public/')[1] ?? document;
              return `${process.env.NEXT_PUBLIC_DOMAIN}/${url}`;
            })()}
            download
          >
            <IconButton
              sx={{
                boxShadow: 1,
                height: 30,
                width: 30,
                bgcolor: 'common.blackish',
                borderRadius: '4px',
                color: 'text.primary',
              }}
            >
              <PreviewIcon color={'inherit'} />
            </IconButton>
          </a>
        </Tooltip>

        <Tooltip title={`View ${title}`}>
          <IconButton
            sx={{
              boxShadow: 1,
              height: 30,
              width: 30,
              bgcolor: 'common.blackish',
              borderRadius: '4px',
              color: 'text.primary',
            }}
            onClick={() => {
              onViewDocument?.(document as string);
            }}
          >
            <PreviewIcon color={'inherit'} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  const Documents = ({
    documents,
  }: {
    documents: MasterProject['projectSupportingDocument'];
  }) => {
    return (
      <>
        {Object.keys(documents).map((element) =>
          // @ts-expect-error wontfix
          documents[element] && element !== 'projectPicture' ? (
            <Field
              key={element}
              title={getDocTitle(element)}
              content={
                <DocumentLink
                  // @ts-expect-error wontfix
                  document={documents[element]}
                  title={getDocTitle(element)}
                />
              }
            />
          ) : null
        )}
      </>
    );
  };

  const ViewMoreButton = () => {
    return (
      <Button type='button' variant={'contained'} color={'primary'}>
        View more information
      </Button>
    );
  };

  return objectNotNullValidation(projectSupportingDocument) ? (
    <SectionContainer
      blurreable={false}
      sx={{ display: 'flex', flexDirection: 'column' }}
      title={
        <Title
          title={'DOCUMENTS'}
          icon={<FileIcon width={22} height={22} stroke={'#178097'} />}
        />
      }
    >
      <Documents documents={projectSupportingDocument} />
    </SectionContainer>
  ) : null;
};

export const FundStrategy = ({ project, details }: SectionProps) => {
  const projectPath = getProjectPath(
    project.investmentGroup,
    project.investmentType,
    project.projectListingType,
    project.projectListingMarketType
  );

  const values = getSectionvalues(
    ProjectInputGroup.fundStrategy,
    project,
    projectPath
  );
  const customFields = getProjectJsonFieldsAsArray(
    project,
    ProjectInputGroup.fundStrategy
  );
  if (!values && !customFields?.length) {
    return null;
  }

  return (
    <SectionContainer
      title={
        <Title
          icon={<BusinessPlan width={22} height={22} stroke={'#178097'} />}
          title={'FUND STRATEGY'}
        />
      }
    >
      <>
        {projectPath?.fundStrategy?.map(({ name: label, value, props }) => {
          const { type } = props || {};
          if (type === null) return null;
          // @ts-expect-error wontfix
          const fieldValue = project[value] ?? project?.fundProject[value];

          const FIELDS = [
            FUND_STRATEGY_INPUTS.fundraisingPeriodInDays,
            FUND_STRATEGY_INPUTS.softCap,
            FUND_STRATEGY_INPUTS.hardCap,
            FUND_STRATEGY_INPUTS.lastPriceOnSecondaryMarket,
            FUND_STRATEGY_INPUTS.minimumNumberOfUnit,
          ];
          const NOT_RENDER = [FUND_STRATEGY_INPUTS.isTransferToSecondaryMarket];

          if (NOT_RENDER.includes(value as any)) return null;
          if (FIELDS.includes(value as any)) {
            let formattedContent = formatNumToIntlString({
              value: fieldValue,
              currency: project?.defaultCurrency,
            });
            if (value === FUND_STRATEGY_INPUTS.fundraisingPeriodInDays) {
              formattedContent = formatNumToIntlString({
                value: fieldValue,
                suffix:
                  Number(fieldValue) > 1
                    ? ` ${fundraisingTime}`
                    : ` ${fundraisingTime.slice(0, -1)}`,
              });
            }
            if (value === FUND_STRATEGY_INPUTS.minimumNumberOfUnit) {
              formattedContent = formatNumToIntlString(fieldValue);
            }

            return (
              <Field
                key={value}
                title={label}
                render={!!fieldValue}
                content={formattedContent}
              />
            );
          }

          if (value === FUND_STRATEGY_INPUTS.faceValuePerUnit) {
            return (
              <FieldDescription
                key={value}
                blurreable={false}
                title={label}
                content={formatNumToIntlString({
                  value: fieldValue,
                  currency: project?.defaultCurrency,
                })}
                render={!!fieldValue}
              />
            );
          }

          if (value === FUND_STRATEGY_INPUTS.overviewOfFund) {
            return (
              <FieldDescription
                key={value}
                blurreable={false}
                title={label}
                content={
                  <Box
                    sx={{
                      '&>div': {
                        display: 'flex',
                        gap: '.5rem',
                        flexDirection: 'column',
                      },
                      '&>div>a': {
                        color: 'primary.main',
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: fieldValue }}
                  />
                }
                render={!!fieldValue}
              />
            );
          }

          return (
            <FieldDescription
              key={value}
              blurreable={false}
              title={label}
              content={fieldValue}
              render={!!fieldValue}
            />
          );
        })}
        {customFields?.map(({ id, label, value }) => {
          return (
            <FieldDescription
              key={id}
              blurreable={false}
              title={label}
              content={value}
              render={!!value}
            />
          );
        })}
      </>
    </SectionContainer>
  );
};

export const FundKeyPerformanceIndicators = ({
  project,
  details,
}: SectionProps) => {
  const projectPath = getProjectPath(
    project.investmentGroup,
    project.investmentType,
    project.projectListingType,
    project.projectListingMarketType
  );

  const values = getSectionvalues(
    ProjectInputGroup.keyPerformanceIndicators,
    project,
    projectPath
  );
  const customFields = getProjectJsonFieldsAsArray(
    project,
    ProjectInputGroup.keyPerformanceIndicators
  );
  if (!values && !customFields?.length) {
    return null;
  }

  return (
    <SectionContainer
      title={
        <Title
          icon={<ChartBar width={22} height={22} stroke={'#178097'} />}
          title={'KEY PERFORMANCE INDICATORS'}
        />
      }
    >
      {projectPath?.keyPerformanceIndicators?.map(
        ({ name: label, value, props }) => {
          const { type } = props || {};
          if (type === null) return null;
          // @ts-expect-error wontfix
          const fieldValue = project[value] ?? project?.fundProject[value];
          return (
            <FieldDescription
              key={value}
              blurreable={false}
              title={label}
              content={fieldValue}
              render={!!fieldValue}
            />
          );
        }
      )}
      {customFields?.map(({ id, value }) => {
        return (
          <FieldDescription key={id} blurreable={false} render={!!value} />
        );
      })}
    </SectionContainer>
  );
};

const getSectionvalues = (
  step: ProjectInputGroup,
  project: MasterProject,
  projectPath?: ProjectMappingReturn
) => {
  if (!project || !projectPath) return null;
  const result = projectPath[step]?.reduce((agg, { value }) => {
    // @ts-expect-error wontfix
    agg[value] =
      // @ts-expect-error wontfix
      project[value] || project[step]?.[value] || project?.fundProject?.[value];
    return agg;
  }, {});

  // @ts-expect-error wontfix
  if (Object.values(result).some(Boolean)) {
    return result;
  }
  return null;
};

export const FundInvestmentInfo = ({ project, details }: SectionProps) => {
  const projectPath = getProjectPath(
    project.investmentGroup,
    project.investmentType,
    project.projectListingType,
    project.projectListingMarketType
  );

  const customFields = getProjectJsonFieldsAsArray(
    project,
    ProjectInputGroup.investmentInfo
  );
  const values = getSectionvalues(
    ProjectInputGroup.investmentInfo,
    project,
    projectPath
  );
  if (!values && !customFields?.length) {
    return null;
  }

  return (
    <SectionContainer
      title={
        <Title
          icon={<BusinessPlan width={22} height={22} stroke={'#178097'} />}
          title={'INVESTMENT INFO'}
        />
      }
    >
      {projectPath?.investmentInfo?.map(({ name: label, value, props }) => {
        const { type } = props || {};
        if (type === null) return null;
        // @ts-expect-error wontfix
        const fieldValue = project[value] ?? project?.fundProject[value];
        const FIELDS = [FUND_INVESTMENT_INFO_INPUTS.targetClosingDate];

        if (FIELDS.includes(value as any)) {
          return (
            <Field
              key={value}
              title={label}
              render={!!fieldValue}
              content={<DateFormatter date={fieldValue} time={false} />}
            />
          );
        }

        return (
          <FieldDescription
            key={value}
            blurreable={false}
            title={label}
            content={fieldValue}
            render={!!fieldValue}
          />
        );
      })}
      {customFields?.map(({ id, value }) => {
        return (
          <FieldDescription key={id} blurreable={false} render={!!value} />
        );
      })}
    </SectionContainer>
  );
};

export const FieldDescription = ({
  title,
  content,
  render = true,
  blurreable = false,
}: {
  title?: string | null;
  content?: ReactNode | null;
  render?: boolean;
  blurreable?: boolean;
}) => {
  const shouldBlur = blurreable;

  return render ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
      <Typography
        sx={{
          fontWeight: 'bold',
          textAlign: 'left',
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      {typeof content !== 'string' ? (
        content
      ) : (
        <Tooltip title={shouldBlur ? 'Login to view more' : ''}>
          <Typography
            sx={{
              fontWeight: 'regular',
              textAlign: 'justify',
              overflowWrap: 'anywhere',
              whiteSpace: 'pre-line',
              ...(shouldBlur && { filter: 'blur(4px)', cursor: 'default' }),
            }}
          >
            {content}
          </Typography>
        </Tooltip>
      )}
    </Box>
  ) : null;
};

export const Field = ({
  title,
  content,
  render = true,
  blurreable = false,
}: {
  title?: string | null;
  content?: string | ReactElement | null;
  render?: boolean;
  blurreable?: boolean;
}) => {
  const shouldBlur = blurreable;
  const componentMapping = {
    ['Phone']: { type: 'a', props: { href: `tel:${content}` } },
    Email: { type: 'a', props: { href: `mailto:${content}` } },
  };
  // @ts-expect-error wontfix
  const comp = componentMapping[title?.split(' ')[0]];
  return render ? (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <Typography
        sx={{
          flex: 2,
          fontWeight: '600',
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
      <Tooltip title={shouldBlur ? 'Login to view more' : ''}>
        <Typography
          component={comp?.type}
          sx={{
            clex: 1,
            overflow: 'hidden',
            textAlign: 'right',
            color: 'text.primary',
            overflowWrap: 'anywhere',
            ...(shouldBlur && { filter: 'blur(4px)', cursor: 'default' }),
            ...(comp && { '&:hover': { color: 'primary.main' } }),
          }}
          {...(comp && { ...comp.props })}
        >
          {content}
        </Typography>
      </Tooltip>
    </Box>
  ) : null;
};

const objectNotNullValidation = (object: object): boolean => {
  if (!object) return false;
  let validation = false;
  Object.entries(object).forEach((element) => {
    if (element[0] !== 'uuid' && !!element[1]) {
      validation = true;
    }
  });
  return validation;
};

const documentLabelMapping = {
  title: 'Supporting documents',
  title2: 'Legal',
  title3: 'Financial',
  titleEquityAndFund: 'Company/Project holder',
  titleRealEstate: 'Asset/Project holder',
  label: {
    valuationFromExpert: 'Valuation report from expert',
    financialStatementAvailable: 'Financial statements available',
    financialProjections: 'Financial projections (Business plan)',
    teaserInformationMemorandum: 'Teaser',
    summaryBusinessDeck: 'Summary business deck',
    taxLegalDueDiligenceReport: 'Tax/Legal Due diligence reports',
    projectPicture: 'Project picture',
    trackRecordsResumes: "Project Holders' track records Resumes",
    newsExposure: 'News exposure',
    certificateOfIncorporation: 'Certificate of incorporation',
    byLaws: 'By-Laws',
    shareHolderAgreement: 'Shareholder agreement',
    agreements: 'Guarantees agreements',
    capTable: 'Cap table',
    kycDocumentsRequired:
      'List of KYC documents required for suscribing investor',
    otherProjectDocumentation: 'Other Project Documentation',
    otherLegalDocument: 'Other documentation',
    otherLegalDocument1: 'Other Legal documentation',
    otherLegalDocument2: 'Other Legal documentation',
    otherLegalDocument3: 'Other Legal documentation',
    termSheet: 'Term sheet',
    subscriptionContract: 'Subscription contract',
    otherDocument: 'Other documentation',
    otherDocument1: 'Other financial documentation',
    otherDocument2: 'Other financial documentation',
    otherDocument3: 'Other financial documentation',
  },
  hover: {
    valuationFromExpert: 'Document where asset is praised by an expert',
    financialStatementAvailable: 'Last financial statement of the project',
    financialProjections: 'Business plan with financial projections',
    teaserInformationMemorandum: 'Teaser for potential investors',
    summaryBusinessDeck: 'Summary business deck',
    taxLegalDueDiligenceReport:
      'Due diligence reports on tax and other legal matters',
    projectPicture: 'Image of the project',
    trackRecordsResumes: "Project Holders' track records Resumes",
    newsExposure: 'News exposure',
    certificateOfIncorporation: 'Certificate of incorporation of the SPV',
    byLaws: 'SPV by-laws',
    shareHolderAgreement: 'SPV shreholder agreements',
    agreements: 'Guarantees agreements',
    capTable: 'Cap table',
    kycDocumentsRequired: 'List of KYC documents required for subscriptions',
    termSheet: 'Project term sheet',
    subscriptionContract: 'Subscription contract',
    otherDocument: 'Other relevant documents',
  },
};

function DateFormatter({
  date,
  time = true,
  sx = {},
}: {
  date: string;
  time?: boolean;
  sx?: SxProps;
}) {
  const dateTime = DateTime.fromISO(date);
  return (
    <Box sx={sx}>
      <Typography variant={'body2'}>
        {dateTime.setZone('utc').toLocaleString()}
      </Typography>
      {time && (
        <span>
          {dateTime.setZone('utc').toLocaleString(DateTime.TIME_24_SIMPLE)}
        </span>
      )}
    </Box>
  );
}
