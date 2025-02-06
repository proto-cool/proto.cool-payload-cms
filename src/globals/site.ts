import type { BasePayload, GlobalConfig } from "payload";
import { authenticated, openAccess } from "@/utils/access";
import { buildFrontend, getChangedKeys } from "@/utils/builds";
import { resolveRelationship } from "@/utils/documents";
import { runBuildButton } from "@/fields/build/run-button";

export const SiteGlobals: GlobalConfig = {
    slug: "site",
    label: "Metadata & Build Settings",
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
                    (changedKeys.length === 1 && changedKeys[0] === "siteSettings.enableBuilds")
                )
                    return;

                if (doc.siteSettings.enableBuilds) await buildFrontend({ payload });
            },
        ],
        afterRead: [
            async ({ doc, req: { payload } }) => {
                if (doc.author) {
                    doc.author = await resolveRelationship(doc.author, "users", payload, [
                        "id",
                        "displayName",
                        "avatar",
                    ]);

                    if (doc.author) {
                        doc.author.avatar = await resolveRelationship(
                            doc.author.avatar,
                            "media",
                            payload,
                        );
                    }
                }

                return doc;
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
                    type: "relationship",
                    relationTo: "users",
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
                                "applemusic",
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
            name: "codeInjection",
            label: "Code Injection (analytics, etc. - goes into <head>)",
            type: "textarea",
            required: false,
        },
        {
            name: "siteSettings",
            label: "Site Settings",
            type: "group",
            admin: {
                position: "sidebar",
            },
            fields: [
                {
                    name: "timezone",
                    label: "Timezone",
                    type: "select",
                    options: [
                        { label: "Africa/Abidjan (UTC+0)", value: "Africa/Abidjan" },
                        { label: "Africa/Cairo (UTC+2)", value: "Africa/Cairo" },
                        { label: "Africa/Nairobi (UTC+3)", value: "Africa/Nairobi" },
                        {
                            label: "America/New_York (UTC-5 / UTC-4 DST)",
                            value: "America/New_York",
                        },
                        { label: "America/Toronto (UTC-5 / UTC-4 DST)", value: "America/Toronto" },
                        {
                            label: "America/Mexico_City (UTC-6 / UTC-5 DST)",
                            value: "America/Mexico_City",
                        },
                        { label: "America/Chicago (UTC-6 / UTC-5 DST)", value: "America/Chicago" },
                        { label: "America/Denver (UTC-7 / UTC-6 DST)", value: "America/Denver" },
                        { label: "America/Phoenix (UTC-7)", value: "America/Phoenix" },
                        {
                            label: "America/Los_Angeles (UTC-8 / UTC-7 DST)",
                            value: "America/Los_Angeles",
                        },
                        {
                            label: "America/Anchorage (UTC-9 / UTC-8 DST)",
                            value: "America/Anchorage",
                        },
                        { label: "America/Adak (UTC-10 / UTC-9 DST)", value: "America/Adak" },
                        { label: "Pacific/Honolulu (UTC-10)", value: "Pacific/Honolulu" },
                        { label: "Pacific/Midway (UTC-11)", value: "Pacific/Midway" },
                        { label: "Pacific/Kiritimati (UTC+14)", value: "Pacific/Kiritimati" },
                        { label: "Asia/Tokyo (UTC+9)", value: "Asia/Tokyo" },
                        { label: "Asia/Shanghai (UTC+8)", value: "Asia/Shanghai" },
                        { label: "Asia/Bangkok (UTC+7)", value: "Asia/Bangkok" },
                        { label: "Asia/Dhaka (UTC+6)", value: "Asia/Dhaka" },
                        { label: "Asia/Kolkata (UTC+5:30)", value: "Asia/Kolkata" },
                        { label: "Asia/Tehran (UTC+3:30 / UTC+4:30 DST)", value: "Asia/Tehran" },
                        { label: "Asia/Dubai (UTC+4)", value: "Asia/Dubai" },
                        { label: "Asia/Kabul (UTC+4:30)", value: "Asia/Kabul" },
                        { label: "Europe/London (UTC+0 / UTC+1 DST)", value: "Europe/London" },
                        { label: "Europe/Dublin (UTC+0 / UTC+1 DST)", value: "Europe/Dublin" },
                        { label: "Europe/Paris (UTC+1 / UTC+2 DST)", value: "Europe/Paris" },
                        { label: "Europe/Berlin (UTC+1 / UTC+2 DST)", value: "Europe/Berlin" },
                        { label: "Europe/Rome (UTC+1 / UTC+2 DST)", value: "Europe/Rome" },
                        { label: "Europe/Madrid (UTC+1 / UTC+2 DST)", value: "Europe/Madrid" },
                        { label: "Europe/Moscow (UTC+3)", value: "Europe/Moscow" },
                        {
                            label: "Australia/Sydney (UTC+10 / UTC+11 DST)",
                            value: "Australia/Sydney",
                        },
                        {
                            label: "Australia/Melbourne (UTC+10 / UTC+11 DST)",
                            value: "Australia/Melbourne",
                        },
                        { label: "Australia/Brisbane (UTC+10)", value: "Australia/Brisbane" },
                        {
                            label: "Australia/Adelaide (UTC+9:30 / UTC+10:30 DST)",
                            value: "Australia/Adelaide",
                        },
                        { label: "Australia/Perth (UTC+8)", value: "Australia/Perth" },
                        { label: "Antarctica/Palmer (UTC-3)", value: "Antarctica/Palmer" },
                        {
                            label: "Antarctica/McMurdo (UTC+12 / UTC+13 DST)",
                            value: "Antarctica/McMurdo",
                        },
                    ],
                    required: true,
                    defaultValue: "America/New_York",
                },
                {
                    name: "useViewTransitions",
                    label: "Use View Transition API",
                    type: "checkbox",
                    defaultValue: true,
                },
                {
                    name: "useAnimations",
                    type: "checkbox",
                    defaultValue: true,
                },
                {
                    name: "enableBuilds",
                    label: "Enable Builds (for GH/CF Pages, etc)",
                    type: "checkbox",
                    defaultValue: false,
                },
                runBuildButton({ sidebar: true }),
            ],
        },
    ],
};
