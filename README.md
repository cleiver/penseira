# Bucket

![Bucket in development](bucket-draft.png)

Some reminders for myself 😁

## Development installation

### Docker instances

```bash
$ docker pull mysql
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=***** -d mysql
$ docker pull phpmyadmin/phpmyadmin
$ docker run --name phpmyadmin -d --link mysql:db -p 8080:80 phpmyadmin/phpmyadmin
```

## Deploy

```bash
$ export APP_ENV=prod
$ composer install --no-dev --optimize-autoloader
$ php bin/console cache:clear
$ php bin/console doctrine:migrations:migrate
```
