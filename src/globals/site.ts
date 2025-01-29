import type { GlobalConfig } from "payload";
import { authenticated, openAccess } from "@/utils/access";
import { callBuildURL, getChangedKeys } from "@/utils/builds";

export const SiteGlobals: GlobalConfig = {
    slug: "site",
    label: "Core Site Settings",
    admin: {
        group: "Site Settings",
    },
    access: {
        read: openAccess,
        update: authenticated,
    },
    hooks: {
        afterChange: [
            async ({ doc, previousDoc, req: { payload } }) => {
                // if the only changed key is the build, don't send the build
                const changedKeys = getChangedKeys(doc, previousDoc);

                if (
                    changedKeys.length === 0 ||
                    (changedKeys.length === 1 && changedKeys[0] === "site-settings.enable-builds")
                )
                    return;

                await callBuildURL({ payload });
            },
        ],
    },
    fields: [
        {
            label: "Site Metadata",
            type: "collapsible",
            fields: [
                {
                    name: "name",
                    label: "Site Name",
                    type: "text",
                    required: true,
                },
                {
                    name: "title",
                    label: "Site Title",
                    type: "text",
                    required: true,
                },
                {
                    name: "description",
                    label: "Site Description",
                    type: "textarea",
                    required: true,
                },
                {
                    name: "author",
                    label: "Author Name",
                    type: "text",
                    required: true,
                },
                {
                    name: "author-photo",
                    label: "Author Photo",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                },
                {
                    name: "nav",
                    label: "Navigation Links",
                    type: "array",
                    fields: [
                        {
                            name: "label",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "link",
                            type: "text",
                            required: true,
                        },
                    ],
                },
                {
                    name: "social",
                    label: "Social Links",
                    type: "array",
                    fields: [
                        {
                            name: "platform",
                            options: [
                                "behance",
                                "bluesky",
                                "codepen",
                                "dev",
                                "discord",
                                "dribbble",
                                "email",
                                "facebook",
                                "github",
                                "instagram",
                                "linkedin",
                                "mastodon",
                                "medium",
                                "pinterest",
                                "producthunt",
                                "reddit",
                                "slack",
                                "snapchat",
                                "telegram",
                                "threads",
                                "tiktok",
                                "twitch",
                                "whatsapp",
                                "youtube",
                            ],
                            required: true,
                            type: "select",
                        },
                        {
                            name: "label",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "link",
                            type: "text",
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "code-injection",
            label: "Code Injection (analytics, etc. - goes into <head>)",
            type: "textarea",
            required: false,
        },
        {
            name: "site-settings",
            label: "Site Settings",
            type: "group",
            admin: {
                position: "sidebar",
            },
            fields: [
                {
                    name: "enable-builds",
                    label: "Enable Builds (for GH/CF Pages, etc)",
                    type: "checkbox",
                    defaultValue: false,
                },
                {
                    name: "use-view-transitions",
                    label: "Use View Transition API",
                    type: "checkbox",
                    defaultValue: true,
                },
                {
                    name: "use-animations",
                    type: "checkbox",
                    defaultValue: true,
                },
            ],
        },
    ],
};
