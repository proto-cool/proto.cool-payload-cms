import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { authenticated, openAccess } from "@/accessUtils";

export const Tags: CollectionConfig = {
    slug: "tags",
    admin: {
        defaultColumns: ["text"],
        useAsTitle: "text",
        group: "Blog Collections",
    },
    access: {
        create: authenticated,
        read: openAccess,
        update: authenticated,
        delete: authenticated,
    },
    fields: [
        {
            name: "text",
            type: "text",
            required: true,
        },
        ...slugField("text", {
            slugOverrides: {
                admin: {
                    position: undefined,
                },
            },
            checkboxOverrides: {
                admin: {
                    hidden: true,
                    position: undefined,
                },
            },
        }),
        {
            name: "description",
            type: "text",
            required: false,
        },
    ],
};

export default Tags;
