import type { CollectionConfig } from "payload";
import {
    BlockquoteFeature,
    BlocksFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineCodeFeature,
    InlineToolbarFeature,
    OrderedListFeature,
    UnorderedListFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Code } from "@/blocks/Code";
import { Image } from "@/blocks/Image";
import { slugField } from "@/fields/slug";
import ReadTime from "@/fields/blog/ReadTime";
import { authenticated, authenticatedOrPublished } from "@/accessUtils";

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
                        {
                            name: "content",
                            type: "richText",
                            label: false,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        HeadingFeature({
                                            enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                                        }),
                                        BlocksFeature({
                                            blocks: [Code, Image],
                                        }),
                                        FixedToolbarFeature(),
                                        InlineToolbarFeature(),
                                        HorizontalRuleFeature(),
                                        InlineCodeFeature(),
                                        BlockquoteFeature(),
                                        OrderedListFeature(),
                                        UnorderedListFeature(),
                                    ];
                                },
                            }),
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
};

export default Posts;
