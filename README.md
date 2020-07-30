![GitHub language count](https://img.shields.io/github/languages/count/cleiver/bucket?style=plastic)
![GitHub](https://img.shields.io/github/license/cleiver/bucket?style=plastic)

<h1 align="center"><img src="bucket.png" alt="Bucket logo" /><br>Bucket</h1>


## So, what's this? 🤔
I have this thing where instead of saving a page for later, I keep it as an open tab on my smartphone. After losing many interesting pages because chrome simply vanish with my tabs, I decided to join my willing to develop something with the need to keep these links safe.

## 💻 Development installation

### 📃 Prerequisites
- [Git](https://git-scm.com)
- [Composer](https://getcomposer.org)
- [Docker](https://www.docker.com)
- [Symfony CLI](https://symfony.com/download)

### ⤵ Download and installation

```bash
# Cloning repository
$ https://github.com/cleiver/bucket.git
```

### 🐳 MySQL Database

```bash
# Download and run mysql image
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 -d mysql:5.7

# Create database
$ docker exec -it mysql bash
$ mysql -u root -p
mysql> create database bucket;
```

---

<p align="center">👷🚧 This document is still under construction 🏗</p>

## 🎓 Deploy

```bash
$ export APP_ENV=prod
$ composer install --no-dev --optimize-autoloader
$ php bin/console cache:clear
$ php bin/console doctrine:migrations:migrate
```
