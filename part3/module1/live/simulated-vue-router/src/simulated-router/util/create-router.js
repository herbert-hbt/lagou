export default function createRouter(record, path) {
    const matched = [];
    while (record) {
        matched.unshift(record);
        record = record.parent;
    }
    return {
        path,
        matched
    }
}