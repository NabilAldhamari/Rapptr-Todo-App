CREATE TABLE `todo`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `description` VARCHAR(1000) NULL,
  `completed` INT NULL DEFAULT 0,
  `deleted` INT NULL DEFAULT 0,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `todo`.`todo` (`id`, `title`, `description`, `completed`, `deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Submit homework assignment for review!', 'Review code while waiting for feedback, proceed to feel bad about the bugs you missed!', 0, 0, NOW(), NOW()),
(2, 'Upgrade the SAML-SP open-source project', 'Apply S.O.L.I.D principles and design patterns to make the library more robust.', 0, 0, NOW(), NOW());

CREATE TABLE `todo`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE,
  `password` VARCHAR(255),
  PRIMARY KEY (`id`)
);

INSERT INTO `todo`.`user` (`id`, `username`, `password`) VALUES (1, 'nabil', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e');

