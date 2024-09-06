import { FeatureFlagChipData } from "../models/featureFlagModel";

export function encodeFlags(featureFlags: FeatureFlagChipData[]): string {
    const payload: Record<string, boolean> = {}
    if(featureFlags.length === 0) {
        return 'No flags to encode';
    }
    featureFlags.forEach(flag => {
        const isFFEnabled = flag.enabled.valueOf()
        payload[flag.label] = isFFEnabled;
    });
    return btoa(JSON.stringify(payload));
}