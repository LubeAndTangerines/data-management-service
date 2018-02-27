const STATUSES = {
    wished: 'WISHED',
    checked: 'CHECKED',
    archived: 'ARCHIVED',
};

// From checked -> any of these
const STATUS_FROM_CHECKED = [
    STATUSES.archived,
];

module.exports = {
    STATUSES,
    STATUS_FROM_CHECKED,
};