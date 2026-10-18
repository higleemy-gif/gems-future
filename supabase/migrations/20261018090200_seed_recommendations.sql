-- ===========================================================================
-- Gems Future — seed the curated `recommendations` inventory
--
-- Real, affordable, India-relevant options (mix of online and offline). These
-- are the ONLY options the AI may recommend — it never invents entries.
--
-- Prices/URLs are indicative and should be reviewed periodically. Applied by a
-- privileged role (postgres/service_role), so RLS does not block the insert.
-- Idempotent: re-running will not create duplicates (keyed on title+provider).
-- ===========================================================================

-- Natural key so the seed can be re-run safely and so the inventory cannot
-- hold the same course from the same provider twice.
create unique index if not exists recommendations_title_provider_key
  on public.recommendations (title, provider);

insert into public.recommendations
  (title, mode, category, price_text, provider, url, region, active, sort)
values
  ('Programming in Java',
   'online', 'Computer Science',
   'Free to learn; optional certification exam ~Rs. 1,000',
   'NPTEL (IITs / IISc)',
   'https://nptel.ac.in',
   'All India', true, 10),

  ('Responsive Web Design Certification',
   'online', 'Web Development',
   'Free',
   'freeCodeCamp',
   'https://www.freecodecamp.org/learn/',
   'All India', true, 20),

  ('Python for Beginners',
   'online', 'Programming',
   'Free',
   'Spoken Tutorial, IIT Bombay',
   'https://spoken-tutorial.org',
   'All India', true, 30),

  ('Fundamentals of Digital Marketing',
   'online', 'Digital Marketing',
   'Free',
   'Google (Grow with Google)',
   'https://grow.google/intl/en_in/',
   'All India', true, 40),

  ('Google IT Support Professional Certificate',
   'online', 'IT Support',
   'Approx. Rs. 3,000-4,000 / month; financial aid available',
   'Coursera (with Google)',
   'https://www.coursera.org/professional-certificates/google-it-support',
   'All India', true, 50),

  ('Bachelor of Computer Applications (BCA)',
   'offline', 'Computer Applications (distance)',
   'Approx. Rs. 7,200 / year',
   'IGNOU',
   'https://www.ignou.ac.in',
   'All India', true, 60),

  ('O Level (Foundation Course in IT)',
   'offline', 'Information Technology',
   'Approx. Rs. 20,000 total',
   'NIELIT (MeitY, Govt of India)',
   'https://www.nielit.gov.in',
   'All India', true, 70),

  ('Electrician Trade (NCVT)',
   'offline', 'Technical Trade',
   'Approx. Rs. 1,000-7,000 / year at Government ITIs',
   'Directorate General of Training (Govt ITI)',
   'https://dgt.gov.in',
   'All India', true, 80),

  ('Short-term Skilling Programs',
   'offline', 'Vocational / Skilling',
   'Free (Government funded)',
   'PMKVY / Skill India (NSDC)',
   'https://www.pmkvyofficial.org',
   'All India', true, 90),

  ('Diploma in Engineering',
   'offline', 'Engineering Diploma',
   'Approx. Rs. 10,000-20,000 / year at Government polytechnics',
   'State Board of Technical Education',
   'https://www.aicte-india.org',
   'All India', true, 100)
on conflict (title, provider) do nothing;
