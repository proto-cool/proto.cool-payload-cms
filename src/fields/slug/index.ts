import type { CheckboxField, FieldAccess, TextField } from "payload";

import { formatSlugHook } from "./formatSlug";
import { authenticated, openAccess } from "@/utils/access";

type Slug = (fieldToUse?: string, sidebar?: boolean) => [TextField, CheckboxField];

export const slugField: Slug = (fieldToUse = "title", sidebar = false) => {
    const checkBoxField: CheckboxField = {
        name: "slugLock",
        type: "checkbox",
        defaultValue: true,
        admin: {
            hidden: true,
            position: sidebar ? "sidebar" : undefined,
        },
        access: {
            create: authenticated as FieldAccess,
            read: authenticated as FieldAccess,
            update: authenticated as FieldAccess,
        },
    };

    // Expect ts error here because of typescript mismatching Partial<TextField> with TextField
    const slugField: TextField = {
        name: "slug",
        type: "text",
        index: true,
        label: "Slug",
        hooks: {
            // Kept this in for hook or API based updates
            beforeValidate: [formatSlugHook(fieldToUse)],
        },
        access: {
            create: authenticated as FieldAccess,
            read: openAccess as FieldAccess,
            update: authenticated as FieldAccess,
        },
        admin: {
            position: sidebar ? "sidebar" : undefined,
            components: {
                Field: {
                    path: "@/fields/slug/SlugComponent#SlugComponent",
                    clientProps: {
                        fieldToUse,
                        checkboxFieldPath: checkBoxField.name,
                    },
                },
            },
        },
    };

    return [slugField, checkBoxField];
};
