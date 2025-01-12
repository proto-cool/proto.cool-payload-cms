import { Field } from "payload";
import {
    BlockquoteFeature,
    BlocksFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineCodeFeature,
    InlineToolbarFeature,
    lexicalEditor,
    OrderedListFeature,
    UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { Code } from "@/blocks/Code";
import { Image } from "@/blocks/Image";

const RichTextContent: Field = {
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
};

export default RichTextContent;
