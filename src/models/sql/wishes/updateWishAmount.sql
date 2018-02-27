UPDATE public.landt_wishes SET
	amount = ${newAmount}
WHERE
	id = ${wishId};
