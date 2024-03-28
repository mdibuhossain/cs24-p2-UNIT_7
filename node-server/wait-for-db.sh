#!/bin/bash

# Wait for PostgreSQL to be ready
until PGPASSWORD=root psql -h "postgresDB" -U "postgres" -c '\l'; do
  echo "Waiting for PostgreSQL to become available..."
  sleep 1
done

echo "PostgreSQL is ready!"

# Execute the command to start the backend service
exec "$@"
