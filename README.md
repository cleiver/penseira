# Bucket

![Bucket in development](bucket-draft.png)

Some reminders for myself 😁

## Development installation

### Docker instances

```bash
$ docker pull mysql
```

```bash
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=***** -d mysql
```

```bash
$ docker pull phpmyadmin/phpmyadmin
```

```bash
$ docker run --name phpmyadmin -d --link mysql:db -p 8080:80 phpmyadmin/phpmyadmin
```
