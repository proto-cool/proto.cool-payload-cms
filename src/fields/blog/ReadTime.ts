import { Field, RichTextField, Tab, TabsField } from "payload";
import { $getRoot } from "lexical";
import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless";
import {
    getEnabledNodes,
    LexicalRichTextAdapter,
    SanitizedServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import getReadingTime from "reading-time";

const ReadTime: Field = {
    name: "readTime",
    type: "text",
    admin: {
        hidden: true, // hides the field from the admin panel
    },
    hooks: {
        beforeChange: [
            ({ siblingData }) => {
                // ensures data is not stored in DB
                delete siblingData["readTime"];
            },
        ],
        afterRead: [
            ({ data, collection }) => {
                if (!data || !collection) return null;
                const { content } = data;

                const tabs: Tab[] = (
                    collection.fields.find((field) => field.type === "tabs") as TabsField
                ).tabs as Tab[];

                const contentTab = tabs.find((tab) => tab.label === "Content");

                const contentField = contentTab?.fields.find(
                    (field) => field.type === "richText",
                ) as RichTextField;

                const lexicalAdapter: LexicalRichTextAdapter =
                    contentField.editor as LexicalRichTextAdapter;

                const sanitizedServerEditorConfig: SanitizedServerEditorConfig =
                    lexicalAdapter.editorConfig;

                const headlessEditor = createHeadlessEditor({
                    nodes: getEnabledNodes({
                        editorConfig: sanitizedServerEditorConfig,
                    }),
                });

                const parsedEditorState = headlessEditor.parseEditorState(JSON.stringify(content));
                const editorStatePlainText = parsedEditorState.read(() =>
                    $getRoot().getTextContent(),
                );

                return getReadingTime(editorStatePlainText).text;
            },
        ],
    },
};

export default ReadTime;
