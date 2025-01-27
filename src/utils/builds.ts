import { BasePayload } from "payload";
import * as process from "node:process";

const callBuildURL = async ({ payload }: { payload: BasePayload }) => {
    const siteGlobals = await payload.findGlobal({
        slug: "site",
    });
    const buildsEnabled: boolean = siteGlobals["site-settings"]!["enable-builds"]!;

    if (buildsEnabled && process.env.NODE_ENV === "production") {
        const buildUrl = process.env.FRONTEND_BUILD_URL || "";
        if (!!buildUrl)
            await fetch(buildUrl, {
                method: "POST",
            });
    }
};

export { callBuildURL };
