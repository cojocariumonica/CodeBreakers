CREATE DATABASE IF NOT EXISTS `BugReporting` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `BugReporting`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL,
  `project_name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `repository` varchar(255) NOT NULL,
  `project_team` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE `projects` ADD PRIMARY KEY (`id`);
ALTER TABLE `projects` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE IF NOT EXISTS `bugs` (
  `id` int(11) NOT NULL,
  `bug` varchar(50) NOT NULL,
  `severity` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `allocate` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
   `project_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE `bugs` ADD PRIMARY KEY (`id`);
ALTER TABLE `bugs` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `bugs` ADD FOREIGN KEY (project_id) REFERENCES projects(id);