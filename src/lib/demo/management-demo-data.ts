/**
 * Frontend-only records shaped like the expected Asancha management API.
 * Replace these exports with query results when the corresponding endpoints are ready.
 */

import type {
  CompanyDetail,
  CompanyListItem,
} from '../../features/companies/types/companies.types';
import type {
  DocumentDetail,
  DocumentListItem,
} from '../../features/documents/types/documents.types';
import type {
  ListingDetail,
  ListingListItem,
} from '../../features/listings/types/listings.types';
import type {
  ProfileDetail,
  ProfileListItem,
} from '../../features/profiles/types/profiles.types';
import type {
  PropertyDetail,
  PropertyListItem,
} from '../../features/properties/types/properties.types';
import type {
  VerificationReviewDetail,
  VerificationReviewListItem,
} from '../../features/verification-reviews/types/verification-reviews.types';
import type {
  UserDetail,
  UserListItem,
} from '../../features/users/types/users.types';
import type { StaffListItem } from '../../features/staff/types/staff.types';

export const DEMO_COMPANIES: readonly CompanyListItem[] = [
  {
    companyPublicId: 'co_demo_001',
    companyName: 'Carter & Stone Estates',
    companyTypeLabel: 'Property agency',
    primaryContactLabel: 'James Carter',
    status: 'under_review',
    verificationStatus: 'in_review',
    membersCount: 4,
    documentsCount: 5,
    createdAtLabel: '16 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 09:16',
    href: '/companies/co_demo_001',
  },
  {
    companyPublicId: 'co_demo_002',
    companyName: 'Bennett Property Sourcing',
    companyTypeLabel: 'Property sourcing business',
    primaryContactLabel: 'Sophie Bennett',
    status: 'approved',
    verificationStatus: 'approved',
    membersCount: 3,
    documentsCount: 6,
    createdAtLabel: '12 Jul 2026',
    updatedAtLabel: '17 Jul 2026, 14:22',
    href: '/companies/co_demo_002',
  },
  {
    companyPublicId: 'co_demo_003',
    companyName: 'Hughes Property Services',
    companyTypeLabel: 'Service provider company',
    primaryContactLabel: 'Michael Hughes',
    status: 'pending',
    verificationStatus: 'pending',
    membersCount: 2,
    documentsCount: 4,
    createdAtLabel: '18 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 08:48',
    href: '/companies/co_demo_003',
  },
  {
    companyPublicId: 'co_demo_004',
    companyName: 'Northgate Lettings Ltd',
    companyTypeLabel: 'Property management company',
    primaryContactLabel: 'Priya Shah',
    status: 'on_hold',
    verificationStatus: 'flagged',
    membersCount: 7,
    documentsCount: 8,
    createdAtLabel: '10 Jul 2026',
    updatedAtLabel: '16 Jul 2026, 11:05',
    href: '/companies/co_demo_004',
  },
];

export const DEMO_PROPERTIES: readonly PropertyListItem[] = [
  {
    propertyPublicId: 'prop_demo_001',
    title: '18 Park View townhouse',
    locationLabel: 'Manchester, Greater Manchester',
    sourceLabel: 'Amelia Thompson',
    sourceType: 'property_owner',
    status: 'under_review',
    documentStatus: 'pending',
    listingStatus: 'submitted',
    companyLabel: 'Northgate Lettings Ltd',
    createdAtLabel: '18 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 09:04',
    href: '/properties/prop_demo_001',
  },
  {
    propertyPublicId: 'prop_demo_002',
    title: '14 Kingsway Road apartment block',
    locationLabel: 'Birmingham, West Midlands',
    sourceLabel: 'Carter & Stone Estates',
    sourceType: 'property_agent',
    status: 'approved',
    documentStatus: 'approved',
    listingStatus: 'published',
    companyLabel: 'Carter & Stone Estates',
    createdAtLabel: '15 Jul 2026',
    updatedAtLabel: '17 Jul 2026, 16:35',
    href: '/properties/prop_demo_002',
  },
  {
    propertyPublicId: 'prop_demo_003',
    title: '42 Wellington Street terrace',
    locationLabel: 'Liverpool, Merseyside',
    sourceLabel: 'Bennett Property Sourcing',
    sourceType: 'property_sourcer',
    status: 'submitted',
    documentStatus: 'in_review',
    listingStatus: 'not_listed',
    companyLabel: 'Bennett Property Sourcing',
    createdAtLabel: '17 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 08:26',
    href: '/properties/prop_demo_003',
  },
  {
    propertyPublicId: 'prop_demo_004',
    title: '7 Oak Crescent semi-detached home',
    locationLabel: 'Leeds, West Yorkshire',
    sourceLabel: 'Daniel Wright',
    sourceType: 'property_owner',
    status: 'correction_requested',
    documentStatus: 'replacement_required',
    listingStatus: 'not_listed',
    createdAtLabel: '14 Jul 2026',
    updatedAtLabel: '17 Jul 2026, 16:55',
    href: '/properties/prop_demo_004',
  },
  {
    propertyPublicId: 'prop_demo_005',
    title: '22 Mill Lane development opportunity',
    locationLabel: 'Coventry, West Midlands',
    sourceLabel: 'James Carter',
    sourceType: 'property_agent',
    status: 'approved',
    documentStatus: 'approved',
    listingStatus: 'reserved',
    companyLabel: 'Carter & Stone Estates',
    createdAtLabel: '9 Jul 2026',
    updatedAtLabel: '17 Jul 2026, 12:10',
    href: '/properties/prop_demo_005',
  },
];

export const DEMO_PROFILES: readonly ProfileListItem[] = [
  {
    profilePublicId: 'profile_demo_001',
    userPublicId: 'usr_demo_001',
    displayName: 'Daniel Wright',
    emailLabel: 'daniel.wright@example.test',
    profileType: 'investor',
    status: 'approved',
    verificationStatus: 'approved',
    createdAtLabel: '12 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 08:50',
    href: '/profiles/profile_demo_001',
  },
  {
    profilePublicId: 'profile_demo_002',
    userPublicId: 'usr_demo_002',
    displayName: 'Amelia Thompson',
    emailLabel: 'amelia.thompson@example.test',
    profileType: 'property_owner',
    status: 'under_review',
    verificationStatus: 'in_review',
    companyLabel: 'Northgate Lettings Ltd',
    createdAtLabel: '15 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 09:04',
    href: '/profiles/profile_demo_002',
  },
  {
    profilePublicId: 'profile_demo_003',
    userPublicId: 'usr_demo_003',
    displayName: 'James Carter',
    emailLabel: 'james.carter@example.test',
    profileType: 'property_agent',
    status: 'approved',
    verificationStatus: 'approved',
    companyLabel: 'Carter & Stone Estates',
    createdAtLabel: '8 Jul 2026',
    updatedAtLabel: '17 Jul 2026, 16:35',
    href: '/profiles/profile_demo_003',
  },
  {
    profilePublicId: 'profile_demo_004',
    userPublicId: 'usr_demo_004',
    displayName: 'Sophie Bennett',
    emailLabel: 'sophie.bennett@example.test',
    profileType: 'property_sourcer',
    status: 'pending',
    verificationStatus: 'pending',
    companyLabel: 'Bennett Property Sourcing',
    createdAtLabel: '17 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 08:26',
    href: '/profiles/profile_demo_004',
  },
  {
    profilePublicId: 'profile_demo_005',
    userPublicId: 'usr_demo_005',
    displayName: 'Michael Hughes',
    emailLabel: 'michael.hughes@example.test',
    profileType: 'service_provider',
    status: 'correction_requested',
    verificationStatus: 'flagged',
    companyLabel: 'Hughes Property Services',
    createdAtLabel: '18 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 08:48',
    href: '/profiles/profile_demo_005',
  },
];

export const DEMO_DOCUMENTS: readonly DocumentListItem[] = [
  {
    documentPublicId: 'doc_demo_001',
    documentLabel: 'Proof of address - Daniel Wright',
    documentTypeLabel: 'Proof of address',
    ownerSummary: {
      ownerPublicId: 'profile_demo_001',
      ownerType: 'profile',
      ownerLabel: 'Daniel Wright',
      relatedUserLabel: 'usr_demo_001',
    },
    status: 'approved',
    reviewRisk: 'low',
    replacementRequired: false,
    submittedAtLabel: '12 Jul 2026, 10:12',
    updatedAtLabel: '13 Jul 2026, 15:40',
    href: '/documents/doc_demo_001',
  },
  {
    documentPublicId: 'doc_demo_002',
    documentLabel: 'Company registration certificate',
    documentTypeLabel: 'Company registration',
    ownerSummary: {
      ownerPublicId: 'co_demo_001',
      ownerType: 'company',
      ownerLabel: 'Carter & Stone Estates',
    },
    status: 'in_review',
    reviewRisk: 'medium',
    replacementRequired: false,
    submittedAtLabel: '16 Jul 2026, 14:20',
    updatedAtLabel: '18 Jul 2026, 09:16',
    href: '/documents/doc_demo_002',
  },
  {
    documentPublicId: 'doc_demo_003',
    documentLabel: 'Title register - 18 Park View',
    documentTypeLabel: 'Property title register',
    ownerSummary: {
      ownerPublicId: 'prop_demo_001',
      ownerType: 'property',
      ownerLabel: '18 Park View townhouse',
      relatedUserLabel: 'usr_demo_002',
    },
    status: 'pending',
    reviewRisk: 'none',
    replacementRequired: false,
    submittedAtLabel: '18 Jul 2026, 09:04',
    updatedAtLabel: '18 Jul 2026, 09:04',
    href: '/documents/doc_demo_003',
  },
  {
    documentPublicId: 'doc_demo_004',
    documentLabel: 'Insurance certificate - Hughes Property Services',
    documentTypeLabel: 'Insurance certificate',
    ownerSummary: {
      ownerPublicId: 'co_demo_003',
      ownerType: 'company',
      ownerLabel: 'Hughes Property Services',
    },
    status: 'replacement_required',
    reviewRisk: 'high',
    replacementRequired: true,
    submittedAtLabel: '18 Jul 2026, 08:48',
    updatedAtLabel: '18 Jul 2026, 08:48',
    href: '/documents/doc_demo_004',
  },
  {
    documentPublicId: 'doc_demo_005',
    documentLabel: 'Identity document - Sophie Bennett',
    documentTypeLabel: 'Identity document',
    ownerSummary: {
      ownerPublicId: 'usr_demo_004',
      ownerType: 'user',
      ownerLabel: 'Sophie Bennett',
    },
    status: 'on_hold',
    reviewRisk: 'medium',
    replacementRequired: false,
    submittedAtLabel: '17 Jul 2026, 11:32',
    updatedAtLabel: '18 Jul 2026, 08:26',
    href: '/documents/doc_demo_005',
  },
];

export const DEMO_LISTINGS: readonly ListingListItem[] = [
  {
    listingPublicId: 'listing_demo_001',
    propertyPublicId: 'prop_demo_001',
    title: '18 Park View - buy-to-let opportunity',
    propertyTitleLabel: '18 Park View townhouse',
    locationLabel: 'Manchester',
    status: 'submitted',
    reviewStatus: 'pending',
    visibilityStatus: 'private',
    reservationStatus: 'not_reserved',
    priceLabel: '£285,000',
    yieldLabel: '6.2% projected yield',
    createdAtLabel: '18 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 09:04',
    href: '/listings/listing_demo_001',
  },
  {
    listingPublicId: 'listing_demo_002',
    propertyPublicId: 'prop_demo_002',
    title: '14 Kingsway Road - residential block',
    propertyTitleLabel: '14 Kingsway Road apartment block',
    locationLabel: 'Birmingham',
    status: 'published',
    reviewStatus: 'approved',
    visibilityStatus: 'public',
    reservationStatus: 'not_reserved',
    priceLabel: '£640,000',
    yieldLabel: '7.1% projected yield',
    createdAtLabel: '15 Jul 2026',
    updatedAtLabel: '17 Jul 2026, 16:35',
    href: '/listings/listing_demo_002',
  },
  {
    listingPublicId: 'listing_demo_003',
    propertyPublicId: 'prop_demo_005',
    title: '22 Mill Lane - development opportunity',
    propertyTitleLabel: '22 Mill Lane development opportunity',
    locationLabel: 'Coventry',
    status: 'reserved',
    reviewStatus: 'approved',
    visibilityStatus: 'restricted',
    reservationStatus: 'reserved',
    priceLabel: '£410,000',
    yieldLabel: '5.8% projected yield',
    createdAtLabel: '9 Jul 2026',
    updatedAtLabel: '17 Jul 2026, 12:10',
    href: '/listings/listing_demo_003',
  },
  {
    listingPublicId: 'listing_demo_004',
    propertyPublicId: 'prop_demo_003',
    title: '42 Wellington Street - investor package',
    propertyTitleLabel: '42 Wellington Street terrace',
    locationLabel: 'Liverpool',
    status: 'under_review',
    reviewStatus: 'in_review',
    visibilityStatus: 'private',
    reservationStatus: 'reservation_pending',
    priceLabel: '£198,000',
    yieldLabel: '6.8% projected yield',
    createdAtLabel: '17 Jul 2026',
    updatedAtLabel: '18 Jul 2026, 08:26',
    href: '/listings/listing_demo_004',
  },
];

export const DEMO_USERS: readonly UserListItem[] = [
  {
    userPublicId: 'usr_demo_001',
    displayName: 'Daniel Wright',
    emailLabel: 'daniel.wright@example.test',
    phoneLabel: '+44 7700 900101',
    role: 'investor',
    status: 'active',
    verificationStatus: 'approved',
    createdAtLabel: '12 Jul 2026',
    lastSeenAtLabel: '18 Jul 2026, 08:50',
    href: '/users/usr_demo_001',
  },
  {
    userPublicId: 'usr_demo_002',
    displayName: 'Amelia Thompson',
    emailLabel: 'amelia.thompson@example.test',
    phoneLabel: '+44 7700 900102',
    role: 'property_owner',
    status: 'under_review',
    verificationStatus: 'in_review',
    createdAtLabel: '15 Jul 2026',
    lastSeenAtLabel: '18 Jul 2026, 09:04',
    href: '/users/usr_demo_002',
  },
  {
    userPublicId: 'usr_demo_003',
    displayName: 'James Carter',
    emailLabel: 'james.carter@example.test',
    phoneLabel: '+44 7700 900103',
    role: 'property_agent',
    status: 'active',
    verificationStatus: 'approved',
    createdAtLabel: '8 Jul 2026',
    lastSeenAtLabel: '18 Jul 2026, 08:42',
    href: '/users/usr_demo_003',
  },
  {
    userPublicId: 'usr_demo_004',
    displayName: 'Sophie Bennett',
    emailLabel: 'sophie.bennett@example.test',
    phoneLabel: '+44 7700 900104',
    role: 'property_sourcer',
    status: 'pending',
    verificationStatus: 'pending',
    createdAtLabel: '17 Jul 2026',
    lastSeenAtLabel: '18 Jul 2026, 08:26',
    href: '/users/usr_demo_004',
  },
  {
    userPublicId: 'usr_demo_005',
    displayName: 'Michael Hughes',
    emailLabel: 'michael.hughes@example.test',
    phoneLabel: '+44 7700 900105',
    role: 'service_provider',
    status: 'restricted',
    verificationStatus: 'flagged',
    createdAtLabel: '18 Jul 2026',
    lastSeenAtLabel: '18 Jul 2026, 08:48',
    href: '/users/usr_demo_005',
  },
  {
    userPublicId: 'usr_demo_006',
    displayName: 'Priya Shah',
    emailLabel: 'priya.shah@example.test',
    phoneLabel: '+44 7700 900106',
    role: 'property_agent',
    status: 'suspended',
    verificationStatus: 'correction_requested',
    createdAtLabel: '10 Jul 2026',
    lastSeenAtLabel: '16 Jul 2026, 11:05',
    href: '/users/usr_demo_006',
  },
];

export const DEMO_STAFF: readonly StaffListItem[] = [
  {
    staffPublicId: 'staff_demo_001',
    displayName: 'Demo Super Admin',
    emailLabel: 'super.admin@example.test',
    role: 'super_admin',
    status: 'active',
    createdAtLabel: '1 Jul 2026',
    lastActiveAtLabel: '18 Jul 2026, 09:42',
    href: '/staff/staff_demo_001',
  },
  {
    staffPublicId: 'staff_demo_002',
    displayName: 'Demo Operations Lead',
    emailLabel: 'operations.lead@example.test',
    role: 'admin',
    status: 'active',
    createdAtLabel: '3 Jul 2026',
    lastActiveAtLabel: '18 Jul 2026, 09:16',
    href: '/staff/staff_demo_002',
  },
  {
    staffPublicId: 'staff_demo_003',
    displayName: 'Demo Support Rep',
    emailLabel: 'support.rep@example.test',
    role: 'customer_care_rep',
    status: 'active',
    createdAtLabel: '5 Jul 2026',
    lastActiveAtLabel: '18 Jul 2026, 08:56',
    href: '/staff/staff_demo_003',
  },
  {
    staffPublicId: 'staff_demo_004',
    displayName: 'Demo Invited Admin',
    emailLabel: 'invited.admin@example.test',
    role: 'admin',
    status: 'invited',
    createdAtLabel: '17 Jul 2026',
    lastActiveAtLabel: 'Not active yet',
    href: '/staff/staff_demo_004',
  },
];

export const DEMO_VERIFICATION_REVIEWS: readonly VerificationReviewListItem[] = [
  {
    verificationReviewPublicId: 'vr_demo_001',
    title: 'Investor identity and profile review',
    targetSummary: {
      targetPublicId: 'profile_demo_001',
      targetType: 'investor_profile',
      targetLabel: 'Daniel Wright investor profile',
      relatedUserLabel: 'usr_demo_001',
    },
    status: 'approved',
    riskRating: 'low',
    priority: 'normal',
    submittedAtLabel: '12 Jul 2026, 10:12',
    updatedAtLabel: '13 Jul 2026, 15:40',
    assignedToLabel: 'Demo Admin',
    href: '/verification-reviews/vr_demo_001',
  },
  {
    verificationReviewPublicId: 'vr_demo_002',
    title: 'Company verification - Carter & Stone Estates',
    targetSummary: {
      targetPublicId: 'co_demo_001',
      targetType: 'company',
      targetLabel: 'Carter & Stone Estates',
      relatedUserLabel: 'usr_demo_003',
      relatedCompanyLabel: 'Carter & Stone Estates',
    },
    status: 'in_review',
    riskRating: 'medium',
    priority: 'high',
    submittedAtLabel: '16 Jul 2026, 14:20',
    updatedAtLabel: '18 Jul 2026, 09:16',
    assignedToLabel: 'Demo Operations Lead',
    href: '/verification-reviews/vr_demo_002',
  },
  {
    verificationReviewPublicId: 'vr_demo_003',
    title: 'Service provider insurance review',
    targetSummary: {
      targetPublicId: 'profile_demo_005',
      targetType: 'service_provider_profile',
      targetLabel: 'Michael Hughes service provider profile',
      relatedUserLabel: 'usr_demo_005',
      relatedCompanyLabel: 'Hughes Property Services',
    },
    status: 'correction_required',
    riskRating: 'high',
    priority: 'critical',
    submittedAtLabel: '18 Jul 2026, 08:48',
    updatedAtLabel: '18 Jul 2026, 08:48',
    assignedToLabel: 'Unassigned',
    href: '/verification-reviews/vr_demo_003',
  },
  {
    verificationReviewPublicId: 'vr_demo_004',
    title: 'Property ownership verification',
    targetSummary: {
      targetPublicId: 'prop_demo_001',
      targetType: 'property',
      targetLabel: '18 Park View townhouse',
      relatedUserLabel: 'usr_demo_002',
    },
    status: 'pending',
    riskRating: 'unknown',
    priority: 'normal',
    submittedAtLabel: '18 Jul 2026, 09:04',
    updatedAtLabel: '18 Jul 2026, 09:04',
    assignedToLabel: 'Unassigned',
    href: '/verification-reviews/vr_demo_004',
  },
];

export function getDemoCompany(companyPublicId: string): CompanyDetail {
  const company = DEMO_COMPANIES.find((item) => item.companyPublicId === companyPublicId) ?? DEMO_COMPANIES[0];

  return {
    companyPublicId: companyPublicId || company.companyPublicId,
    companyName: company.companyName,
    companyTypeLabel: company.companyTypeLabel,
    status: company.status,
    verificationStatus: company.verificationStatus,
    primaryContactLabel: company.primaryContactLabel,
    createdAtLabel: company.createdAtLabel,
    updatedAtLabel: company.updatedAtLabel,
    summary: `${company.companyName} is a demo ${company.companyTypeLabel.toLowerCase()} record connected to Asancha property and verification workflows.`,
    relatedSummary: {
      membersCount: company.membersCount,
      documentsCount: company.documentsCount,
      propertiesCount: company.companyPublicId === 'co_demo_001' ? 2 : 1,
      listingsCount: company.companyPublicId === 'co_demo_001' ? 2 : 1,
      verificationReviewsCount: company.companyPublicId === 'co_demo_004' ? 2 : 1,
    },
    documentSummary: {
      total: company.documentsCount,
      pending: company.verificationStatus === 'approved' ? 0 : 1,
      approved: Math.max(0, company.documentsCount - 1),
      rejected: company.verificationStatus === 'flagged' ? 1 : 0,
      replacementRequired: company.companyPublicId === 'co_demo_003' ? 1 : 0,
    },
    members: [
      {
        memberPublicId: `member_${company.companyPublicId}_001`,
        userPublicId: company.companyPublicId === 'co_demo_002' ? 'usr_demo_004' : 'usr_demo_003',
        displayName: company.primaryContactLabel ?? 'Demo company contact',
        emailLabel: 'contact@example.test',
        role: company.companyPublicId === 'co_demo_002' ? 'owner' : 'director',
        status: 'active',
        joinedAtLabel: company.createdAtLabel,
      },
      {
        memberPublicId: `member_${company.companyPublicId}_002`,
        userPublicId: 'usr_demo_001',
        displayName: 'Demo Operations Member',
        emailLabel: 'operations@example.test',
        role: 'manager',
        status: company.status === 'on_hold' ? 'suspended' : 'active',
        joinedAtLabel: '15 Jul 2026',
      },
    ],
  };
}

export function getDemoProperty(propertyPublicId: string): PropertyDetail {
  const property = DEMO_PROPERTIES.find((item) => item.propertyPublicId === propertyPublicId) ?? DEMO_PROPERTIES[0];

  return {
    propertyPublicId: propertyPublicId || property.propertyPublicId,
    title: property.title,
    locationLabel: property.locationLabel,
    sourceLabel: property.sourceLabel,
    sourceType: property.sourceType,
    status: property.status,
    documentStatus: property.documentStatus,
    listingStatus: property.listingStatus,
    createdAtLabel: property.createdAtLabel,
    updatedAtLabel: property.updatedAtLabel,
    summary: `${property.title} is a demo property record with ownership, document, listing, and activity relationships ready for backend data.`,
    relatedSummary: {
      relatedCompanyLabel: property.companyLabel,
      relatedProfileLabel: property.sourceLabel,
      relatedUserLabel: property.sourceLabel,
      documentsCount: 3,
      listingsCount: property.listingStatus === 'not_listed' ? 0 : 1,
      reservationsCount: property.listingStatus === 'reserved' ? 1 : 0,
      activitiesCount: 6,
    },
    documentSummary: {
      total: 3,
      pending: property.documentStatus === 'pending' ? 1 : 0,
      approved: property.documentStatus === 'approved' ? 3 : 1,
      rejected: property.documentStatus === 'replacement_required' ? 1 : 0,
      replacementRequired: property.documentStatus === 'replacement_required' ? 1 : 0,
    },
    listingSummary: {
      total: property.listingStatus === 'not_listed' ? 0 : 1,
      submitted: property.listingStatus === 'submitted' ? 1 : 0,
      underReview: property.listingStatus === 'under_review' ? 1 : 0,
      published: property.listingStatus === 'published' ? 1 : 0,
      reserved: property.listingStatus === 'reserved' ? 1 : 0,
      rejected: property.listingStatus === 'rejected' ? 1 : 0,
      archived: property.listingStatus === 'archived' ? 1 : 0,
    },
    activitySummary: {
      total: 6,
      latestActivityLabel: 'Demo review status updated 18 Jul 2026, 09:04',
    },
  };
}

export function getDemoProfile(profilePublicId: string): ProfileDetail {
  const profile = DEMO_PROFILES.find((item) => item.profilePublicId === profilePublicId) ?? DEMO_PROFILES[0];

  return {
    profilePublicId: profilePublicId || profile.profilePublicId,
    userPublicId: profile.userPublicId,
    displayName: profile.displayName,
    emailLabel: profile.emailLabel,
    profileType: profile.profileType,
    status: profile.status,
    verificationStatus: profile.verificationStatus,
    createdAtLabel: profile.createdAtLabel,
    updatedAtLabel: profile.updatedAtLabel,
    summary: `${profile.displayName}'s demo ${profile.profileType.replace(/_/g, ' ')} profile includes onboarding, verification, and related operational records.`,
    relatedSummary: {
      relatedUserLabel: profile.displayName,
      relatedCompanyLabel: profile.companyLabel,
      relatedPropertiesCount: profile.profileType === 'investor' ? 0 : 2,
      relatedListingsCount: profile.profileType === 'investor' ? 0 : 1,
      relatedDocumentsCount: 3,
      relatedVerificationReviewsCount: 1,
    },
  };
}

export function getDemoDocument(documentPublicId: string): DocumentDetail {
  const document = DEMO_DOCUMENTS.find((item) => item.documentPublicId === documentPublicId) ?? DEMO_DOCUMENTS[0];

  return {
    ...document,
    documentPublicId: documentPublicId || document.documentPublicId,
    summary: `${document.documentLabel} is a demo document metadata record. The UI intentionally exposes no private file URL or raw document content.`,
    reviewSummary: {
      status: document.status,
      reviewRisk: document.reviewRisk,
      reviewedByLabel: document.status === 'approved' ? 'Demo Admin' : undefined,
      reviewedAtLabel: document.status === 'approved' ? '13 Jul 2026, 15:40' : undefined,
      latestSafeUserMessage: document.replacementRequired
        ? 'Please upload a clearer replacement document.'
        : 'No customer-facing correction message is currently required.',
      latestInternalNoteLabel: 'Demo review note - replace with permission-aware API data.',
    },
    history: [
      {
        historyPublicId: `doc_history_${document.documentPublicId}_001`,
        status: 'pending',
        eventLabel: 'Document submitted',
        actorLabel: document.ownerSummary.ownerLabel,
        createdAtLabel: document.submittedAtLabel,
        safeSummary: 'Demo document metadata was submitted for staff review.',
      },
      {
        historyPublicId: `doc_history_${document.documentPublicId}_002`,
        status: document.status,
        eventLabel: document.status === 'replacement_required' ? 'Replacement requested' : 'Review status updated',
        actorLabel: 'Demo Admin',
        createdAtLabel: document.updatedAtLabel ?? document.submittedAtLabel,
        safeSummary: 'Demo document workflow status was updated.',
      },
    ],
  };
}

export function getDemoListing(listingPublicId: string): ListingDetail {
  const listing = DEMO_LISTINGS.find((item) => item.listingPublicId === listingPublicId) ?? DEMO_LISTINGS[0];

  return {
    ...listing,
    listingPublicId: listingPublicId || listing.listingPublicId,
    summary: `${listing.title} is a demo marketplace listing connected to a property, review, visibility, reservation, and activity workflow.`,
    propertySummary: {
      propertyPublicId: listing.propertyPublicId,
      propertyTitleLabel: listing.propertyTitleLabel,
      locationLabel: listing.locationLabel,
      propertyStatusLabel: 'Approved',
    },
    reviewSummary: {
      reviewStatus: listing.reviewStatus,
      reviewedByLabel: listing.reviewStatus === 'approved' ? 'Demo Admin' : undefined,
      reviewedAtLabel: listing.reviewStatus === 'approved' ? '17 Jul 2026, 16:35' : undefined,
      latestReviewNoteLabel: listing.reviewStatus === 'pending' ? 'Check property title register before publication.' : 'Demo review checks complete.',
    },
    visibilitySummary: {
      visibilityStatus: listing.visibilityStatus,
      isPubliclyVisible: listing.visibilityStatus === 'public',
      visibleFromLabel: listing.visibilityStatus === 'public' ? '17 Jul 2026, 16:35' : undefined,
    },
    activitySummary: {
      total: 8,
      latestActivityLabel: 'Demo listing status updated 18 Jul 2026, 09:04',
    },
    auditSummary: {
      highRiskActionsCount: listing.reservationStatus === 'reserved' ? 1 : 0,
      latestAuditLabel: 'Demo publication and visibility event recorded',
    },
  };
}

export function getDemoUser(userPublicId: string): UserDetail {
  const user = DEMO_USERS.find((item) => item.userPublicId === userPublicId) ?? DEMO_USERS[0];

  return {
    ...user,
    userPublicId: userPublicId || user.userPublicId,
    relatedCounts: {
      profiles: 1,
      companies: user.role === 'investor' ? 0 : 1,
      properties: user.role === 'investor' ? 0 : 2,
      listings: user.role === 'investor' ? 0 : 1,
      dealReservations: user.role === 'investor' ? 2 : 1,
      bookings: 2,
      payments: 2,
      documents: 3,
      verificationReviews: 1,
      messages: 2,
      notifications: 4,
    },
  };
}

export function getDemoVerificationReview(
  verificationReviewPublicId: string,
): VerificationReviewDetail {
  const review =
    DEMO_VERIFICATION_REVIEWS.find(
      (item) => item.verificationReviewPublicId === verificationReviewPublicId,
    ) ?? DEMO_VERIFICATION_REVIEWS[0];

  return {
    ...review,
    verificationReviewPublicId:
      verificationReviewPublicId || review.verificationReviewPublicId,
    safeSummary: `${review.title} is a demo verification record. Restricted risk payloads and private KYC notes are intentionally excluded from this preview.`,
    latestSafeUserMessage:
      review.status === 'correction_required'
        ? 'A correction is required before this verification review can proceed.'
        : 'No customer-facing correction message is currently required.',
    latestInternalNoteLabel: 'Demo internal review note - replace with permission-aware API data.',
    documentSummary: {
      total: 3,
      pending: review.status === 'pending' ? 2 : 0,
      approved: review.status === 'approved' ? 3 : 1,
      rejected: review.status === 'correction_required' ? 1 : 0,
      replacementRequired: review.status === 'correction_required' ? 1 : 0,
    },
    messageSummary: {
      openThreads: 1,
      assignedThreads: review.assignedToLabel === 'Unassigned' ? 0 : 1,
      unreadThreads: review.status === 'pending' ? 1 : 0,
      latestMessageLabel: 'Demo verification follow-up received 18 Jul 2026, 08:56',
    },
    auditSummary: {
      highImpactActionsCount: review.priority === 'critical' ? 2 : 1,
      latestAuditLabel: 'Demo review assignment recorded 18 Jul 2026, 09:16',
    },
  };
}
