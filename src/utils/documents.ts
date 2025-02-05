import { BasePayload, CollectionSlug } from "payload";

type ResolvedDoc<T> = T | null;

const resolveRelationship = async <T extends Record<string, any>>(
    doc: string | number | T | null,
    collection: CollectionSlug,
    payload: BasePayload,
    fieldsToReturn?: (keyof T)[],
    depth: number = 1,
): Promise<ResolvedDoc<T>> => {
    if (!doc) return null;

    if (typeof doc === "string" || typeof doc === "number") {
        // If it's an ID, fetch the related document
        const payloadDoc = (await payload.findByID({
            collection,
            id: doc,
            depth,
        })) as unknown as T;

        if (payloadDoc) {
            return fieldsToReturn ? pickFields(payloadDoc, fieldsToReturn) : payloadDoc;
        }

        return null; // If not found
    }

    if (typeof doc === "object") {
        // If already populated, return only specified fields
        return fieldsToReturn ? pickFields(doc, fieldsToReturn) : doc;
    }

    return null; // Fallback
};

// Helper function to pick only specified fields from an object
const pickFields = <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    fields: K[],
): Pick<T, K> => {
    return fields.reduce(
        (result, key) => {
            if (obj[key] !== undefined) {
                result[key] = obj[key];
            }
            return result;
        },
        {} as Pick<T, K>,
    );
};

export { resolveRelationship };
