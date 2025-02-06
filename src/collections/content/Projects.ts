import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { authenticated, openAccess } from "@/utils/access";
import RichTextContentField from "@/fields/RichTextContentField";

export const Projects: CollectionConfig = {
    slug: "projects",
    admin: {
        defaultColumns: ["name"],
        useAsTitle: "name",
        group: "Other Content Types",
    },
    access: {
        create: authenticated,
        read: openAccess,
        update: authenticated,
        delete: authenticated,
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        ...slugField("name"),
        {
            name: "url",
            label: "URL",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            required: true,
        },
        RichTextContentField(),
    ],
};

export default Projects;
