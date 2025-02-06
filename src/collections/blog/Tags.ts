import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { authenticated, openAccess } from "@/utils/access";
import PostCount from "@/fields/blog/PostCount";

export const Tags: CollectionConfig = {
    slug: "tags",
    admin: {
        defaultColumns: ["text"],
        useAsTitle: "text",
        group: "Blog Content",
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
        ...slugField("text"),
        {
            name: "description",
            type: "text",
            required: false,
        },
        PostCount,
    ],
};

export default Tags;
