import type { CollectionConfig } from "payload";
import { authenticated } from "@/utils/access";

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "email",
        group: "Core Collections",
    },
    access: {
        create: authenticated,
        read: authenticated,
        update: authenticated,
        delete: authenticated,
    },
    auth: true,
    fields: [
        {
            type: "text",
            name: "displayName",
            defaultValue: "John Doe",
            required: true,
        },
        {
            name: "avatar",
            type: "upload",
            relationTo: "media",
            required: false,
        },
    ],
};
