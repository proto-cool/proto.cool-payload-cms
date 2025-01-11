import type { Block } from "payload";

export const Code: Block = {
    slug: "code",
    interfaceName: "CodeBlock",
    fields: [
        {
            name: "language",
            type: "select",
            defaultValue: "typescript",
            options: [
                {
                    label: "TypeScript",
                    value: "typescript",
                },
                {
                    label: "JavaScript",
                    value: "javascript",
                },
                {
                    label: "HTML",
                    value: "html",
                },
                {
                    label: "CSS",
                    value: "css",
                },
                {
                    label: "Python",
                    value: "python",
                },
                {
                    label: "Bash",
                    value: "bash",
                },
                {
                    label: "PowerShell",
                    value: "powershell",
                },
            ],
        },
        {
            name: "code",
            type: "code",
            label: false,
            required: true,
        },
    ],
};
