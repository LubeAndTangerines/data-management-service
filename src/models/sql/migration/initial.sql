-- clean up

DROP TRIGGER IF EXISTS update_modified_timestamp on public.lubes_and_tangerines;

begin;

create table if not exists public.lubes_and_tangerines (
    id serial primary key,
    rid char(36) not null,
    created_ts	 timestamp with time zone default now(),
    modified_ts timestamp with time zone default now()
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_ts = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modified_timestamp
    BEFORE UPDATE ON public.lubes_and_tangerines
        FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();

commit;

