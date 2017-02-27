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