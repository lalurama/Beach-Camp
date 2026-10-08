# ==========================================
# Stage 1: Build Frontend Assets (Vite + React)
# ==========================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY resources ./resources
COPY public ./public
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js* ./

RUN npm run build

# ==========================================
# Stage 2: PHP 8.3 FPM Application Container
# ==========================================
FROM php:8.3-fpm-alpine

# Set Working Directory
WORKDIR /var/www/html

# Install System Utilities & Netcat for health checks
RUN apk add --no-cache \
    git \
    curl \
    unzip \
    netcat-openbsd \
    nodejs \
    npm

# Install PHP Extensions via official extension installer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions \
    pdo_mysql \
    pdo_sqlite \
    sqlite3 \
    zip \
    gd \
    bcmath \
    intl \
    opcache \
    pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Custom PHP Configuration
COPY docker/php/local.ini /usr/local/etc/php/conf.d/local.ini

# Copy Entrypoint Script
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy Application Code
COPY . /var/www/html

# Copy Compiled Assets from Stage 1
COPY --from=frontend-builder /app/public/build /var/www/html/public/build

# Install PHP Dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Ensure Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose Port for PHP-FPM
EXPOSE 9000

# Set Entrypoint and Default Command
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
