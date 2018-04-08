select
  id,
  wish,
  amount,
  lower(status) AS status,
  created_ts
from
  public.landt_wishes
where
  pile_id=${pileId} and
  status = ANY(${statuses});
