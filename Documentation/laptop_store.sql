-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 13, 2024 at 11:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laptop_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_table`
--

CREATE TABLE `cart_table` (
  `id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `laptop_id` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_table`
--

INSERT INTO `cart_table` (`id`, `user_id`, `laptop_id`, `quantity`, `status`) VALUES
(39, 1, 1, 2, 'pending'),
(42, 14, 5, 1, 'ongoing'),
(43, 14, 1, 3, 'ongoing'),
(44, 14, 4, 3, 'ongoing'),
(47, 15, 5, 3, 'pending'),
(60, 16, 5, 3, 'finished');

-- --------------------------------------------------------

--
-- Table structure for table `laptop_table`
--

CREATE TABLE `laptop_table` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ram` varchar(255) NOT NULL,
  `cpu` varchar(255) NOT NULL,
  `vga` varchar(255) NOT NULL,
  `price` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laptop_table`
--

INSERT INTO `laptop_table` (`id`, `name`, `ram`, `cpu`, `vga`, `price`, `quantity`, `model`, `image`) VALUES
(1, 'Acer Nitro V-15', '8 GB DDR5', 'Intel Core i5 13420H', 'NVIDIA GeForce RTXTM 4050', 14999000, 6, NULL, NULL),
(2, 'ASUS ROG Strix SCAR 18', '32 GB DDR5', 'Intel Core i9 13980HX', 'NVIDIA GeForce RTX 4090', 65999000, 18, NULL, NULL),
(4, 'Predator Helios 18', '32 GB', 'Intel Core i9 13900HX', 'NVIDIA GeForce RTXTM 4080', 59999000, 7, NULL, NULL),
(5, 'Predator Triton 500', '32 GB', 'Intel Core i7 10875H', 'NVIDIA GeForce RTX 2080', 23999000, 13, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders_table`
--

CREATE TABLE `orders_table` (
  `id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `order_date` date NOT NULL DEFAULT current_timestamp(),
  `cart_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `laptop_id` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `total_price` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders_table`
--

INSERT INTO `orders_table` (`id`, `user_id`, `order_date`, `cart_id`, `status`, `laptop_id`, `quantity`, `total_price`) VALUES
(17, 14, '2024-02-12', '42,43,44', 'ongoing', '5,1,4', '1,5,2', 218992000),
(18, 14, '2024-02-13', '57,58', 'finish', '2,4', '2,3', 311995000),
(19, 16, '2024-02-13', '60', 'finished', '5', '3', 71997000);

-- --------------------------------------------------------

--
-- Table structure for table `users_table`
--

CREATE TABLE `users_table` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_table`
--

INSERT INTO `users_table` (`id`, `name`, `email`, `password`, `address`, `phone_number`, `role`) VALUES
(1, ' Fajar', 'Agung@gmail.com', '$2b$10$8astj5/JYXN2XnkD.Gg9B.R2QoZCVLs4Y6VgCAXArk7uh5WvjDgC6', 'jl. pondok benda 75', '081237890121', 'user'),
(2, 'setya', 'setya@gmail.com', 'setya1234', 'Jl.kebangsaan nomor 35', '081245627854', 'admin'),
(3, 'Casey', 'casey@gmail.com', 'casey123', 'jl. ciputat 25 tangsel', '081237890321', 'user'),
(5, ' Fajar', 'franz@gmail.com', 'franz123', 'jl. pondok benda 75', '081237890121', 'user'),
(6, ' Kenz nitipra', 'kenaz@gmail.com', '$2b$10$xzOielY2jr/u7G16Ir4Fr.Z0a.cueitbojqjIBp9yTFIFijzA9QxK', 'jl. pondok benda 75', '081237890121', 'user'),
(7, 'Kenaz', 'k12@gmail.com', '$2b$10$QejKS0eqjgnWaj/Qu0xPY.QbZxync4JOI8dLvMxeDOdgeuQXq4K3S', 'jl. Pondok Petir 23', '081237890321', 'user'),
(8, 'Kenaz', 'k12@gmail.com', '$2b$10$QBH5cm7skuX.XK2rMEW4leb7lqxJAsGo/U3xDEzMgxKCI1N0th4pG', 'jl. Pondok Petir 23', '081237890321', 'user'),
(10, ' Fajar', 'farand12@gmail.com', '$2b$10$qN.JUVzbdV8OrSkpE17Lo.4oejOk2sUKKhN75xDoQicBWEHQGFEPu', 'jl. pondok benda 75', '081237890121', 'user'),
(11, 'Farand', 'farand125@gmail.com', '$2b$10$7IXvOx8/tl0hm1Tf9enVz.fxXx6YT57aXSAbPyL4nzfsF6K6ThRp.', 'jl. Pondok Petir 23', '081237890321', 'admin'),
(12, 'Admin', 'admin@gmail.com', '$2b$10$UIwvqH5R.xKIH0pNlvOXPeWgmHCxsORQrWEkx5W8vArEKExsmRAXG', 'jl. Pondok Petir 23', '081237890321', 'admin'),
(13, 'Nasif', 'nasif1@gmail.com', '$2b$10$8astj5/JYXN2XnkD.Gg9B.R2QoZCVLs4Y6VgCAXArk7uh5WvjDgC6', 'jl. Pondok Petir 23', '081237890321', 'user'),
(14, ' User nitipra', 'user@gmail.com', '$2b$10$SphRfLE6C2rv0X1sAuraEuZQRqPmHh4ZZMwUT5wbwymFS5nlxgRZa', 'jl. pondok kacang 221 75', '081237890121', 'user'),
(15, 'User2', 'user2@gmail.com', '$2b$10$egeKfHz0XWuKL/.zJmstjODPhawQbrSlbMnq7GhWoF4UGlnkwT5xS', 'jl. Pondok Petir 23', '081237890321', 'user'),
(16, 'user3', 'user3@gmail.com', '$2b$10$VroyN9KFGU3s3uPaofyQquVdSTW94uAR65Avycy4XpflZUBS/F3Oa', 'jl. Pondok Petir 23', '081237890321', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_table`
--
ALTER TABLE `cart_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_laptop_id` (`laptop_id`);

--
-- Indexes for table `laptop_table`
--
ALTER TABLE `laptop_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_table`
--
ALTER TABLE `orders_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user2_id` (`user_id`);

--
-- Indexes for table `users_table`
--
ALTER TABLE `users_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_table`
--
ALTER TABLE `cart_table`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `laptop_table`
--
ALTER TABLE `laptop_table`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders_table`
--
ALTER TABLE `orders_table`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users_table`
--
ALTER TABLE `users_table`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_table`
--
ALTER TABLE `cart_table`
  ADD CONSTRAINT `fk_laptop_id` FOREIGN KEY (`laptop_id`) REFERENCES `laptop_table` (`id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`);

--
-- Constraints for table `orders_table`
--
ALTER TABLE `orders_table`
  ADD CONSTRAINT `fk_user2_id` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
