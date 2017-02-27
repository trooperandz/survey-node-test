-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: sumo_test
-- ------------------------------------------------------
-- Server version	5.7.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Answers`
--

DROP TABLE IF EXISTS `Answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ChoiceId` int(11) DEFAULT NULL,
  `GuestId` int(11) DEFAULT NULL,
  `QuestionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ChoiceId` (`ChoiceId`),
  KEY `GuestId` (`GuestId`),
  KEY `QuestionId` (`QuestionId`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`ChoiceId`) REFERENCES `Choices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`GuestId`) REFERENCES `Guests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_3` FOREIGN KEY (`QuestionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answers`
--

LOCK TABLES `Answers` WRITE;
/*!40000 ALTER TABLE `Answers` DISABLE KEYS */;
INSERT INTO `Answers` VALUES (4,'2017-02-27 07:48:42','2017-02-27 07:48:42',107,1,35),(5,'2017-02-27 07:53:14','2017-02-27 07:53:14',67,1,26),(6,'2017-02-27 07:53:24','2017-02-27 07:53:24',84,1,30),(7,'2017-02-27 07:53:31','2017-02-27 07:53:31',55,1,24),(8,'2017-02-27 07:53:39','2017-02-27 07:53:39',81,1,29),(9,'2017-02-27 07:55:04','2017-02-27 07:55:04',60,1,25),(10,'2017-02-27 07:55:13','2017-02-27 07:55:13',97,1,32),(11,'2017-02-27 08:07:46','2017-02-27 08:07:46',102,1,34);
/*!40000 ALTER TABLE `Answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Choices`
--

DROP TABLE IF EXISTS `Choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Choices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `choice` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `QuestionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `QuestionId` (`QuestionId`),
  CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`QuestionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Choices`
--

LOCK TABLES `Choices` WRITE;
/*!40000 ALTER TABLE `Choices` DISABLE KEYS */;
INSERT INTO `Choices` VALUES (55,'Astronomer','2017-02-25 04:45:18','2017-02-25 04:45:18',24),(56,'Inventor','2017-02-25 04:45:18','2017-02-25 04:45:18',24),(57,'Microbiologist','2017-02-25 04:45:18','2017-02-25 04:45:18',24),(58,'Physicist','2017-02-25 04:45:18','2017-02-25 04:45:18',24),(59,'95,000','2017-02-25 04:46:36','2017-02-25 04:46:36',25),(60,'110,000','2017-02-25 04:46:36','2017-02-25 04:46:36',25),(61,'150,000','2017-02-25 04:46:36','2017-02-25 04:46:36',25),(62,'184,000','2017-02-25 04:46:36','2017-02-25 04:46:36',25),(63,'230,000','2017-02-25 04:46:36','2017-02-25 04:46:36',25),(64,'270,000','2017-02-25 04:46:36','2017-02-25 04:46:36',25),(65,'10,000','2017-02-25 04:49:16','2017-02-25 04:49:16',26),(66,'20,000','2017-02-25 04:49:16','2017-02-25 04:49:16',26),(67,'40,000','2017-02-25 04:49:16','2017-02-25 04:49:16',26),(68,'25,000','2017-02-25 04:49:16','2017-02-25 04:49:16',26),(69,'35,000','2017-02-25 04:49:16','2017-02-25 04:49:16',26),(70,'Argentinosaurus','2017-02-25 05:00:26','2017-02-25 05:00:26',27),(71,'Blue Whale','2017-02-25 05:00:26','2017-02-25 05:00:26',27),(72,'Brachiosaurus Altithorax','2017-02-25 05:00:26','2017-02-25 05:00:26',27),(73,'Brontosaurus','2017-02-25 05:00:26','2017-02-25 05:00:26',27),(74,'Elephant','2017-02-25 05:00:26','2017-02-25 05:00:26',27),(75,'T-Rex','2017-02-25 05:00:26','2017-02-25 05:00:26',27),(76,'Car Insulation','2017-02-25 05:03:08','2017-02-25 05:03:08',28),(77,'Furniture Padding','2017-02-25 05:03:08','2017-02-25 05:03:08',28),(78,'Sound Buffering','2017-02-25 05:03:08','2017-02-25 05:03:08',28),(79,'Wallpaper','2017-02-25 05:03:08','2017-02-25 05:03:08',28),(80,'A Professor At Harvard','2017-02-25 05:06:17','2017-02-25 05:06:17',29),(81,'An English Teacher in Boston','2017-02-25 05:06:17','2017-02-25 05:06:17',29),(82,'A High School Student','2017-02-25 05:06:17','2017-02-25 05:06:17',29),(83,'A Mom In Virginia','2017-02-25 05:06:17','2017-02-25 05:06:17',29),(84,'2500','2017-02-25 05:08:47','2017-02-25 05:08:47',30),(85,'5000','2017-02-25 05:08:47','2017-02-25 05:08:47',30),(86,'6300','2017-02-25 05:08:47','2017-02-25 05:08:47',30),(87,'7000','2017-02-25 05:08:47','2017-02-25 05:08:47',30),(88,'8500','2017-02-25 05:08:47','2017-02-25 05:08:47',30),(89,'858,000','2017-02-25 05:10:35','2017-02-25 05:10:35',31),(90,'950,000','2017-02-25 05:10:35','2017-02-25 05:10:35',31),(91,'1,100,000','2017-02-25 05:10:35','2017-02-25 05:10:35',31),(92,'2,000,000','2017-02-25 05:10:35','2017-02-25 05:10:35',31),(93,'2,400,000','2017-02-25 05:10:35','2017-02-25 05:10:35',31),(94,'60,000','2017-02-25 05:11:39','2017-02-25 05:11:39',32),(95,'75,000','2017-02-25 05:11:39','2017-02-25 05:11:39',32),(96,'80,000','2017-02-25 05:11:39','2017-02-25 05:11:39',32),(97,'90,000','2017-02-25 05:11:39','2017-02-25 05:11:39',32),(98,'Africa','2017-02-25 05:14:14','2017-02-25 05:14:14',33),(99,'Asia','2017-02-25 05:14:14','2017-02-25 05:14:14',33),(100,'Europe','2017-02-25 05:14:14','2017-02-25 05:14:14',33),(101,'South America','2017-02-25 05:14:14','2017-02-25 05:14:14',33),(102,'True','2017-02-25 05:15:32','2017-02-25 05:15:32',34),(103,'False','2017-02-25 05:15:32','2017-02-25 05:15:32',34),(104,'.7 million','2017-02-25 05:17:01','2017-02-25 05:17:01',35),(105,'1.6 million','2017-02-25 05:17:01','2017-02-25 05:17:01',35),(106,'2.3 million','2017-02-25 05:17:01','2017-02-25 05:17:01',35),(107,'4.1 million','2017-02-25 05:17:01','2017-02-25 05:17:01',35),(108,'True','2017-02-25 05:21:19','2017-02-25 05:21:19',36),(109,'False','2017-02-25 05:21:19','2017-02-25 05:21:19',36),(110,'Illinois','2017-02-27 17:04:31','2017-02-27 17:04:31',37),(111,'Michigan','2017-02-27 17:04:31','2017-02-27 17:04:31',37),(112,'Minnesota','2017-02-27 17:04:31','2017-02-27 17:04:31',37),(113,'Wisconsin','2017-02-27 17:04:31','2017-02-27 17:04:31',37),(114,'Benjamin Franklin','2017-02-27 17:06:33','2017-02-27 17:06:33',38),(115,'George Westinghouse','2017-02-27 17:06:33','2017-02-27 17:06:33',38),(116,'Nikola Tesla','2017-02-27 17:06:33','2017-02-27 17:06:33',38),(117,'Thomas Edison','2017-02-27 17:06:33','2017-02-27 17:06:33',38),(118,'15,000','2017-02-27 17:09:09','2017-02-27 17:09:09',39),(119,'25,000','2017-02-27 17:09:09','2017-02-27 17:09:09',39),(120,'35,000','2017-02-27 17:09:09','2017-02-27 17:09:09',39),(121,'40,000','2017-02-27 17:09:09','2017-02-27 17:09:09',39);
/*!40000 ALTER TABLE `Choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Guests`
--

DROP TABLE IF EXISTS `Guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Guests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ipAddress` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Guests`
--

LOCK TABLES `Guests` WRITE;
/*!40000 ALTER TABLE `Guests` DISABLE KEYS */;
INSERT INTO `Guests` VALUES (1,'127.0.0.1','2017-02-27 06:28:12','2017-02-27 06:28:12');
/*!40000 ALTER TABLE `Guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Questions`
--

DROP TABLE IF EXISTS `Questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` VALUES (24,'What description best depicts Nikola Tesla?','2017-02-25 04:45:18','2017-02-25 04:45:18'),(25,'Approximately how many miles is it from the Earth to the Moon?','2017-02-25 04:46:36','2017-02-25 04:46:36'),(26,'Approximately how fast do the Voyager spacecraft travel (mph)?','2017-02-25 04:49:16','2017-02-25 04:49:16'),(27,'What is the largest known animal to ever inhabit the Earth?','2017-02-25 05:00:26','2017-02-25 05:00:26'),(28,'Bubble wrap was originally intended to be used for what purpose?','2017-02-25 05:03:08','2017-02-25 05:03:08'),(29,'What best describes the person that designed the U.S. flag?','2017-02-25 05:06:17','2017-02-25 05:06:17'),(30,'Doctors\' poor handwriting kills about how many people per year in the United States?','2017-02-25 05:08:47','2017-02-25 05:08:47'),(31,'How much does the typical cloud weigh (lbs)?','2017-02-25 05:10:35','2017-02-25 05:10:35'),(32,'About how many miles of blood vessels are in the human body?','2017-02-25 05:11:39','2017-02-25 05:11:39'),(33,'In what continent did the chicken evolve?','2017-02-25 05:14:14','2017-02-25 05:14:14'),(34,'Commercial flights used to be able to fly any course to get to their destination.','2017-02-25 05:15:32','2017-02-25 05:15:32'),(35,'For every human on earth, there are about how many ants?','2017-02-25 05:17:01','2017-02-25 05:17:01'),(36,'Warren Buffet has only sent one email in his entire life.','2017-02-25 05:21:19','2017-02-25 05:21:19'),(37,'What Great Lake state has more shoreline than the entire U.S. Atlantic seaboard?','2017-02-27 17:04:31','2017-02-27 17:04:31'),(38,'Who averaged one patent for every three weeks of his life?','2017-02-27 17:06:33','2017-02-27 17:06:33'),(39,'What is the approximate circumference of the Earth (mi)?','2017-02-27 17:09:09','2017-02-27 17:09:09');
/*!40000 ALTER TABLE `Questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ipAddress` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Matthew Holland','mtholland10@gmail.com','$2a$10$5g2v/mW2rN.g8NSHsVQJgektgyPSHjaHemRiHHSr2eIHOQbCIK1Nq','127.0.0.1',1,'2017-02-23 22:02:12','2017-02-23 22:02:12'),(2,'Guest','guest@guest.com','$2a$10$.hrFPZYDXaSuIQqnBEklIORP7/qMbUcQQuICBv7yRYPGl2b7ocURG','127.0.0.1',1,'2017-02-27 17:39:21','2017-02-27 17:39:21');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-27 12:07:32
