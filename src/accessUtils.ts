import type { Access } from "payload";

export const openAccess: Access = () => true;
export const closedAccess: Access = () => false;

export const authenticated: Access = ({ req: { user } }): boolean => {
    return Boolean(user);
};

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
    if (user) {
        return true;
    }

    return {
        _status: {
            equals: "published",
        },
    };
};
