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
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache || true
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true

# Ensure vendor directory exists (in case host volume mount masked it)
if [ ! -f /var/www/html/vendor/autoload.php ]; then
    echo "Vendor directory missing. Installing composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Ensure compiled frontend assets exist
if [ ! -d /var/www/html/public/build ] || [ ! -f /var/www/html/public/build/manifest.json ]; then
    echo "Compiled frontend assets missing in public/build."
    if [ -d /var/www/html_build ]; then
        echo "Restoring pre-compiled assets from image..."
        mkdir -p /var/www/html/public/build
        cp -r /var/www/html_build/* /var/www/html/public/build/ 2>/dev/null || true
    fi
    if [ ! -f /var/www/html/public/build/manifest.json ]; then
        echo "Building frontend assets..."
        npm run build || true
    fi
fi

# Generate app key if not set
if ! grep -q "^APP_KEY=base64:" /var/www/html/.env 2>/dev/null; then
    echo "Generating Application Key..."
    php artisan key:generate --force || true
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
