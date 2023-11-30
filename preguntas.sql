-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Temps de generació: 30-11-2023 a les 09:23:49
-- Versió del servidor: 10.4.32-MariaDB
-- Versió de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `potato`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `preguntas`
--

CREATE TABLE `preguntas` (
  `id_pregunta` bigint(20) UNSIGNED NOT NULL,
  `pregunta` varchar(100) NOT NULL,
  `user` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bolcament de dades per a la taula `preguntas`
--

INSERT INTO `preguntas` (`id_pregunta`, `pregunta`, `user`, `activo`) VALUES
(1, '24 + 37', 'Aitor', 1),
(2, '79 - 15', 'Aitor', 1),
(3, '8 * 7', 'Aitor', 1),
(4, '68 - 24', 'Aitor', 1),
(5, '40 / 4', 'Aitor', 1),
(6, '91 + 13', 'Aitor', 1),
(7, '6 * 5', 'Aitor', 1),
(8, '11 * 3', 'Aitor', 1),
(9, '58 + 19', 'Aitor', 1),
(10, '95 + 14', 'Aitor', 1),
(11, '48 - 23', 'Aitor', 1),
(12, '15 / 3', 'Aitor', 1),
(13, '56 / 8', 'Aitor', 1),
(14, '33 + 49', 'Aitor', 1),
(15, '62 - 17', 'Aitor', 1),
(16, '84 / 7', 'Aitor', 1),
(17, '87 - 41', 'Aitor', 1),
(18, '63 + 31', 'Aitor', 1),
(19, '68 + 25', 'Aitor', 1),
(20, '77 / 11', 'Aitor', 1),
(21, '124 / 4', 'Aitor', 1),
(22, '9 * 4', 'Aitor', 1),
(23, '30 / 5', 'Aitor', 1),
(24, '78 + 14', 'Aitor', 1),
(25, '73 - 39', 'Aitor', 1),
(26, '2 * 11', 'Aitor', 1),
(27, '68 + 22', 'Aitor', 1),
(28, '54 + 18', 'Aitor', 1),
(29, '59 - 42', 'Aitor', 1),
(30, '91 - 37', 'Aitor', 1),
(31, '76 + 27', 'Aitor', 1),
(32, '38 + 44', 'Aitor', 1),
(33, '51 + 34', 'Aitor', 1),
(34, '70 + 25', 'Aitor', 1),
(35, '24 * 5', 'Aitor', 1),
(36, '33 + 5', 'Aitor', 1),
(37, '56 - 27', 'Aitor', 1),
(38, '48 * 3', 'Aitor', 1),
(39, '95 - 14', 'Aitor', 1),
(40, '82 + 17', 'Aitor', 1),
(41, '7 * 9', 'Aitor', 1),
(42, '52 / 2', 'Aitor', 1),
(43, '74 - 36', 'Aitor', 1),
(44, '5 * 11', 'Aitor', 1),
(45, '77 + 26', 'Aitor', 1),
(46, '57 + 34', 'Aitor', 1),
(47, '68 - 24', 'Aitor', 1),
(48, '88 + 13', 'Aitor', 1),
(49, '36 / 3', 'Aitor', 1),
(50, '3 * 5', 'Aitor', 1),
(51, '42 - 27', 'Aitor', 1),
(52, '64 + 28', 'Aitor', 1),
(53, '4 * 6', 'Aitor', 1),
(54, '59 - 45', 'Aitor', 1),
(55, '61 - 28', 'Aitor', 1),
(56, '89 + 12', 'Aitor', 1),
(57, '46 + 38', 'Aitor', 1),
(58, '17 * 6', 'Aitor', 1),
(59, '76 + 27', 'Aitor', 1),
(60, '8 * 5', 'Aitor', 1),
(61, '22 + 58', 'Aitor', 1),
(62, '62 - 17', 'Aitor', 1),
(63, '58 + 31', 'Aitor', 1),
(64, '33 + 49', 'Aitor', 1),
(65, '48 - 23', 'Aitor', 1),
(66, '77 - 29', 'Aitor', 1),
(67, '69 + 24', 'Aitor', 1),
(68, '74 - 36', 'Aitor', 1),
(69, '73 - 39', 'Aitor', 1),
(70, '74 + 6', 'Aitor', 1),
(71, '12 * 2', 'Aitor', 1),
(72, '50 + 33', 'Aitor', 1),
(73, '43 + 26', 'Aitor', 1),
(74, '38 + 44', 'Aitor', 1),
(75, '48 * 2', 'Aitor', 1),
(76, '27 / 9', 'Aitor', 1),
(77, '42 * 6', 'Aitor', 1),
(78, '11 * 2', 'Aitor', 1),
(79, '32 - 17', 'Aitor', 1),
(80, '36 + 42', 'Aitor', 1),
(81, '77 + 26', 'Aitor', 1),
(82, '25 / 5', 'Aitor', 1),
(83, '30 / 5', 'Aitor', 1),
(84, '36 / 4', 'Aitor', 1),
(85, '81 / 9', 'Aitor', 1),
(86, '70 + 25', 'Aitor', 1),
(87, '33 + 5', 'Aitor', 1),
(88, '44 -  44', 'Aitor', 1),
(89, '56 - 27', 'Aitor', 1),
(90, '68 - 24', 'Aitor', 1),
(91, '68 + 25', 'Aitor', 1),
(92, '73 - 39', 'Aitor', 1),
(93, '84 / 7', 'Aitor', 1),
(94, '58 + 19', 'Aitor', 1),
(95, '8 * 7', 'Aitor', 1),
(96, '48 - 23', 'Aitor', 1),
(97, '15 / 3', 'Aitor', 1),
(98, '68 + 22', 'Aitor', 1),
(99, '63 + 31', 'Aitor', 1),
(100, '71 + 23', 'Aitor', 1);

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id_pregunta`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id_pregunta` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
