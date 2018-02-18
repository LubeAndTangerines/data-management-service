-- clean up

DROP TRIGGER IF EXISTS update_modified_timestamp on public.landt_piles;
DROP TRIGGER IF EXISTS update_modified_timestamp on public.landt_wishes;

begin;

create table if not exists public.landt_piles (
    id serial primary key,
    rid char(36) not null,
    name varchar(50) not null,
    description varchar(255),
    link char(36) default null UNIQUE ,
    created_ts	 timestamp with time zone default now(),
    modified_ts timestamp with time zone default now()
);

create table if not exists public.landt_wishes (
    id SERIAL primary key,
    pile_id SERIAL REFERENCES public.landt_piles (id) NOT NULL,
    rid char(36) not null,
    wish varchar(255) not null,
    amount int not null DEFAULT 1,
    status varchar(30) not null default 'WISHED',
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
    BEFORE UPDATE ON public.landt_piles
        FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
commit;

CREATE TRIGGER update_modified_timestamp
    BEFORE UPDATE ON public.landt_wishes
        FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
commit;

