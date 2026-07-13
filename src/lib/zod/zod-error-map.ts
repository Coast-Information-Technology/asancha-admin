// src/lib/zod/zod-error-map.ts

/**
 * File purpose:
 * Defines a shared Zod error map for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file provides consistent, safe, and user-friendly validation messages
 * for forms across staff authentication, staff management, user management,
 * review actions, settings, filters, and other admin workflows.
 *
 * Key exports:
 * - asanchaZodErrorMap provides the shared Zod error mapping function.
 * - applyAsanchaZodErrorMap registers the shared error map globally.
 *
 * Business relevance:
 * asancha-admin is a staff-only operational frontend. Validation messages
 * should be clear enough to guide staff users without exposing backend internals,
 * private service details, sensitive verification notes, private KYC notes,
 * document URLs, API key hashes, or audit-sensitive information.
 *
 * Security note:
 * Zod validation in the frontend improves UX only. The backend API must still
 * enforce DTO validation, authorization, staff permissions, review rules,
 * payment rules, document rules, verification rules, and audit-sensitive logic.
 */

import { z } from 'zod';

type ZodErrorMap = Parameters<typeof z.setErrorMap>[0];
type ZodIssue = Parameters<ZodErrorMap>[0];

function getIssuePath(issue: ZodIssue): string {
  const path = issue.path ?? [];

  return path.length > 0 ? path.join('.') : 'field';
}

function getRequiredMessage(issue: ZodIssue): string {
  const fieldPath = getIssuePath(issue).toLowerCase();

  if (fieldPath === 'email' || fieldPath.endsWith('.email')) {
    return 'Email address is required.';
  }

  if (fieldPath === 'password' || fieldPath.endsWith('.password')) {
    return 'Password is required.';
  }

  if (fieldPath.includes('role')) {
    return 'Please choose a valid role.';
  }

  if (fieldPath.includes('status')) {
    return 'Please choose a valid status.';
  }

  return 'This field is required.';
}

function getInvalidFormatMessage(issue: ZodIssue): string {
  const fieldPath = getIssuePath(issue).toLowerCase();

  if (fieldPath.includes('email')) {
    return 'Please enter a valid email address.';
  }

  if (fieldPath.includes('url')) {
    return 'Please enter a valid URL.';
  }

  if (fieldPath.includes('id') || fieldPath.includes('publicid')) {
    return 'Please enter a valid identifier.';
  }

  return 'Please enter a value in the correct format.';
}

export const asanchaZodErrorMap: ZodErrorMap = (issue) => {
  switch (issue.code) {
    case 'invalid_type': {
      return {
        message: getRequiredMessage(issue),
      };
    }

    case 'too_small': {
      if ('minimum' in issue && typeof issue.minimum === 'number') {
        if (issue.minimum === 1) {
          return {
            message: getRequiredMessage(issue),
          };
        }

        return {
          message: `Please enter at least ${issue.minimum} characters.`,
        };
      }

      return {
        message: 'The value entered is too short.',
      };
    }

    case 'too_big': {
      if ('maximum' in issue && typeof issue.maximum === 'number') {
        return {
          message: `Please enter no more than ${issue.maximum} characters.`,
        };
      }

      return {
        message: 'The value entered is too long.',
      };
    }

    case 'invalid_format': {
      return {
        message: getInvalidFormatMessage(issue),
      };
    }

    case 'invalid_value': {
      return {
        message: 'Please choose one of the allowed options.',
      };
    }

    case 'unrecognized_keys': {
      return {
        message: 'This form contains unsupported fields.',
      };
    }

    case 'invalid_union': {
      return {
        message: 'Please enter a value that matches one of the allowed formats.',
      };
    }

    case 'invalid_key': {
      return {
        message: 'This form contains an invalid field.',
      };
    }

    case 'invalid_element': {
      return {
        message: 'One of the selected values is invalid.',
      };
    }

    case 'not_multiple_of': {
      return {
        message: 'Please enter a valid number.',
      };
    }

    case 'custom': {
      return {
        message: issue.message || 'Please check this field and try again.',
      };
    }

    default: {
      return {
        message: 'Please check the form and try again.',
      };
    }
  }
};

export function applyAsanchaZodErrorMap(): void {
  z.setErrorMap(asanchaZodErrorMap);
}
