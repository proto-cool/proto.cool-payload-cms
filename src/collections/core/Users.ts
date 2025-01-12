import type { CollectionConfig } from "payload";
import { authenticated } from "@/accessUtils";

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
        // Email added by default
        // Add more fields as needed
    ],
};
