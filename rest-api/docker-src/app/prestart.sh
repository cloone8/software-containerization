#! /bin/ash

sleep 10;

echo "Begininng DB setup..."

(python manage.py db init 2>&1)
(python manage.py db migrate 2>&1)
(python manage.py db upgrade 2>&1)
