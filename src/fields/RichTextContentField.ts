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
import { CoolText } from "@/blocks/inline/CoolText";

const RichTextContentField = ({ name = "content", minimal = false } = {}): Field => ({
    name,
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
                    blocks: minimal ? [] : [Code, Image],
                    inlineBlocks: [CoolText],
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                OrderedListFeature(),
                UnorderedListFeature(),
                InlineCodeFeature(),
                ...(minimal ? [] : [HorizontalRuleFeature(), BlockquoteFeature()]),
            ];
        },
    }),
    required: true,
});

export default RichTextContentField;
