'use client';
import {
  Currency,
  InvestmentGroup,
  InvestmentType,
  MasterProject,
  ProjectInputGroup,
  ProjectListingMarketType,
  ProjectListingType,
} from '@/types/projects';
import { ExternalToast, toast } from 'sonner';
import { inspect } from 'util';
import { ZodError } from 'zod';
import { IS_DEVELOPMENT } from '../constants';
import { FieldValues, SubmitErrorHandler } from 'react-hook-form';
import { ReactNode } from 'react';

export async function copyToClipboard({
  url,
  title,
  toastText,
  breakpoint,
  text,
  disableToast,
}: ICopyOrShareUrl) {
  const isOperaBrowser = navigator?.userAgent?.includes('OPR');
  const isMozillaInAndroid = navigator?.userAgent?.match(
    /Mozilla.*Android|Mozilla.*Android/i
  );
  const shareObject = { title, url, text };
  if (!text) delete shareObject.text;
  if (!url) delete shareObject.url;

  if (breakpoint && navigator.share && !isOperaBrowser && !isMozillaInAndroid) {
    if (window?.location?.protocol !== 'https:') {
      console.debug('Share API needs HTTPS to work');
    }
    await navigator
      .share(shareObject)
      .then(() => {
        toast.success(toastText || 'Copied to clipboard');
        return 'Copied successfully';
      })
      .catch((e) => {
        fireErrorToast(e?.message);
        return e?.message || 'error';
      });
  } else {
    let copyText = url || text;
    if (copyText) {
      await navigator?.clipboard?.writeText(copyText);
    }
    if (disableToast) return;
    toast.success(toastText || 'Copied to clipboard');
  }
}

export const copyProjectShareableLink = async (
  data: MasterProject,
  matchesSM: boolean
) => {
  copyToClipboard({
    disableToast: false,
    url: process.env.NEXT_PUBLIC_DOMAIN,
    title: `Share ${data.projectName}`,
    breakpoint: matchesSM,
  }) || '';
};

export const GET_UNHANDLED_ERROR = 'Oops something went wrong';

/**
 * This function fires an error toast with a message.
 * @param error en error string message
 * @param location the pathname or current place of the application where this error was triggered
 * @param options ToastOptions, severity and/or async toast reference
 */
export const fireErrorToast = async (
  error: string | Error | unknown,
  options?: ExternalToast & {
    mute?: boolean;
  }
): Promise<void> => {
  let message: string = '';
  if (error instanceof Error) {
    message = error.message || GET_UNHANDLED_ERROR;
  }

  if (error instanceof ZodError) {
    message = error.issues.map((e) => e.message).join('\n');
  }

  if (error && typeof error === 'object' && !message) {
    message = JSON.stringify(error);
  }

  if (typeof error === 'string') {
    message = error;
  }

  if (options?.mute) {
    return;
  }

  toast.error(message, options);
};

export const onInvalid: SubmitErrorHandler<FieldValues> = (errors): void => {
  if (IS_DEVELOPMENT) {
    console.debug(`[DEBUG]: ${inspect(errors)}`);
  }
  fireErrorToast(
    Object.values(errors)
      .map((e) => e?.message)
      .join('\n') ?? JSON.stringify(errors)
  );
};

interface ICopyOrShareUrl {
  url?: string;
  title: string;
  toastText?: string;
  breakpoint?: boolean;
  text?: string;
  disableToast?: boolean;
}

export const getPlaceholderImage = (
  width: number | string,
  height: number | string
) => `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const shimmer = (w: number | string, h: number | string) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
    <stop stop-color="#d9d9d9" offset="10%" />
      <stop stop-color="#d6d6d6" offset="20%" />
      <stop stop-color="#f6f6f6" offset="30%" />
      <stop stop-color="#d6d6d6" offset="60%" />
      <stop stop-color="#f6f6f6" offset="80%" />
      <stop stop-color="#d9d9d9" offset="90%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#d9d9d9" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

interface DisplayNumberFormatProps {
  value: string | number;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  currency?: Currency;
}

export function formatNumToIntlString(
  arg: DisplayNumberFormatProps | DisplayNumberFormatProps['value']
) {
  if (!arg) return null;
  if (typeof arg === 'string' || typeof arg === 'number') {
    return Number.isNaN(arg) ? String(arg) : IntlNumberFormat(Number(arg));
  }
  const { value, prefix = '', suffix = '', currency } = arg;
  if (Number.isNaN(Number(value))) {
    return `${prefix}${value}${suffix}`;
  }
  const formated = IntlNumberFormat(Number(value), currency);
  return `${prefix}${formated}${suffix}`;
}

function IntlNumberFormat(value: number, currency?: Currency) {
  const format =
    typeof window === 'undefined' ? 'en-US' : navigator?.language ?? 'en-US';
  if (!currency) {
    return new Intl.NumberFormat(format, {
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat(format, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export const percentCalculator = (project: MasterProject) => {
  const availableBalance = project?.availableBalance;
  if (availableBalance && project?.hardCap) {
    return (1 - availableBalance / project?.hardCap) * 100;
  } else {
    return 100;
  }
};

export function showFormattedNames(type: string) {
  switch (type) {
    case ProjectListingMarketType.PRIMARY:
      return 'Primary Market';
    case ProjectListingMarketType.SECONDARY:
      return 'Secondary Market';
    case InvestmentType.DEBT:
      return 'Debt Instrument';
    case InvestmentType.EQUITY:
      return 'Equity Instrument';
    case InvestmentType.LOAN:
      return 'Convertible Loan';
    case InvestmentType.FUND:
      return 'Fund';
    case ProjectListingType.ART:
      return 'Art';
    case ProjectListingType.HEDGE_FUND:
      return 'Hedge Fund / Open-ended Fund';
    case ProjectListingType.DEDICATED_FUND:
      return 'Dedicated Fund / Closed-ended Fund';
    case InvestmentGroup.COLLECTIVE_INVESTMENT:
      return 'Collective Investment';
    case InvestmentGroup.DIRECT_INVESTMENT:
      return 'Direct Investment';
    case ProjectListingType.INFRASTRUCTURE:
      return 'Infrastructure';
    case ProjectListingType.COMMODITIES:
      return 'Commodities';
    case ProjectListingType.OTHER:
      return 'Other real assets';
    case ProjectListingType.REAL_ESTATE:
      return 'Real estate';
    case ProjectListingType.PRIVATE_EQUITY:
      return 'Private companies';
    case ProjectListingType.FUND:
      return 'Fund Instrument';
    case ProjectInputGroup.assetInfo:
      return 'Asset information';
    case ProjectInputGroup.businessInfo:
      return 'Business information';
    case ProjectInputGroup.contactInfo:
      return 'Contact info';
    case ProjectInputGroup.documents:
      return 'Documents';
    case ProjectInputGroup.fundStrategy:
      return 'Fund Strategy';
    case ProjectInputGroup.generalInfo:
      return 'General Info';
    case ProjectInputGroup.guaranteeLevels:
      return 'Guarantee levels';
    case ProjectInputGroup.investmentInfo:
      return 'Investment info';
    case ProjectInputGroup.keyPerformanceIndicators:
      return 'Key performance indicators';
    case ProjectInputGroup.nonFinancialInfo:
      return 'Non financial information';
    default:
      return '';
  }
}

export const getProjectType = (type: string) => {
  if (type === InvestmentType.EQUITY.toString()) {
    return 'Equity';
  }
  if (type === InvestmentType.DEBT.toString()) {
    return 'Debt';
  }
  if (type === InvestmentType.LOAN.toString()) {
    return 'Convertible Loan';
  }
  if (type === InvestmentType.FUND.toString()) {
    return 'Fund';
  }
};
