-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-02-2026 a las 04:10:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laboratorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id_examenes` int(11) NOT NULL,
  `nombre_examenes` tinytext NOT NULL,
  `precio_examenes` int(11) NOT NULL,
  `descripcion_examenes` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id_examenes`, `nombre_examenes`, `precio_examenes`, `descripcion_examenes`) VALUES
(1, 'Hematología Completa', 15, 'Análisis de células sanguíneas'),
(2, 'Perfil lipídico', 20, 'Análisis de colesterol y triglicéridos'),
(3, 'Perfil hepático', 30, 'Análisis de funcionamiento de hígado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_pacientes` int(11) NOT NULL,
  `nombre_pacientes` tinytext NOT NULL,
  `edad_pacientes` int(11) NOT NULL,
  `cedula_pacientes` int(11) NOT NULL,
  `fechaNacimiento_pacientes` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_pacientes`, `nombre_pacientes`, `edad_pacientes`, `cedula_pacientes`, `fechaNacimiento_pacientes`) VALUES
(1, 'Jesús Gámez', 18, 31234567, '2007-07-12'),
(2, 'Leximar Rodriguez', 18, 32462132, '2007-11-24'),
(3, 'Deriana Araujo', 18, 31958881, '2007-07-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `id_resultados` int(11) NOT NULL,
  `pacienteid_resultados` int(11) NOT NULL,
  `examen_resultados` int(11) NOT NULL,
  `fecha_resultados` date NOT NULL,
  `resultado_resultados` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`id_resultados`, `pacienteid_resultados`, `examen_resultados`, `fecha_resultados`, `resultado_resultados`) VALUES
(1, 1, 1, '2026-01-29', 'Normal, valores dentro de rango esperado'),
(2, 2, 1, '2025-02-14', 'Normal, valores dentro de rango esperado'),
(3, 3, 3, '2025-12-29', 'Muy Anormal, riesgo de enfermedad extrema');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id_examenes`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_pacientes`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id_resultados`),
  ADD KEY `pacienteid_resultados` (`pacienteid_resultados`),
  ADD KEY `examen_resultados` (`examen_resultados`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id_examenes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_pacientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id_resultados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`pacienteid_resultados`) REFERENCES `pacientes` (`id_pacientes`),
  ADD CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`examen_resultados`) REFERENCES `examenes` (`id_examenes`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
