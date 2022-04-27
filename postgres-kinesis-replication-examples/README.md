# Postgres Logical Replication Example with wal2json / localstack / kinesis / docker

- Creates a postgres database preloaded with world.sql, logical decoding enabled and wal2json and test_decodinig logical decoding plugins preloaded
- Creates a replication slot and listens to messages on the WAL, sending them to a kinesis stream setup with localstack.
- Spins up localstack and with a firehose rule to use kinesis as the source and direct put to an s3 bucket.

## Running locally

1. run `source .env`
2. run `docker-compose up -d`
3. run `psql -h localhost -c "INSERT INTO city(name, countrycode, district, population) VALUES('Kabu', 'AFG', 'Kabol', 1780000) RETURNING *;"`
4. see below

   ```bash
   awslocal s3 cp --recursive s3://replication-bucket-wal2json/firehose/ ./tmp/wal2json
   awslocal s3 cp --recursive s3://replication-bucket-testdecoding/firehose/ ./tmp/testdecoding
   ```

5. You can tail logs by using one of the following.

   ```bash
   docker logs -f replication_examples_stream_wal2json_1
   docker logs -f replication_examples_stream_postgres_1
   docker logs -f replication_examples_stream_testdecoding_1
   docker logs -f replication_examples_stream_localstack_1
   ```

### TODO

- Update localstack to support lambda pre processing options for firehose prior to sending to S3.
