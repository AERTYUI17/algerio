CREATE TABLE public.sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  url text NOT NULL UNIQUE CHECK (char_length(url) BETWEEN 3 AND 255),
  category text NOT NULL CHECK (category IN ('News','Jobs','E-commerce','Gov','Education','Startups','Finance','Entertainment','Tools','Mobile','Health','Legal','Real Estate','Transport','Food','Telecom','Research','B2B','Design','Directories')),
  description text NOT NULL CHECK (char_length(description) BETWEEN 1 AND 200),
  founder text NOT NULL DEFAULT '',
  rating numeric(2,1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  views text NOT NULL DEFAULT '0',
  likes integer NOT NULL DEFAULT 0 CHECK (likes >= 0),
  verified boolean NOT NULL DEFAULT false,
  year integer NOT NULL DEFAULT EXTRACT(YEAR FROM now())::integer CHECK (year BETWEEN 1900 AND 2100),
  tags text[] NOT NULL DEFAULT '{}',
  why_algerian text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.sites TO anon, authenticated;
GRANT INSERT (name, url, category, description, founder, year, tags, why_algerian) ON public.sites TO anon, authenticated;
GRANT ALL ON public.sites TO service_role;

ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved sites are public"
ON public.sites FOR SELECT
TO anon, authenticated
USING (status = 'approved');

CREATE POLICY "Anyone can submit pending sites"
ON public.sites FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND verified = false
  AND rating = 0
  AND views = '0'
  AND likes = 0
);

CREATE OR REPLACE FUNCTION public.set_sites_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER sites_set_updated_at
BEFORE UPDATE ON public.sites
FOR EACH ROW EXECUTE FUNCTION public.set_sites_updated_at();

INSERT INTO public.sites (name, url, category, description, founder, rating, views, likes, verified, year, status) VALUES
('Ouedkniss','ouedkniss.com','E-commerce','Algeria''s largest classifieds marketplace','Mohamed Afifi',4.7,'2.3M',1240,true,2006,'approved'),
('Yassir','yassir.app','Startups','Ride-hailing and delivery super-app','Noureddine Tayebi',4.5,'890K',987,true,2017,'approved'),
('Temtem One','temtem.one','Startups','Book intercity buses online','Belkacem Bargui',4.3,'340K',654,true,2019,'approved'),
('Weilo','weilo.dz','Education','Maghreb-first online learning platform','M7M Holdings',4.6,'120K',432,true,2024,'approved'),
('Echorouk Online','echoroukonline.com','News','Algeria''s most-read Arabic news site','Echorouk Media',4.0,'5.1M',2100,true,2000,'approved'),
('Emploi Algérie','emploialgerie.com','Jobs','Top job board for Algerian professionals','',3.9,'780K',543,true,2010,'approved'),
('DLAL','dlal.dz','E-commerce','Arabic-first classifieds — Ouedkniss competitor','M7M Holdings',4.2,'45K',231,true,2024,'approved'),
('Djezzy','djezzy.dz','Telecom','Algeria''s second-largest telecom operator','',3.7,'1.2M',445,false,1999,'approved'),
('Algérie Télécom','algerie-telecom.dz','Gov','National telecom operator & internet provider','',3.5,'900K',320,true,2003,'approved'),
('ANDI','andi.dz','Gov','National investment development agency','',3.8,'200K',178,true,2001,'approved'),
('Izara','izara.com','E-commerce','Algerian online fashion marketplace','',4.1,'95K',312,false,2020,'approved'),
('Ennahar Online','ennaharonline.com','News','Major Arabic-language news portal','',3.9,'3.2M',876,true,2011,'approved');