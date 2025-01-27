import type { GlobalConfig } from "payload";
import { authenticated, openAccess } from "@/utils/access";
import { callBuildURL } from "@/utils/builds";

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
            async ({ req: { payload } }) => {
                await callBuildURL({ payload });
            },
        ],
    },
    fields: [
        {
            name: "name",
            label: "Site Name",
            type: "text",
            required: true,
        },
        {
            name: "author",
            label: "Author Name",
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
