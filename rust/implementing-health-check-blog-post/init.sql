SELECT 'CREATE DATABASE member'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'member')\gexec