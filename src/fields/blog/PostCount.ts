import { Field, FieldAccess, PaginatedDocs } from "payload";
import { closedAccess, openAccess } from "@/utils/access";
import { Post, Tag } from "@/payload-types";

const PostCount: Field = {
    name: "postCount",
    type: "number",
    admin: {
        hidden: true, // hides the field from the admin panel
    },
    virtual: true,
    access: {
        create: closedAccess as FieldAccess,
        read: openAccess as FieldAccess,
        update: closedAccess as FieldAccess,
    },
    hooks: {
        beforeChange: [
            ({ siblingData }) => {
                // ensures data is not stored in DB
                delete siblingData["postCount"];
            },
        ],
        afterRead: [
            async ({ data, req: { payload } }) => {
                if (!data || !payload) return null;
                const { id } = data as Tag;

                const result: { totalDocs: number } = await payload.count({
                    collection: "posts",
                    where: {
                        tag: {
                            equals: id,
                        },
                    },
                });

                return result.totalDocs;
            },
        ],
    },
};

export default PostCount;
