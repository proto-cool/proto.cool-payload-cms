import { postgresAdapter } from "@payloadcms/db-postgres";
import {
    BoldFeature,
    ItalicFeature,
    LinkFeature,
    ParagraphFeature,
    lexicalEditor,
    UnderlineFeature,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/core/Users";
import { Media } from "./collections/content/Media";
import { Posts } from "./collections/blog/Posts";
import { Tags } from "./collections/blog/Tags";
import Projects from "@/collections/content/Projects";
import { Hero } from "@/globals/hero";
import { Site } from "@/globals/site";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Posts, Tags, Projects, Media, Users],
    globals: [Hero, Site],
    cors: {
        origins: ["http://localhost:3000", "https://payload.proto.cool", "https://proto.cool"],
    },
    editor: lexicalEditor({
        features: () => {
            return [
                ParagraphFeature(),
                UnderlineFeature(),
                BoldFeature(),
                ItalicFeature(),
                LinkFeature({
                    fields: ({ defaultFields }) => {
                        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                            return !("name" in field && field.name === "url");
                        });

                        return [
                            ...defaultFieldsWithoutUrl,
                            {
                                name: "url",
                                type: "text",
                                admin: {
                                    condition: ({ linkType }) => linkType !== "internal",
                                },
                                label: ({ t }) => t("fields:enterURL"),
                                required: true,
                            },
                        ];
                    },
                }),
            ];
        },
    }),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || "",
        },
    }),
    sharp,
    plugins: [],
});
