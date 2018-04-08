const UPDATE_FIELDS = {
	status: 'status',
	amount: 'amount',
	description: 'description',
};

// All statuses.
const STATUSES = {
	wished: 'WISHED',
	checked: 'CHECKED',
	archived: 'ARCHIVED',
};


// Statuses that can be updated from key to any of value[x].
const ALLOWED_STATUS_CHANGE = {
	// When wished, status can only be changed into checked.
	WISHED: [
		STATUSES.checked,
	],
	// Checked status can either be changed back to wished, or archived.
	CHECKED: [
		STATUSES.wished,
		STATUSES.archived,
	],
	// Archived statuses can only be changed back to checked.
	ARCHIVED: [
		STATUSES.checked,
	],
};

module.exports = {
	UPDATE_FIELDS,
	STATUSES,
	ALLOWED_STATUS_CHANGE,
};