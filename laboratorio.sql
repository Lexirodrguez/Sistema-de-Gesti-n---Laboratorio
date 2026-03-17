-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2026 a las 09:23:20
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
CREATE DATABASE IF NOT EXISTS `laboratorio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `laboratorio`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id_examenes` int(11) NOT NULL,
  `nombre_examenes` tinytext NOT NULL,
  `precio_examenes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id_examenes`, `nombre_examenes`, `precio_examenes`) VALUES
(15, '41412', 44124214),
(16, 'fagfsag', 1213),
(18, 'hermatologia', 12),
(19, '4fafs', 1431);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hematologia_completa`
--

CREATE TABLE `hematologia_completa` (
  `id_paciente` int(11) NOT NULL,
  `Recuento_globulos_blancos` int(11) NOT NULL,
  `Hemoglobina` decimal(5,2) NOT NULL,
  `Hematocrito` decimal(5,2) NOT NULL,
  `Recuento_plaquetas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hematologia_completa`
--

INSERT INTO `hematologia_completa` (`id_paciente`, `Recuento_globulos_blancos`, `Hemoglobina`, `Hematocrito`, `Recuento_plaquetas`) VALUES
(2, 6789, 0.20, 23.56, 7898),
(1, 12131, 999.99, 999.99, 12313),
(1, 124, 999.99, 999.99, 2313214),
(1, 5152, 999.99, 999.99, 512512);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_pacientes` int(11) NOT NULL,
  `nombre_pacientes` varchar(100) NOT NULL,
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
(3, 'Deriana Araujo', 18, 31958881, '2007-07-11'),
(17, 'fsafas', 231, 312312, '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_lipidico`
--

CREATE TABLE `perfil_lipidico` (
  `id_paciente` int(11) NOT NULL,
  `colesterol_total` decimal(5,2) NOT NULL,
  `trigliceridos` decimal(5,2) NOT NULL,
  `colesterol_LDL_` decimal(5,2) NOT NULL,
  `triada_lipidica_aterogenica` varchar(50) DEFAULT NULL,
  `lp_a` decimal(5,2) DEFAULT NULL,
  `apolipoproteina_A1` decimal(5,2) DEFAULT NULL,
  `apolipoproteina_B` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_renal`
--

CREATE TABLE `perfil_renal` (
  `id_paciente` int(11) NOT NULL,
  `albumina_orina` decimal(5,2) DEFAULT NULL,
  `bun` decimal(5,2) NOT NULL,
  `relacion_bun_creatinina` decimal(5,2) DEFAULT NULL,
  `calcio` decimal(5,2) DEFAULT NULL,
  `dioxido_carbono` decimal(5,2) DEFAULT NULL,
  `cloruro` decimal(5,2) DEFAULT NULL,
  `cociente_urea_creatinina` decimal(5,2) DEFAULT NULL,
  `tasa_filtrado_glomerular_tefg` int(4) DEFAULT NULL,
  `anion_gap` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_renal`
--

INSERT INTO `perfil_renal` (`id_paciente`, `albumina_orina`, `bun`, `relacion_bun_creatinina`, `calcio`, `dioxido_carbono`, `cloruro`, `cociente_urea_creatinina`, `tasa_filtrado_glomerular_tefg`, `anion_gap`) VALUES
(1, 121.00, 999.99, 414.00, 141.00, 441.00, 999.99, 4.00, 4124, 41.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `id_resultados` int(11) NOT NULL,
  `paciente_resultados` int(11) NOT NULL,
  `examen_resultados` int(11) NOT NULL,
  `fecha_resultados` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`id_resultados`, `paciente_resultados`, `examen_resultados`, `fecha_resultados`) VALUES
(8, 1, 18, '2026-03-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `password_usuario` varchar(255) NOT NULL,
  `rol_usuario` enum('bioanalista','secretaria') NOT NULL DEFAULT 'secretaria'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `password_usuario`, `rol_usuario`) VALUES
(1, 'bioanalista', '$2b$10$oBKH3UdUxz6YbEcgrzlhzeIAUwDviR4q6JSo1d8ncZedzLs6TzPw2', 'bioanalista'),
(2, 'secretaria', '$2b$10$oBKH3UdUxz6YbEcgrzlhzeIAUwDviR4q6JSo1d8ncZedzLs6TzPw2', 'secretaria');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id_examenes`);

--
-- Indices de la tabla `hematologia_completa`
--
ALTER TABLE `hematologia_completa`
  ADD KEY `fk_hematologia_paciente` (`id_paciente`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_pacientes`);

--
-- Indices de la tabla `perfil_lipidico`
--
ALTER TABLE `perfil_lipidico`
  ADD KEY `fk_lipidico_paciente` (`id_paciente`);

--
-- Indices de la tabla `perfil_renal`
--
ALTER TABLE `perfil_renal`
  ADD KEY `fk_renal_paciente` (`id_paciente`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id_resultados`),
  ADD KEY `fk_res_paciente` (`paciente_resultados`),
  ADD KEY `fk_res_examen` (`examen_resultados`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id_examenes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_pacientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id_resultados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hematologia_completa`
--
ALTER TABLE `hematologia_completa`
  ADD CONSTRAINT `fk_hematologia_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_pacientes`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfil_lipidico`
--
ALTER TABLE `perfil_lipidico`
  ADD CONSTRAINT `fk_lipidico_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_pacientes`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfil_renal`
--
ALTER TABLE `perfil_renal`
  ADD CONSTRAINT `fk_renal_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_pacientes`) ON DELETE CASCADE;

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `fk_res_examen` FOREIGN KEY (`examen_resultados`) REFERENCES `examenes` (`id_examenes`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_res_paciente` FOREIGN KEY (`paciente_resultados`) REFERENCES `pacientes` (`id_pacientes`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
