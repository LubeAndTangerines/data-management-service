select
  id,
  wish,
  amount,
  lower(status) AS status,
  created_ts
from
  public.landt_wishes
where
  link=${link} and
  status = ANY(${statuses});
