import type { CollectionConfig } from "payload";
import { authenticated, openAccess } from "@/utils/access";

export const Media: CollectionConfig = {
    slug: "media",
    admin: {
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
            name: "alt",
            type: "text",
            required: true,
        },
    ],
    upload: {
        staticDir: "/app/media",
        mimeTypes: ["image/*"],
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "medium",
                width: 1024,
                height: 768,
                position: "centre",
            },
        ],
        adminThumbnail: "thumbnail",
    },
};
