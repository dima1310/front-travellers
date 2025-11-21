export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
