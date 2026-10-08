#!/bin/sh
set -e

# Copy .env if not exists
if [ ! -f /var/www/html/.env ]; then
    if [ -f /var/www/html/.env.docker.example ]; then
        echo "Creating .env from .env.docker.example..."
        cp /var/www/html/.env.docker.example /var/www/html/.env
    elif [ -f /var/www/html/.env.example ]; then
        echo "Creating .env from .env.example..."
        cp /var/www/html/.env.example /var/www/html/.env
    fi
fi

# Ensure storage directories exist
mkdir -p /var/www/html/storage/framework/cache/data \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/logs \
         /var/www/html/bootstrap/cache

# Fix permissions
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Generate app key if not set
if ! grep -q "^APP_KEY=base64:" /var/www/html/.env 2>/dev/null; then
    echo "Generating Application Key..."
    php artisan key:generate --force
fi

# Ensure storage link exists
php artisan storage:link || true

# Check database connection type
DB_CONN=$(grep "^DB_CONNECTION=" /var/www/html/.env 2>/dev/null | cut -d '=' -f2 | tr -d ' ' || echo "sqlite")

if [ "$DB_CONN" = "sqlite" ]; then
    mkdir -p /var/www/html/database
    if [ ! -f /var/www/html/database/database.sqlite ]; then
        echo "Creating SQLite database file..."
        touch /var/www/html/database/database.sqlite
    fi
    chmod 775 /var/www/html/database
    chmod 664 /var/www/html/database/database.sqlite
    chown -R www-data:www-data /var/www/html/database
elif [ "$DB_CONN" = "mysql" ]; then
    DB_HOST=$(grep "^DB_HOST=" /var/www/html/.env 2>/dev/null | cut -d '=' -f2 | tr -d ' ' || echo "db")
    DB_PORT=$(grep "^DB_PORT=" /var/www/html/.env 2>/dev/null | cut -d '=' -f2 | tr -d ' ' || echo "3306")
    echo "Waiting for MySQL database at $DB_HOST:$DB_PORT..."
    while ! nc -z "$DB_HOST" "$DB_PORT"; do
        sleep 1
    done
    echo "MySQL database is reachable!"
fi

echo "Starting application..."
exec "$@"
