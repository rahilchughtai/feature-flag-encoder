import { EnvironmentOption, FeatureFlagChipData, TenantOption } from "../models/featureFlagModel";

export function encodeFlags(featureFlags: FeatureFlagChipData[]): string {
    const payload: Record<string, string> = {}
    featureFlags.forEach(flag => {
        const isFFEnabled = flag.enabled.valueOf().toString()
        payload[flag.label] = isFFEnabled;
    });
    return btoa(JSON.stringify(payload));
}

export function generateURL(tenant: string, environment: string, encoding:string): string {
    if (tenant === '' || environment === '') { return '' }
    return `https://shop-uat.${tenant}/${environment}/availability/?trace=true`

}

//https://shop-uat.lufthansa.com/lh/booking-ci/availability/0


//https://shop.uat.lufthansa.com/lh/booking-ci/availability/0?flagsOverride=eyJGU0QtMzAyMCI6InRydWUiLCJBQ0YtMTAyIjoidHJ1ZSJ9?trace=true