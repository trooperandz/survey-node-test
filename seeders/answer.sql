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
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`ChoiceId`) REFERENCES `Choices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`GuestId`) REFERENCES `Guests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answers`
--

LOCK TABLES `Answers` WRITE;
/*!40000 ALTER TABLE `Answers` DISABLE KEYS */;
INSERT INTO `Answers` VALUES (2,'2017-02-26 22:25:32','2017-02-26 22:25:32',76,11,28),(3,'2017-02-26 22:27:32','2017-02-26 22:27:32',87,11,30),(6,'2017-02-26 22:31:27','2017-02-26 22:31:27',106,11,35),(7,'2017-02-26 22:32:29','2017-02-26 22:32:29',61,11,25),(8,'2017-02-26 22:33:07','2017-02-26 22:33:07',102,11,34),(9,'2017-02-26 22:33:33','2017-02-26 22:33:33',108,11,36),(10,'2017-02-26 22:34:29','2017-02-26 22:34:29',98,11,33),(11,'2017-02-26 22:34:53','2017-02-26 22:34:53',90,11,31),(12,'2017-02-26 22:35:06','2017-02-26 22:35:06',NULL,11,37),(13,'2017-02-26 22:35:17','2017-02-26 22:35:17',NULL,11,18),(14,'2017-02-26 22:35:59','2017-02-26 22:35:59',82,11,29),(15,'2017-02-26 22:36:12','2017-02-26 22:36:12',56,11,24),(17,'2017-02-26 22:36:51','2017-02-26 22:36:51',94,11,32),(19,'2017-02-26 22:37:25','2017-02-26 22:37:25',71,11,27),(21,'2017-02-26 22:37:51','2017-02-26 22:37:51',69,11,26);
/*!40000 ALTER TABLE `Answers` ENABLE KEYS */;
UNLOCK TABLES;