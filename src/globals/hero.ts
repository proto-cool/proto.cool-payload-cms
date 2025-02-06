import type { GlobalConfig } from "payload";
import { authenticated, openAccess } from "@/utils/access";
import { buildFrontend, getChangedKeys } from "@/utils/builds";
import RichTextContentField from "@/fields/RichTextContentField";

export const Hero: GlobalConfig = {
    slug: "hero",
    label: "Hero Section Content",
    admin: {
        group: "Other Content Types",
    },
    access: {
        read: openAccess,
        update: authenticated,
    },
    hooks: {
        afterChange: [
            async ({ doc, previousDoc, req: { payload } }) => {
                const changedKeys = getChangedKeys(doc, previousDoc);

                if (changedKeys.length === 0) return;

                await buildFrontend({ payload });
            },
        ],
    },
    fields: [RichTextContentField({ minimal: true })],
};
