select
  id,
  wish,
  amount,
  status,
  created_ts
from
  public.landt_wishes
where
  pile_id=${pileId} and
  status = ANY(${statuses});
