FROM postgres:10 AS postgres_wal2json

RUN apt-get update && apt-get install postgresql-10-wal2json

FROM postgres_wal2json

COPY ./docker-scripts/init/pg/ /docker-entrypoint-initdb.d/

RUN chmod 0666 ./docker-entrypoint-initdb.d/setup_replication.sh