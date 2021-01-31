#! /bin/ash

sleep 10;

echo "Begininng DB setup..."

if (python manage.py db upgrade 2>&1) ;  then
	echo "Successfully setup DB!"
else
	echo "DB setup failed, dropping to shell..."
	exec /bin/ash
fi
