--
-- PostgreSQL port of the MySQL "World" database.
--
-- The sample data used in the world database is Copyright Statistics 
-- Finland, http://www.stat.fi/worldinfigures.
--

BEGIN;

    SET client_encoding
    = 'LATIN1';


CREATE TABLE product
(
    _id SERIAL PRIMARY KEY,
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    price numeric,
    version TEXT NULL,
    type TEXT NULL
);

COPY product(id,name, price, version, type) FROM stdin;
09 	Gem Visa	99.99	v1	CREDIT_CARD
10 	28 Degrees	49.49	v1	CREDIT_CARD
11 	MyFlexiPay	16.5	v2	PERSONAL_LOAN
\.

COMMIT;

ANALYZE product;
