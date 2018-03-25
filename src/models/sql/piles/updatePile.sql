UPDATE
	public.landt_piles
SET
	name = ${name},
	description = ${description}
WHERE
	pile_id=${pileId};
