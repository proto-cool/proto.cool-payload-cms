import type { CollectionConfig } from "payload";
import { authenticated, openAccess } from "@/utils/access";

export const Users: CollectionConfig = {
    slug: "users",
    labels: {
        singular: "User",
        plural: "Users & Authors",
    },
    admin: {
        useAsTitle: "email",
        group: "Site Settings",
    },
    access: {
        create: authenticated,
        read: openAccess,
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
