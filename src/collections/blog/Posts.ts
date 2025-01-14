import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import ReadTime from "@/fields/blog/ReadTime";
import { authenticated, authenticatedOrPublished } from "@/accessUtils";
import RichTextContent from "@/fields/richTextContent";

export const Posts: CollectionConfig = {
    slug: "posts",
    admin: {
        defaultColumns: ["title"],
        useAsTitle: "title",
        group: "Blog Collections",
    },
    access: {
        create: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
        delete: authenticated,
    },
    versions: {
        drafts: true,
        maxPerDoc: 10,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "Meta",
                    fields: [
                        {
                            name: "title",
                            type: "text",
                            required: true, // Make this field required
                        },
                        ...slugField(),
                        {
                            name: "subtitle",
                            type: "text",
                            required: false,
                        },
                        {
                            name: "tag",
                            type: "relationship",
                            relationTo: "tags",
                            required: true,
                        },
                        {
                            name: "description",
                            type: "textarea",
                            required: true,
                        },
                        ReadTime,
                    ],
                },
                {
                    label: "Content",
                    fields: [
                        {
                            name: "heroImage",
                            type: "upload",
                            relationTo: "media",
                            required: false,
                        },
                        RichTextContent,
                    ],
                },
            ],
        },
    ],
};

export default Posts;
