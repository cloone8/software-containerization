#! /bin/ash

sleep 10;

python manage.py db migrate
python manage.py db upgrade
