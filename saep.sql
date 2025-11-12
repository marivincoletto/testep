-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para saep
CREATE DATABASE IF NOT EXISTS `saep` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `saep`;

-- Copiando estrutura para tabela saep.historico_alerta
CREATE TABLE IF NOT EXISTS `historico_alerta` (
  `id_alerta` int(11) NOT NULL AUTO_INCREMENT,
  `id_produto` int(11) NOT NULL,
  `data_alerta` datetime DEFAULT current_timestamp(),
  `mensagem` varchar(255) NOT NULL,
  PRIMARY KEY (`id_alerta`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `historico_alerta_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela saep.historico_alerta: ~12 rows (aproximadamente)
INSERT INTO `historico_alerta` (`id_alerta`, `id_produto`, `data_alerta`, `mensagem`) VALUES
	(1, 3, '2025-11-12 11:21:44', 'Estoque baixo para o produto'),
	(2, 3, '2025-11-12 11:23:06', 'Estoque baixo para o produto'),
	(3, 3, '2025-11-12 13:20:32', 'Estoque baixo para o produto'),
	(4, 3, '2025-11-12 13:20:44', 'Estoque baixo para o produto'),
	(5, 3, '2025-11-12 13:21:33', 'Estoque baixo para o produto'),
	(6, 3, '2025-11-12 13:21:38', 'Estoque baixo para o produto'),
	(7, 3, '2025-11-12 13:24:04', 'Estoque baixo para o produto'),
	(8, 3, '2025-11-12 13:24:04', 'Estoque NEGATIVO! Verifique movimentações'),
	(9, 3, '2025-11-12 13:24:23', 'Estoque baixo para o produto'),
	(10, 3, '2025-11-12 13:24:23', 'Estoque NEGATIVO! Verifique movimentações'),
	(11, 3, '2025-11-12 13:24:49', 'Estoque baixo para o produto'),
	(12, 3, '2025-11-12 13:24:49', 'Estoque NEGATIVO! Verifique movimentações');

-- Copiando estrutura para tabela saep.movimentacao_estoque
CREATE TABLE IF NOT EXISTS `movimentacao_estoque` (
  `id_movimentacao` int(11) NOT NULL AUTO_INCREMENT,
  `id_produto` int(11) NOT NULL,
  `tipo_movimentacao` enum('Entrada','Saida') NOT NULL,
  `quantidade` int(11) NOT NULL,
  `data_movimentacao` datetime DEFAULT current_timestamp(),
  `responsavel` int(11) NOT NULL,
  PRIMARY KEY (`id_movimentacao`),
  KEY `id_produto` (`id_produto`),
  KEY `responsavel` (`responsavel`),
  CONSTRAINT `movimentacao_estoque_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`) ON DELETE CASCADE,
  CONSTRAINT `movimentacao_estoque_ibfk_2` FOREIGN KEY (`responsavel`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela saep.movimentacao_estoque: ~13 rows (aproximadamente)
INSERT INTO `movimentacao_estoque` (`id_movimentacao`, `id_produto`, `tipo_movimentacao`, `quantidade`, `data_movimentacao`, `responsavel`) VALUES
	(1, 3, 'Entrada', 1, '2025-11-12 11:21:43', 1),
	(2, 3, 'Entrada', 2, '2025-11-12 11:22:58', 1),
	(3, 3, 'Saida', 4, '2025-11-12 11:23:06', 1),
	(4, 3, 'Entrada', 1, '2025-11-12 13:20:32', 1),
	(5, 3, 'Entrada', 1, '2025-11-12 13:20:44', 1),
	(6, 3, 'Entrada', 10, '2025-11-12 13:20:54', 1),
	(7, 3, 'Saida', 1, '2025-11-12 13:21:25', 1),
	(8, 3, 'Saida', 10, '2025-11-12 13:21:33', 1),
	(9, 3, 'Saida', 10, '2025-11-12 13:21:38', 1),
	(10, 3, 'Entrada', 1, '2025-11-12 13:24:04', 1),
	(11, 3, 'Entrada', 1, '2025-11-12 13:24:23', 1),
	(12, 3, 'Entrada', 10, '2025-11-12 13:24:37', 1),
	(13, 3, 'Saida', 3, '2025-11-12 13:24:49', 1);

-- Copiando estrutura para tabela saep.produto
CREATE TABLE IF NOT EXISTS `produto` (
  `id_produto` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `descricao` text DEFAULT NULL,
  `categoria` enum('Ferramentas','Eletronicos','Construcao','Limpeza') NOT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `composicao` varchar(255) DEFAULT NULL,
  `fragrancia` varchar(100) DEFAULT NULL,
  `dimensoes` varchar(100) DEFAULT NULL,
  `peso` decimal(10,2) DEFAULT NULL,
  `unidade_medida` varchar(20) DEFAULT NULL,
  `aplicacao` varchar(100) DEFAULT NULL,
  `validade` date DEFAULT NULL,
  `estoque_minimo` int(11) DEFAULT 0,
  `preco` decimal(10,2) DEFAULT NULL,
  `estoque_atual` int(11) DEFAULT 0,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela saep.produto: ~1 rows (aproximadamente)
INSERT INTO `produto` (`id_produto`, `nome`, `descricao`, `categoria`, `marca`, `modelo`, `composicao`, `fragrancia`, `dimensoes`, `peso`, `unidade_medida`, `aplicacao`, `validade`, `estoque_minimo`, `preco`, `estoque_atual`) VALUES
	(3, 'hh', 'hhh', 'Eletronicos', 'hhh', 'hhh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 5.00, -1);

-- Copiando estrutura para tabela saep.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil` enum('Administrador','Operador') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela saep.usuario: ~0 rows (aproximadamente)
INSERT INTO `usuario` (`id_usuario`, `nome`, `login`, `senha`, `perfil`) VALUES
	(1, 'admin', 'admin', '$2b$10$GUUtg3LL3AAcan/CJMrzB.cTq7m0nx/JrNBEGTelbtagIOIP3qbzu', 'Administrador');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
