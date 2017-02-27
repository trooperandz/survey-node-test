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