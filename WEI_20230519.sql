-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: high-street-gym
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(200) NOT NULL,
  `duration_minutes` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Yoga','A brand new Yoga class is open',60),(2,'Yoga','A short Yoga is better for relaxing',30),(3,'Yoga','Half an hour Yoga',30),(4,'Plate','Half an hour Plate',30),(5,'Plate','One hour Plate',60),(6,'Zumba','New zumba is now open',60),(9,'Zumba ','Half an hour Zumba',30),(10,'Indoor cycling ','Half an hour indoor cycling',30),(15,'Boxing ',' High Street Gym boxing is open ',60),(16,'Yoga ',' High Street Gym yoga is open ',60),(17,'Zumba ',' High Street Gym zumba is open ',60),(26,'Indoor cycling ',' High Street Gym indoor cycling is open ',60),(27,'Boxing ',' High Street Gym boxing is open ',60),(28,'Yoga ',' High Street Gym yoga is open ',60),(29,'Zumba ',' High Street Gym zumba is open ',60),(43,'Boxing ',' High Street Gym boxing is open ',60),(44,'Yoga ',' High Street Gym yoga is open ',60),(45,'Indoor cycling ',' High Street Gym indoor cycling is open ',60),(46,'Zumba ',' High Street Gym zumba is open ',60);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `datetime` datetime NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_blog_posts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (2,'2023-05-17 04:28:33',8,'My second blogpost','This is my second blogpost.ee'),(6,'2023-05-12 09:39:36',8,'Tomorrow go to gym','High street gym in southbank.'),(20,'2023-05-17 09:35:13',9,'boring','boring'),(21,'2023-05-18 05:25:30',11,'ee','eews'),(22,'2023-05-18 23:27:56',8,'my','my'),(23,'2023-05-18 23:39:28',8,'e','rrr'),(24,'2023-05-18 23:39:44',8,'e','ee'),(25,'2023-05-18 23:40:05',8,'test','td'),(26,'2023-05-19 00:27:56',9,'ee','agaa');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `class_id` int NOT NULL,
  `created_datetime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_bookings_users_idx` (`user_id`),
  KEY `fk_bookings_classes_idx` (`class_id`),
  CONSTRAINT `fk_bookings_classes` FOREIGN KEY (`class_id`) REFERENCES `training_classes` (`id`),
  CONSTRAINT `fk_bookings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (6,14,2,'2023-05-04 12:00:00'),(7,9,2,'2023-05-04 12:00:00'),(9,9,1,'2023-05-10 10:00:00'),(10,9,28,'2023-05-10 05:00:13'),(11,9,28,'2023-05-10 05:01:43'),(12,9,29,'2023-05-10 05:03:39'),(13,9,25,'2023-05-10 05:03:52'),(21,11,30,'2023-05-12 05:11:35'),(22,11,30,'2023-05-12 05:15:03'),(23,11,31,'2023-05-12 05:15:35'),(24,11,32,'2023-05-12 05:26:24'),(27,8,1,'2023-05-16 00:49:23'),(29,11,37,'2023-05-18 05:52:34'),(31,11,30,'2023-05-19 00:12:33');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(60) NOT NULL,
  `number` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `room_id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'1 Hight St, Southbank','G2008'),(2,'Southbank','G2012'),(3,'2 High St','G2010'),(4,'1 High St, Southbank ','G2022'),(5,' 1 High St, Southbank ',' G2009 '),(6,' 1 High St, Southbank ','G2016'),(7,'1 High St, Southbank ','G2028'),(8,' 1 High St, Southbank ',' G2009 '),(9,'1 High St, Southbank ',' G2010 '),(18,' 1 High St, Southbank ',' G2009 '),(19,'1 High St, Southbank ',' G2010 ');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_classes`
--

DROP TABLE IF EXISTS `training_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `datetime` datetime NOT NULL,
  `room_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `trainer_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `class_id_UNIQUE` (`id`),
  KEY `activity_id_idx` (`activity_id`),
  KEY `user_id_idx` (`trainer_user_id`),
  KEY `room_id_idx` (`room_id`),
  CONSTRAINT `fk_classes_activities` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_classes_rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_classes_users` FOREIGN KEY (`trainer_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_classes`
--

LOCK TABLES `training_classes` WRITE;
/*!40000 ALTER TABLE `training_classes` DISABLE KEYS */;
INSERT INTO `training_classes` VALUES (1,'2023-04-22 09:00:00',1,1,9),(2,'2023-04-22 09:00:00',1,2,9),(3,'2023-04-22 09:00:00',1,3,9),(4,'2023-04-22 09:00:00',1,4,9),(5,'2023-04-22 09:00:00',1,5,9),(6,'2023-04-22 09:00:00',1,5,9),(7,'2023-04-23 12:35:47',1,5,9),(15,'2023-04-25 00:00:00',1,4,9),(18,'2023-04-18 09:00:00',2,2,9),(19,'2023-05-02 11:37:00',2,1,13),(21,'2023-05-02 14:44:00',1,1,13),(22,'2023-05-02 15:51:00',1,1,9),(23,'2023-05-02 16:04:00',1,9,9),(24,'2023-05-02 16:15:00',1,15,9),(25,'2023-05-02 16:19:00',1,2,8),(26,'2023-05-03 09:00:00',2,17,9),(27,'2023-05-03 09:00:00',2,9,11),(28,'2023-05-11 09:30:00',3,26,9),(29,'2023-05-05 09:32:00',1,15,8),(30,'2023-05-18 09:00:00',3,6,9),(31,'2023-05-18 04:00:00',9,15,9),(32,'2023-05-19 08:18:00',6,2,9),(33,'2023-05-19 08:37:00',2,1,9),(34,'2023-05-20 18:41:00',2,10,9),(37,'2023-05-27 08:00:00',3,6,9),(38,'2023-05-20 11:50:00',3,15,13),(40,'2023-06-11 20:04:00',8,15,9),(42,'2023-05-18 09:54:00',1,1,9),(48,'2023-06-08 10:03:00',4,5,9),(49,'2023-06-11 00:08:00',2,17,9),(50,'2023-06-11 10:29:00',2,45,9),(51,'2023-06-17 00:30:00',1,4,13);
/*!40000 ALTER TABLE `training_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `authentication_key` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `authentication_key_UNIQUE` (`authentication_key`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'admin@srv.com','$2a$10$9fgDOw1d1uhCJp.UvS.hRuDFxps7cOilfBkv1LlWXMUAbvuejm4bK','admin','0412412412','Admin','User',NULL,'a53cbc47-834d-43ee-a823-3adf4add2d75'),(7,'ross@hsg.com','$2a$10$51BVcAhafynd90eV2ohBNeAM6Mza/LXBMJgR2CZbEy.0tisGn/0um','member','0432431432','ross','wei','41 herschel st, brisbane',NULL),(8,'hua@live.com','$2a$10$4m9n6S6WHrTR5KhyBzTI1.EtYr/fkLWVJhC4dpalOJPT7SuLN4Qga','admin','0432432431','hua','wei','12 herschel st, brisbane',NULL),(9,'rob@live.com','$2a$10$qNE6x1KTVuyZ3jQeuBmoF.qmYySO6cJeZsi7Pk54.e9HUk4z2FgyW','trainer','0421421421','Rob','He','12 herschel st, brisbane',NULL),(11,'ross@live.com','$2a$10$fn2ZQMv1GIkwkO50dVUiQOh95wBuu1KWAywH8jslHB5WqdNZuJb0i','member','0412345674','ross','wei','anyet',NULL),(13,'he@qq.com','$2a$10$mHsGo1uKrKvDn5elN3/nl.da5dQniz0Sxf6xKpb.dZ0KyovmYAyN.','trainer','hihi','Hu','Tian','eefgfffd',NULL),(14,'qq@qq.com','$2a$10$yjwZQa0Jq0sk.KBmdvZCxOVDxMgaQkjwK/DKbA8eGZ4c1UV729.3G','member','0432432432','es','qEE','eefgfff',NULL),(27,'test@qq.com','$2a$10$Zq1D0sjZiSvK7FSwOhIvVuf9iV7BPn15KtOwCm5Z8rwqQFJyVfyM2','member','0432432432','test','tt','none',NULL),(29,'roy@qq.com','$2a$10$IbrEBNjXEsHGReKWCTVu2u19RaiKIaOzioQSk4EttpU4CsV7MxVzO','member','0432567567','Roy','Huiy','roy',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19 10:49:36
