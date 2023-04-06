CREATE DATABASE `todo`;
CREATE TABLE `todo`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `description` VARCHAR(1000) NULL,
  `completed` INT NULL DEFAULT 0,
  `deleted` INT NULL DEFAULT 0,
  `createdAt` DATE NULL DEFAULT NULL,
  `updateAt` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `todo`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE,
  `password` VARCHAR(255),
  PRIMARY KEY (`id`)
);

