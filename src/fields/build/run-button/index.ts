import type { Field } from "payload";

export const runBuildButton = ({ sidebar = false }): Field => {
    return {
        name: "runBuildButton",
        type: "ui",
        admin: {
            position: sidebar ? "sidebar" : undefined,
            components: {
                Field: {
                    path: "@/fields/build/run-button/RunBuildButtonComponent#RunBuildButtonComponent",
                },
            },
        },
    };
};
