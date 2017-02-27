DROP TABLE IF EXISTS `Questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` VALUES (24,'What description best depicts Nikola Tesla?','2017-02-25 04:45:18','2017-02-25 04:45:18'),(25,'Approximately how many miles is it from the Earth to the Moon?','2017-02-25 04:46:36','2017-02-25 04:46:36'),(26,'Approximately how fast does the Voyager spacecraft travel (mph)?','2017-02-25 04:49:16','2017-02-25 04:49:16'),(27,'What is the largest known animal to ever inhabit the Earth?','2017-02-25 05:00:26','2017-02-25 05:00:26'),(28,'Bubble wrap was originally intended to be used for what purpose?','2017-02-25 05:03:08','2017-02-25 05:03:08'),(29,'What best describes the person that designed the U.S. flag?','2017-02-25 05:06:17','2017-02-25 05:06:17'),(30,'Doctors\' poor handwriting kills about how many people per year in the United States?','2017-02-25 05:08:47','2017-02-25 05:08:47'),(31,'How much does the typical cloud weigh (lbs)?','2017-02-25 05:10:35','2017-02-25 05:10:35'),(32,'About how many miles of blood vessels are in the human body?','2017-02-25 05:11:39','2017-02-25 05:11:39'),(33,'In what continent did the chicken evolve?','2017-02-25 05:14:14','2017-02-25 05:14:14'),(34,'Commercial flights used to be able to fly any course to get to their destination.','2017-02-25 05:15:32','2017-02-25 05:15:32'),(35,'For every human on earth, there are about how many ants?','2017-02-25 05:17:01','2017-02-25 05:17:01'),(36,'Warren Buffet has only sent one email in his entire life.','2017-02-25 05:21:19','2017-02-25 05:21:19');
/*!40000 ALTER TABLE `Questions` ENABLE KEYS */;
UNLOCK TABLES;