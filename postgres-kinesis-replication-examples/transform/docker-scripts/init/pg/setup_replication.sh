# !/bin/bash
echo "host replication all 0.0.0.0/0 md5" >>"$PGDATA/pg_hba.conf"

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

CREATE USER $POSTGRES_USER_REP REPLICATION LOGIN CONNECTION LIMIT 100 ENCRYPTED PASSWORD '$POSTGRES_PASSWORD_REP';

EOSQL

set -e
cat >>${PGDATA}/postgresql.conf <<EOF
wal_level = logical
max_wal_senders = 5
max_replication_slots = 5
wal_sender_timeout = 0
EOF
