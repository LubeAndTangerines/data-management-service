select
  id,
  name,
  description,
  link
from
  public.landt_piles
where
  id = lastval();