select
  id,
  name,
  description
from
  public.landt_piles
where
  id=lastval();