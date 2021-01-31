#!/bin/ash

set -e

/start.sh

USE_LISTEN_PORT=${LISTEN_PORT:-8080}

cp /app/nginx.conf /etc/nginx/nginx.conf

export PYTHONPATH=$PYTHONPATH:/usr/local/lib/$ALPINEPYTHON/site-packages:/usr/lib/$ALPINEPYTHON/site-packages

python3 manage.py db migrate

exec "$0"

