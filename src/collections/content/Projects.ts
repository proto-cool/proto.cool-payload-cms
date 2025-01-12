import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { authenticated, openAccess } from "@/accessUtils";
import RichTextContent from "@/fields/richTextContent";

export const Projects: CollectionConfig = {
    slug: "projects",
    admin: {
        defaultColumns: ["name"],
        useAsTitle: "name",
        group: "Content Collections",
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
            type: "text",
            required: true,
        },
        RichTextContent,
    ],
};

export default Projects;
