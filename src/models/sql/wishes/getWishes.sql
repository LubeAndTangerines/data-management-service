select
  id,
  pile_link,
  wish,
  amount,
  lower(status) AS status,
  created_ts
from
  public.landt_wishes
where
  pile_link=${link} and
  status = ANY(${statuses});
