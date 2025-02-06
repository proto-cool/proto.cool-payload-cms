import type { Block } from "payload";

export const CoolText: Block = {
    slug: "coolText",
    interfaceName: "CoolText",
    fields: [
        {
            name: "value",
            type: "text",
            required: true,
        },
    ],
};
