export type Image = {
    id?: string;
    uid?: string;
    filename?: string;
    status?: "processing" | "processed";
    title?: string;
    description?: string;
    category?: string;
    date?: Date;
};
