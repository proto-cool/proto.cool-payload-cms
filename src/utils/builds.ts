import { BasePayload } from "payload";
import * as process from "node:process";

const callBuildURL = async ({ payload }: { payload: BasePayload }) => {
    const siteGlobals = await payload.findGlobal({
        slug: "site",
    });
    const buildsEnabled: boolean = siteGlobals.siteSettings!.enableBuilds ?? false;

    if (buildsEnabled && process.env.NODE_ENV === "production") {
        const buildUrl = process.env.FRONTEND_BUILD_URL || "";
        if (!!buildUrl)
            await fetch(buildUrl, {
                method: "POST",
            });
    }
};

function getChangedKeys(
    obj1: Record<string, any>,
    obj2: Record<string, any>,
    prefix = "",
): string[] {
    const changes = [];

    for (const key in obj1) {
        // Skip keys that should be ignored
        if (key === "updatedAt" || key === "createdAt") {
            continue;
        }

        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (isObject(obj1[key]) && isObject(obj2[key])) {
            // Recursively check nested objects
            changes.push(...getChangedKeys(obj1[key], obj2[key], fullKey));
        } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            // Compare arrays
            if (!areArraysEqual(obj1[key], obj2[key])) {
                changes.push(fullKey);
            }
        } else if (obj1[key] !== obj2[key]) {
            // Key value changed
            changes.push(fullKey);
        }
    }

    return changes;
}

function isObject(value: any): boolean {
    return value && typeof value === "object" && !Array.isArray(value);
}

function areArraysEqual(arr1: string | any[], arr2: string | any[]) {
    if (arr1.length !== arr2.length) return false;

    // Compare each element in the array
    for (let i = 0; i < arr1.length; i++) {
        if (isObject(arr1[i]) && isObject(arr2[i])) {
            if (getChangedKeys(arr1[i], arr2[i]).length > 0) return false; // Objects inside arrays differ
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

export { callBuildURL, getChangedKeys };
