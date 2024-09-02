export interface FeatureFlagChipData {
    key: number;
    label: string;
    enabled: boolean;
}

export interface FeatureFlagEncoding {
    encodingTitle?: string;
    encoding: string;
    featureFlags: FeatureFlagChipData[];
}

export interface TenantOption {
    tenantId: string;
    URLPrefix: string;
}

export interface EnvironmentOption {
    environmentName: string;
    environmentURL: string;
}

export const ALL_TENANTS: TenantOption[] = [
    {
        tenantId: 'LH',
        URLPrefix: 'lufthansa.com/lh'
    },
    {
        tenantId: 'LX',
        URLPrefix: 'swiss.com/lx/'
    },
    {
        tenantId: 'OS',
        URLPrefix: 'austrian.com/os/'
    },
    {
        tenantId: 'SN',
        URLPrefix: 'brusselsairlines.com/sn/'
    },
]

export const ALL_ENVIRONMENTS: EnvironmentOption[] = [
    {
        environmentName: 'UAT',
        environmentURL: 'shop-uat'
    },
    {
        environmentName: 'BOOKING-CI',
        environmentURL: 'booking-ci'
    },
    {
        environmentName: 'PRE-PROD',
        environmentURL: 'pre-prod'
    }
]