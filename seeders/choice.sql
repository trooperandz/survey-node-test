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