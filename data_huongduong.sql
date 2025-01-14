-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th1 10, 2025 lúc 09:19 AM
-- Phiên bản máy phục vụ: 8.0.36
-- Phiên bản PHP: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `data_huongduong`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `img`, `status`, `created_at`, `updated_at`) VALUES
(408, 'Quần jean', 'Cupiditate sint dolores qui distinctio dignissimos nulla.', NULL, 1, '2024-11-06 05:38:17', '2025-01-09 20:39:07'),
(409, 'Quần dài', 'Iste facilis perspiciatis praesentium et voluptas.', 'https://via.placeholder.com/640x480.png/0044dd?text=categories+ipsa', 1, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(410, 'Quần Jeans', 'Sed sapiente perspiciatis rerum inventore nemo corporis.', NULL, 0, '2024-11-06 05:38:17', '2024-11-13 14:31:41'),
(411, 'Áo thun', 'Nesciunt ipsa unde porro explicabo eos.', 'https://via.placeholder.com/640x480.png/00aaee?text=categories+ut', 0, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(412, 'Áo sơ mi', 'Deserunt in sint quis.', 'https://via.placeholder.com/640x480.png/00aaee?text=categories+fuga', 0, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(413, 'Áo Polo', 'Nisi quidem soluta ut vitae et.', NULL, 0, '2024-11-06 05:38:17', '2024-11-13 19:43:05'),
(414, 'Giày thể thao', 'Esse itaque voluptate aspernatur maiores autem.', 'https://via.placeholder.com/640x480.png/0066bb?text=categories+nostrum', 0, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(415, 'Giày sandal', 'Vel iusto ducimus voluptatem at adipisci.', 'https://via.placeholder.com/640x480.png/009900?text=categories+voluptas', 0, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(416, 'Giày da', 'Error nobis ut consectetur rerum nesciunt.', 'https://via.placeholder.com/640x480.png/00eeee?text=categories+officia', 1, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(417, 'Đồng hồ', 'In quidem beatae assumenda accusamus consequuntur facere.', 'https://via.placeholder.com/640x480.png/00bb11?text=categories+nobis', 1, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(418, 'Nhẫn', 'Ipsa enim distinctio itaque suscipit ratione repudiandae enim deleniti.', 'https://via.placeholder.com/640x480.png/00cc33?text=categories+quasi', 1, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(419, 'Dây chuyền', 'Illo fuga aut id omnis.', 'https://via.placeholder.com/640x480.png/0044aa?text=categories+modi', 0, '2024-11-06 05:38:17', '2024-11-06 05:38:17'),
(420, 'Vòng tay', 'Dicta sunt numquam nesciunt expedita commodi.', 'https://via.placeholder.com/640x480.png/0033ff?text=categories+possimus', 1, '2024-11-06 05:38:17', '2024-11-06 05:38:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint NOT NULL,
  `name_coupon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `discount_type` tinyint DEFAULT NULL,
  `discount_value` tinyint NOT NULL,
  `minium_order_value` float NOT NULL,
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `coupons`
--

INSERT INTO `coupons` (`id`, `name_coupon`, `code_name`, `discount_type`, `discount_value`, `minium_order_value`, `product_id`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(18, 'VOUCHER2teee', 'QFSKDKggeedsggggg', NULL, 19, 120, NULL, '2025-01-10 10:26:00', '2025-01-11 10:26:00', '2025-01-09 20:27:07', '2025-01-09 21:24:50'),
(19, 'VOUCHER1t', 'QFSKDKggghhd', NULL, 11, 1, NULL, '2025-01-10 10:53:00', '2025-01-11 10:53:00', '2025-01-09 20:53:45', '2025-01-09 21:24:39'),
(20, 'VOUCHER1', 'QFSKDK', NULL, 12, 12, NULL, '2025-01-10 11:22:00', '2025-01-10 11:22:00', '2025-01-09 21:22:33', '2025-01-09 21:22:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(27, '0001_01_01_000000_create_users_table', 1),
(28, '0001_01_01_000001_create_cache_table', 1),
(29, '0001_01_01_000002_create_jobs_table', 1),
(30, '2024_10_23_071106_create_products_table', 1),
(31, '2024_10_23_071248_create_product_images_table', 1),
(32, '2024_10_23_071349_create_shipping_addresses_table', 1),
(33, '2024_10_23_071421_create_orders_table', 1),
(34, '2024_10_23_071459_create_order_details_table', 1),
(35, '2024_10_23_071540_create_categories_table', 1),
(36, '2024_10_23_071627_create_reviews_table', 1),
(37, '2024_10_25_090448_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `options`
--

CREATE TABLE `options` (
  `id` bigint UNSIGNED NOT NULL,
  `number_option` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `option_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `options`
--

INSERT INTO `options` (`id`, `number_option`, `product_id`, `option_name`, `created_at`, `updated_at`) VALUES
(87, 1, 104, 'Kích thước', NULL, NULL),
(88, 2, 104, 'Màu', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `option_values`
--

CREATE TABLE `option_values` (
  `id` bigint UNSIGNED NOT NULL,
  `number_value` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `option_id` bigint UNSIGNED DEFAULT NULL,
  `value_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `option_values`
--

INSERT INTO `option_values` (`id`, `number_value`, `product_id`, `option_id`, `value_name`, `created_at`, `updated_at`) VALUES
(90, 1, 104, 87, 'S', NULL, NULL),
(91, 2, 104, 87, 'M', NULL, NULL),
(92, 3, 104, 87, 'L', NULL, NULL),
(93, 1, 104, 88, 'Xanh', NULL, NULL),
(94, 2, 104, 88, 'Nâu', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `status` int UNSIGNED DEFAULT NULL,
  `shipping_phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,0) NOT NULL,
  `payment_type` int DEFAULT NULL,
  `bankname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `status`, `shipping_phone`, `shipping_address`, `amount`, `payment_type`, `bankname`, `username`, `account_number`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 3, '0367659411', 'can tho', 1000000, 1, 'Thanh Tâm', 'Thanh Tâm', NULL, 17, '2024-10-16 07:45:26', '2024-11-04 03:33:39'),
(4, 3, '0367659411', 'cần thơ', 900000, 1, 'tam', 'Tham Tâm', '1231845', 17, '2024-09-18 11:17:32', '2024-05-20 11:17:38'),
(5, 3, '2131321231', 'Cần thơ', 800000, 1, 'tam', 'Tam', '31215', 21, '2024-08-14 03:43:03', '2024-08-16 03:43:03'),
(6, 4, '0367659411', 'Hưng Thanh, Phường Tân Bình, Thành phố Đồng Xoài, Tỉnh Bình Phước', 499000, 0, '', 'tâm Nguyễn', '', 17, '2023-12-31 22:05:51', '2025-01-09 19:48:26'),
(7, 3, '0367659411', 'Hưng Thanh, Phường Tân Bình, Thành phố Đồng Xoài, Tỉnh Bình Phước', 499000, 0, '', 'tâm Nguyễn', '', 17, '2023-12-31 22:36:44', '2025-01-09 18:23:54'),
(8, 0, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', 514000, 1, '', 'Thành Tâm', '', 17, '2025-01-10 01:48:31', '2025-01-10 01:48:31'),
(9, 0, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', 514000, 1, '', 'Thành Tâm', '', 17, '2025-01-10 01:49:47', '2025-01-10 01:49:47'),
(10, 0, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', 514000, 0, '', 'Thành Tâm', '', 17, '2025-01-10 01:49:53', '2025-01-10 01:49:53'),
(11, 0, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', 514000, 0, '', 'Thành Tâm', '', 17, '2025-01-10 01:50:31', '2025-01-10 01:50:31'),
(12, 0, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', 514000, 1, '', 'Thành Tâm', '', 17, '2025-01-10 01:52:22', '2025-01-10 01:52:22'),
(13, 0, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', 514000, 1, '', 'Thành Tâm', '', 17, '2025-01-10 01:54:20', '2025-01-10 01:54:20'),
(14, 0, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', 416340, 1, '', 'Thành Tâm', '', 17, '2025-01-10 01:54:46', '2025-01-10 01:54:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_name`, `quantity`, `price`, `color`, `size`, `created_at`, `updated_at`) VALUES
(5, 3, 'Áo', 3, 100000.00, 'Trắng', 'S', '2024-11-29 03:22:11', '2024-11-29 03:22:11'),
(6, 4, 'Quần', 3, 100000.00, 'Xanh', 'L', '2024-11-29 03:22:53', '2024-11-29 03:22:53'),
(7, 13, 'Giày Sandal Nam Nữ SHONDO F6 Sport', 1, 375000.00, NULL, NULL, '2025-01-10 01:54:20', '2025-01-10 01:54:20'),
(8, 13, 'Áo sơ mi nam ngắn tay cổ vest cao cấp không nhăn LADOS-8109 thời trang, dễ phối đồ', 1, 139000.00, NULL, NULL, '2025-01-10 01:54:20', '2025-01-10 01:54:20'),
(9, 14, 'Giày Sandal Nam Nữ SHONDO F6 Sport', 1, 375000.00, NULL, NULL, '2025-01-10 01:54:46', '2025-01-10 01:54:46'),
(10, 14, 'Áo sơ mi nam ngắn tay cổ vest cao cấp không nhăn LADOS-8109 thời trang, dễ phối đồ', 1, 139000.00, NULL, NULL, '2025-01-10 01:54:46', '2025-01-10 01:54:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('inetbumbaby2@gmail.com', '$2y$12$MGt58XwZHAOCBBSH/TdQoO0XVPTXKx/4CzPsGNqnhTuo2E2L8UxOu', '2024-11-07 12:39:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(73, 'App\\Models\\User', 17, 'auth_token', '9f52ed381c40723f20bb60c920ecb88e9c8f4c9439435378ef52a92240023fd2', '[\"*\"]', NULL, NULL, '2024-11-10 03:16:00', '2024-11-10 03:16:00'),
(74, 'App\\Models\\User', 17, 'auth_token', '3e6570b5c3fad5ce71f88f5091d99d4c2cd9ce343ad2589ae16f76ffeba88112', '[\"*\"]', NULL, NULL, '2024-11-10 03:42:31', '2024-11-10 03:42:31'),
(75, 'App\\Models\\User', 17, 'auth_token', '53826886e0acf9dbe5ce18ddcc784aaaea816c9395f04f92fca18127da56e0a0', '[\"*\"]', NULL, NULL, '2024-11-11 03:22:25', '2024-11-11 03:22:25'),
(76, 'App\\Models\\User', 17, 'auth_token', '69e49e7fd3daf84ff9a7b3d2c3e957b177986778beddaaae7d45692948bcaba0', '[\"*\"]', NULL, NULL, '2024-11-12 03:28:47', '2024-11-12 03:28:47'),
(77, 'App\\Models\\User', 17, 'auth_token', '88eddc729e72819e9576b185e6a2db7fd76711d920e1ec9232b4d0f4ebc5d500', '[\"*\"]', NULL, NULL, '2024-11-12 03:28:51', '2024-11-12 03:28:51'),
(78, 'App\\Models\\User', 17, 'auth_token', 'ff8781e24c92af2d5033fdab9b1f78d311c9b11b3217255a7be400f4f43176dd', '[\"*\"]', NULL, NULL, '2024-11-12 03:28:52', '2024-11-12 03:28:52'),
(79, 'App\\Models\\User', 17, 'auth_token', '17508bc3a88cf6c0a21843e2ffd90d49892b18929a4e8db8f566c00a6b0b02f3', '[\"*\"]', NULL, NULL, '2024-11-12 05:37:09', '2024-11-12 05:37:09'),
(80, 'App\\Models\\User', 17, 'auth_token', 'a664802e1b87936fd16f05c71e41d903cbac394aa72089f7c3751033efa3d004', '[\"*\"]', NULL, NULL, '2024-11-12 05:37:51', '2024-11-12 05:37:51'),
(81, 'App\\Models\\User', 17, 'auth_token', '53ead76aee45add234c81c4d489f846a34538ab175ab9b7373eae12bd444f150', '[\"*\"]', NULL, NULL, '2024-11-12 06:18:31', '2024-11-12 06:18:31'),
(82, 'App\\Models\\User', 17, 'auth_token', '2a6a871008fd6e53f56960cb77ae8cfb750f7e4dce03eeb7fc43ac3bf434a56c', '[\"*\"]', NULL, NULL, '2024-11-12 06:25:39', '2024-11-12 06:25:39'),
(83, 'App\\Models\\User', 20, 'auth_token', '45d962671499731a99fc6d7de308368c04a4154b877b1435fedba4b29f65272e', '[\"*\"]', NULL, NULL, '2024-11-12 06:34:02', '2024-11-12 06:34:02'),
(84, 'App\\Models\\User', 20, 'auth_token', '6abff9e9d462fc22bc8be279fd367e36eb50139c72674515db38747541f70753', '[\"*\"]', NULL, NULL, '2024-11-12 06:34:37', '2024-11-12 06:34:37'),
(85, 'App\\Models\\User', 20, 'auth_token', '83273d0438254458c8b88381106db05f4754a181a49a75f49124617fa8b966c6', '[\"*\"]', NULL, NULL, '2024-11-12 06:40:09', '2024-11-12 06:40:09'),
(86, 'App\\Models\\User', 20, 'auth_token', '053ac24c193771ffcbef0b8fbf95e5719bc1e76440ba76d127b5d8150ec063ea', '[\"*\"]', NULL, NULL, '2024-11-12 07:23:58', '2024-11-12 07:23:58'),
(87, 'App\\Models\\User', 20, 'auth_token', 'a9246d188cbb5c8709a2c0cd3eae1da6effbb09545b0d89f9753f6f2f82bea66', '[\"*\"]', NULL, NULL, '2024-11-13 00:09:15', '2024-11-13 00:09:15'),
(88, 'App\\Models\\User', 17, 'auth_token', 'b1739b513297660d9d15a4ad741be179f7a48d4475f359c626c8491c45361914', '[\"*\"]', NULL, NULL, '2024-11-13 02:11:43', '2024-11-13 02:11:43'),
(89, 'App\\Models\\User', 17, 'auth_token', '7c1bd800574ef57cdee0b5d954b43bcc6a2393c17d8b4d1d34361626bfb1a779', '[\"*\"]', NULL, NULL, '2024-11-13 02:11:44', '2024-11-13 02:11:44'),
(90, 'App\\Models\\User', 17, 'auth_token', '3a7037a887f37da1fc5ba2a189af88fb680c538cecbb259f833d9594251ef66e', '[\"*\"]', NULL, NULL, '2024-11-13 02:14:32', '2024-11-13 02:14:32'),
(91, 'App\\Models\\User', 17, 'auth_token', 'd66358eeece43f6ef75da6c79848bc946e1e0a475559642e274c0eff7e758be3', '[\"*\"]', NULL, NULL, '2024-11-13 02:15:37', '2024-11-13 02:15:37'),
(92, 'App\\Models\\User', 17, 'auth_token', 'fdfaf42871bf81b2b975b35b04519e474ee5cdcd3a2d0f0c2b68c7571d628170', '[\"*\"]', NULL, NULL, '2024-11-13 02:15:38', '2024-11-13 02:15:38'),
(93, 'App\\Models\\User', 17, 'auth_token', '490932e5393f609a6e81a5e7c7c794f868708029a386a32f8932ab57f3e8baa2', '[\"*\"]', NULL, NULL, '2024-11-13 04:53:57', '2024-11-13 04:53:57'),
(94, 'App\\Models\\User', 17, 'auth_token', '9f488d79c23a94e4322dd5c616146e3abb7d72542c8af5ae387a4137700502a0', '[\"*\"]', NULL, NULL, '2024-11-13 04:54:29', '2024-11-13 04:54:29'),
(95, 'App\\Models\\User', 17, 'auth_token', '3fbf1124e086a7e725cd37f8083d13c3f71ebf1076539210b8203e42a12f6c1b', '[\"*\"]', NULL, NULL, '2024-11-13 04:54:29', '2024-11-13 04:54:29'),
(96, 'App\\Models\\User', 17, 'auth_token', 'f236ca50b16a38f49c7e698f75637de620ab557ffb349d5c6bd966c5cd84486b', '[\"*\"]', NULL, NULL, '2024-11-13 05:13:01', '2024-11-13 05:13:01'),
(97, 'App\\Models\\User', 17, 'auth_token', '493fc3a0e54d993e6dfa1526fa9788385a4fce77052e9631dfdb56eb0921ffa2', '[\"*\"]', NULL, NULL, '2024-11-13 05:14:19', '2024-11-13 05:14:19'),
(98, 'App\\Models\\User', 17, 'auth_token', 'ac24173040b0a0817832fd30377584d899a2b65bc1c66a5032920728210f187b', '[\"*\"]', NULL, NULL, '2024-11-13 05:17:26', '2024-11-13 05:17:26'),
(99, 'App\\Models\\User', 17, 'auth_token', 'e192cdc0a113900d4cdb7f8bc22b0f1ed3644affe09867de3865392720e8668c', '[\"*\"]', NULL, NULL, '2024-11-13 05:17:45', '2024-11-13 05:17:45'),
(100, 'App\\Models\\User', 20, 'auth_token', '7357c43102c4045516ce80e463912ef3aec16a33cc5cebc2e2d9954019444342', '[\"*\"]', NULL, NULL, '2024-11-13 05:22:08', '2024-11-13 05:22:08'),
(101, 'App\\Models\\User', 17, 'auth_token', '03561735114b5ccbaf92afce683d59d054e89de8d1f0e878ab0afb6242f31077', '[\"*\"]', NULL, NULL, '2024-11-13 05:23:14', '2024-11-13 05:23:14'),
(102, 'App\\Models\\User', 20, 'auth_token', '415a84a1e41ef10cd25f2c32123febd931b177e297f2035ef508e772af9f374d', '[\"*\"]', NULL, NULL, '2024-11-13 05:37:10', '2024-11-13 05:37:10'),
(103, 'App\\Models\\User', 20, 'auth_token', 'f2b2a7e8d4fe6e6e1d6d3530a6731a115de06805e70e49de8957170b83c5d1c5', '[\"*\"]', NULL, NULL, '2024-11-13 06:15:08', '2024-11-13 06:15:08'),
(104, 'App\\Models\\User', 17, 'auth_token', '0dad5f9009f605a1bf392ced10cc08fecd4db0f56bdb915425faa8a9883dc95c', '[\"*\"]', NULL, NULL, '2024-11-13 07:02:33', '2024-11-13 07:02:33'),
(105, 'App\\Models\\User', 20, 'auth_token', '5c3f2c7da4efa59b7efae766b902199188a9abaae2da19c7db624a689c1e981e', '[\"*\"]', NULL, NULL, '2024-11-13 07:57:31', '2024-11-13 07:57:31'),
(106, 'App\\Models\\User', 17, 'auth_token', '9900860e86ffe3b0f9b39473442e4262ea75cb404cc57ef5767180faa890c258', '[\"*\"]', NULL, NULL, '2024-11-13 14:25:01', '2024-11-13 14:25:01'),
(107, 'App\\Models\\User', 17, 'auth_token', '66f4793fceebfad79fef3d6f49b2588ac3452a49eb76d40fa98660bb4e528ad7', '[\"*\"]', NULL, NULL, '2024-11-13 14:27:43', '2024-11-13 14:27:43'),
(108, 'App\\Models\\User', 17, 'auth_token', '0896e0c6f4c2c7502d9224de69062e282a882fdd39a93dffca9b74a6e788a144', '[\"*\"]', NULL, NULL, '2024-11-13 14:30:45', '2024-11-13 14:30:45'),
(109, 'App\\Models\\User', 17, 'auth_token', '4184cbc6b740d967ae54c1ac0aa5706714eb79717c2ff51737965dedce5cbd10', '[\"*\"]', NULL, NULL, '2024-11-13 18:30:25', '2024-11-13 18:30:25'),
(110, 'App\\Models\\User', 17, 'auth_token', '5587059961c06bb292c5f3f350ea1eba74675798dfa82bef6f78b73ce6a613ad', '[\"*\"]', NULL, NULL, '2024-11-13 18:30:26', '2024-11-13 18:30:26'),
(111, 'App\\Models\\User', 20, 'auth_token', '5cf945913e44aa4710a6d4c890ea2df02e88cc7a4e21a19ca88732ddb738f325', '[\"*\"]', NULL, NULL, '2024-11-13 18:44:56', '2024-11-13 18:44:56'),
(112, 'App\\Models\\User', 20, 'auth_token', 'cf1f055d6774f6eff4ac6520f470528135f8def6c46fff39e3fcd50e7270afab', '[\"*\"]', NULL, NULL, '2024-11-13 18:51:51', '2024-11-13 18:51:51'),
(113, 'App\\Models\\User', 20, 'auth_token', 'e9dd07172c864aafdd23ad20cbd21cc7f9a5ba71a41aceeed9e4fe29992bf02a', '[\"*\"]', NULL, NULL, '2024-11-13 19:04:11', '2024-11-13 19:04:11'),
(114, 'App\\Models\\User', 17, 'auth_token', '651a961cb2725c9713c29992b057bafdafdfa7c71e5f11d7bae58b097f9e02c3', '[\"*\"]', NULL, NULL, '2024-11-13 19:15:26', '2024-11-13 19:15:26'),
(115, 'App\\Models\\User', 17, 'auth_token', '61850f83cb866ee24aaf8d6fbcbdd9fb08810ff2f1439b30a787a854a93ee287', '[\"*\"]', NULL, NULL, '2024-11-13 19:17:37', '2024-11-13 19:17:37'),
(116, 'App\\Models\\User', 17, 'auth_token', 'cbebfc9136fb9b972a614c8972b704c9af46079d62a3491b33b923d0e6aee228', '[\"*\"]', NULL, NULL, '2024-11-13 19:20:18', '2024-11-13 19:20:18'),
(117, 'App\\Models\\User', 17, 'auth_token', '24b8875dba93b657a5db07b2d23cff8f9894619d5f9f9bef8b54d408f8d561ec', '[\"*\"]', NULL, NULL, '2024-11-13 19:28:07', '2024-11-13 19:28:07'),
(118, 'App\\Models\\User', 20, 'auth_token', '859179e83fd4761b1d3566c88fcfcc3b40ccfbd00974aa1327b2bf0062c649ed', '[\"*\"]', NULL, NULL, '2024-11-13 19:34:37', '2024-11-13 19:34:37'),
(119, 'App\\Models\\User', 20, 'auth_token', '333d5351e025a4631709c4f1d7e9fe0be77d452fcac756ffb6998641ff300199', '[\"*\"]', NULL, NULL, '2024-11-13 19:38:01', '2024-11-13 19:38:01'),
(120, 'App\\Models\\User', 20, 'auth_token', '4c91d988dddee9075f8b15ee9ec1751fa61c5c2c20f946b0192f991f9a30bbb7', '[\"*\"]', NULL, NULL, '2024-11-13 19:48:30', '2024-11-13 19:48:30'),
(121, 'App\\Models\\User', 20, 'auth_token', 'e28e2fac3e5b0aae3c6eb11536903b17eb5d264624cbbb2d57c24eb741c8e562', '[\"*\"]', NULL, NULL, '2024-11-13 19:55:51', '2024-11-13 19:55:51'),
(122, 'App\\Models\\User', 17, 'auth_token', 'd722d6aa3310c4f8d8054b2554e4639e68c9e3e42790e75f71aec5d430e49fed', '[\"*\"]', NULL, NULL, '2024-11-15 02:17:18', '2024-11-15 02:17:18'),
(123, 'App\\Models\\User', 20, 'auth_token', '19b392dca38301ef0c9bf6271b658994274371127b2404c1f1777fe8ee3a34d0', '[\"*\"]', NULL, NULL, '2024-11-15 02:22:37', '2024-11-15 02:22:37'),
(124, 'App\\Models\\User', 17, 'auth_token', '83adb3b85afafc37805d5e8c13be5818e549e6855a3857f3b3a511bf25f6f257', '[\"*\"]', '2024-11-28 02:14:18', NULL, '2024-11-27 01:34:01', '2024-11-28 02:14:18'),
(125, 'App\\Models\\User', 20, 'auth_token', 'af1f17139aa5ca03a81e5cff92645898a5167ce4df8d0a2260feba729c6bdb15', '[\"*\"]', NULL, NULL, '2024-11-28 02:19:11', '2024-11-28 02:19:11'),
(126, 'App\\Models\\User', 17, 'auth_token', '95af6c9be15e802625571f626fda482fbce79b5e986dd20cdfc8aff49e5a9a9a', '[\"*\"]', NULL, NULL, '2024-11-29 00:21:30', '2024-11-29 00:21:30'),
(127, 'App\\Models\\User', 20, 'auth_token', 'a12b7dcc85e2c73419c5d1f9641039cd4ac31a03aa3847d8fd49b40736deb829', '[\"*\"]', NULL, NULL, '2024-11-29 00:31:11', '2024-11-29 00:31:11'),
(128, 'App\\Models\\User', 17, 'auth_token', '68b27d5adef0fb6ba660ba641d90bcf426837faa9c74ad7d2e04828a317a984f', '[\"*\"]', NULL, NULL, '2024-11-29 00:31:44', '2024-11-29 00:31:44'),
(129, 'App\\Models\\User', 17, 'auth_token', '0f1e924d868a1574bdd24d5c941b53a5c5703b95386cfa76ab31b937906ddd43', '[\"*\"]', NULL, NULL, '2024-11-29 00:41:08', '2024-11-29 00:41:08'),
(130, 'App\\Models\\User', 17, 'auth_token', '4a39b1cb2329979bf2653f3d6f82f39014388bba31224d142a6cfc73a7be563a', '[\"*\"]', NULL, NULL, '2024-11-29 02:09:29', '2024-11-29 02:09:29'),
(131, 'App\\Models\\User', 17, 'auth_token', '25d54de3a4034181972874d2d87ab04708e459d6d0391cd2b8ac3f2e7ca68616', '[\"*\"]', NULL, NULL, '2024-11-29 02:17:26', '2024-11-29 02:17:26'),
(132, 'App\\Models\\User', 17, 'auth_token', '3c9565251d831ab3800c74a2184346aea42e0f00c2823c3af977c3f2bd46ca61', '[\"*\"]', NULL, NULL, '2024-11-29 02:18:32', '2024-11-29 02:18:32'),
(133, 'App\\Models\\User', 17, 'auth_token', 'ec8323c1f1743f3ec852276d9420a01735924267ed067d051a37d35b9926e14f', '[\"*\"]', NULL, NULL, '2024-11-29 02:20:09', '2024-11-29 02:20:09'),
(134, 'App\\Models\\User', 17, 'auth_token', 'b65023e9a33f037f2599a9b80a63080012c8e9d389a900ef3bed44e9b7faa287', '[\"*\"]', NULL, NULL, '2024-11-29 02:22:29', '2024-11-29 02:22:29'),
(135, 'App\\Models\\User', 17, 'auth_token', '7d0966bbde356c7edbc44fa7491e6814685df414b6c7a05483f8e895d9933bef', '[\"*\"]', NULL, NULL, '2024-11-29 02:23:36', '2024-11-29 02:23:36'),
(136, 'App\\Models\\User', 17, 'auth_token', '88b0cf5036f5c99f85fb7597ddc4ad85061a274d27c2f4bf348143a7e4b3d3ca', '[\"*\"]', NULL, NULL, '2024-11-29 02:24:58', '2024-11-29 02:24:58'),
(137, 'App\\Models\\User', 17, 'auth_token', 'e0bc675e77525c93cde641774967dce9e0f2f04ea7b3e21c3571914b987e6614', '[\"*\"]', NULL, NULL, '2024-11-29 02:25:22', '2024-11-29 02:25:22'),
(138, 'App\\Models\\User', 17, 'auth_token', '59848510934725b5a7339bd5ab8efdb37df6ef53c7a227e992313fe803ef425c', '[\"*\"]', NULL, NULL, '2024-11-29 02:25:56', '2024-11-29 02:25:56'),
(139, 'App\\Models\\User', 17, 'auth_token', '2d50a28900da6d003f50a94dc1d0bbd93f7a0f9a8aab57b0f272b9342a2bb2bd', '[\"*\"]', NULL, NULL, '2024-11-29 02:26:38', '2024-11-29 02:26:38'),
(140, 'App\\Models\\User', 17, 'auth_token', 'a4f0ea580a5feffb4bbd920cd2e72b3aefa2d6d58770ec933349232fbfdc252d', '[\"*\"]', NULL, NULL, '2024-11-29 02:28:30', '2024-11-29 02:28:30'),
(141, 'App\\Models\\User', 20, 'auth_token', 'c7c2299372b0abd6671720228f7afa688414b340ee518498b9ca830cea12b477', '[\"*\"]', NULL, NULL, '2024-11-29 02:29:38', '2024-11-29 02:29:38'),
(142, 'App\\Models\\User', 20, 'auth_token', 'a13e5bd973dd5e9984d4be8e0b333216e764ea4eea27f3ab6dad673e148d163b', '[\"*\"]', NULL, NULL, '2024-11-29 02:31:56', '2024-11-29 02:31:56'),
(143, 'App\\Models\\User', 17, 'auth_token', '387f38cf3d2eeaa7d7c3e3df0ae536cfc85ad5a1bcd0755b9c87f4fb1d247244', '[\"*\"]', NULL, NULL, '2024-11-29 20:19:47', '2024-11-29 20:19:47'),
(144, 'App\\Models\\User', 17, 'auth_token', 'ec24fdf8761ce7ad417211dca697f6374a411981f72d9728e628fa6e720cdc2e', '[\"*\"]', '2024-11-29 20:58:47', NULL, '2024-11-29 20:40:37', '2024-11-29 20:58:47'),
(145, 'App\\Models\\User', 17, 'auth_token', '36504215e8e09e5c23c8fa77f2c7473cf1b1e671b55351101e8deaa8bfae8274', '[\"*\"]', '2024-11-29 22:12:47', NULL, '2024-11-29 21:07:35', '2024-11-29 22:12:47'),
(146, 'App\\Models\\User', 17, 'auth_token', '19827cbd1b24ad68488c00c1cbd65ecf2a2db9523c0dbf7f9edf214d2a06ec37', '[\"*\"]', '2024-11-29 22:36:44', NULL, '2024-11-29 22:33:30', '2024-11-29 22:36:44'),
(147, 'App\\Models\\User', 20, 'auth_token', 'eacada23c65f75e4e6a7c41cda8ced9939e26f1c4bf61a3bff03cb17194ed338', '[\"*\"]', NULL, NULL, '2024-11-29 22:43:37', '2024-11-29 22:43:37'),
(148, 'App\\Models\\User', 17, 'auth_token', 'b9f8f36bb96f537454ab39334af0a5df152619e23f4209ad1536f15950e093c9', '[\"*\"]', '2024-11-29 23:16:19', NULL, '2024-11-29 22:44:47', '2024-11-29 23:16:19'),
(149, 'App\\Models\\User', 17, 'auth_token', '8636f2f6eee76f6693fe9b90b9b408b4455b5583fc5266efabcd5e05825e851f', '[\"*\"]', NULL, NULL, '2024-12-02 03:37:47', '2024-12-02 03:37:47'),
(150, 'App\\Models\\User', 17, 'auth_token', '104ff293aaa82abaedcff5d3404377015c3c704b3b068f0676fa4e0f405a7322', '[\"*\"]', NULL, NULL, '2024-12-02 03:38:04', '2024-12-02 03:38:04'),
(151, 'App\\Models\\User', 17, 'auth_token', '0f7b3cda5b4b803e03807efe8658376f80b02047d602a77c44a47ac467084c87', '[\"*\"]', '2024-12-02 06:31:23', NULL, '2024-12-02 03:45:07', '2024-12-02 06:31:23'),
(152, 'App\\Models\\User', 17, 'auth_token', 'c938040d1902d0877f39c676718b0a1878c4263a9442abd5d11a9de5b2ae5b33', '[\"*\"]', '2024-12-04 00:38:39', NULL, '2024-12-02 06:31:33', '2024-12-04 00:38:39'),
(153, 'App\\Models\\User', 17, 'auth_token', 'f4af817e2264655378a893e42329b7be9158c86f9168ca0d3e29cc2e3df629ef', '[\"*\"]', '2024-12-04 00:54:27', NULL, '2024-12-04 00:38:51', '2024-12-04 00:54:27'),
(154, 'App\\Models\\User', 17, 'auth_token', '1ac8bbb802a8d38c197827627adefe3851d3f1bc8d2bcdabef578b563eb9ea3a', '[\"*\"]', '2024-12-06 03:00:10', NULL, '2024-12-04 00:57:20', '2024-12-06 03:00:10'),
(155, 'App\\Models\\User', 20, 'auth_token', '5f2cdb24e439dfe5b30921fff6ae27b5e9159430d45ff07fab51200627343bfe', '[\"*\"]', '2024-12-09 02:05:41', NULL, '2024-12-09 02:01:56', '2024-12-09 02:05:41'),
(156, 'App\\Models\\User', 17, 'auth_token', '4b363feb6182bd177efd56e03fd6333e1cd4263869743b79ac8ec97c79dc7bc7', '[\"*\"]', '2024-12-18 00:03:32', NULL, '2024-12-09 02:30:39', '2024-12-18 00:03:32'),
(157, 'App\\Models\\User', 20, 'auth_token', '39e47a8c90288d3ba7505becdee830479e4e96b512fe70833aaadcc3ddc417c2', '[\"*\"]', '2025-01-09 18:02:51', NULL, '2024-12-18 01:17:22', '2025-01-09 18:02:51'),
(158, 'App\\Models\\User', 17, 'auth_token', '36827657da5b9605f3e03ad7ff444435fb7063262e3691d48dcd9fc58f55037c', '[\"*\"]', '2025-01-09 18:20:37', NULL, '2025-01-09 18:09:36', '2025-01-09 18:20:37'),
(159, 'App\\Models\\User', 20, 'auth_token', '1b841726ed3054ef0fcf1b7e7dd20d7b8589194ad70bd6a9144b4345f11c9b07', '[\"*\"]', NULL, NULL, '2025-01-09 18:21:46', '2025-01-09 18:21:46'),
(160, 'App\\Models\\User', 17, 'auth_token', 'b21a74b935697f4ca801f8d9d4824d3296558051d7639adf099a3bade4e88da7', '[\"*\"]', '2025-01-09 18:25:22', NULL, '2025-01-09 18:23:35', '2025-01-09 18:25:22'),
(161, 'App\\Models\\User', 17, 'auth_token', '1212331d0afb9a6ac5c8398fde4afde22dfc2ba6b7a9468a14864211a2008231', '[\"*\"]', '2025-01-09 18:57:47', NULL, '2025-01-09 18:38:35', '2025-01-09 18:57:47'),
(162, 'App\\Models\\User', 20, 'auth_token', 'a2643a61447ccc2adbec61c7dc11c53fa047bd88dfa8ddeb4aee12677219f86e', '[\"*\"]', NULL, NULL, '2025-01-09 18:40:34', '2025-01-09 18:40:34'),
(163, 'App\\Models\\User', 20, 'auth_token', 'ad633c567188b70d6f8caf84c716a6d78d6f4d8cc8b36e10620163df094d855a', '[\"*\"]', '2025-01-09 19:11:27', NULL, '2025-01-09 19:08:03', '2025-01-09 19:11:27'),
(164, 'App\\Models\\User', 20, 'auth_token', '7750c35a175e30fa60031c5f6f626ad875b8655a0ec73acd25efca31120e181d', '[\"*\"]', '2025-01-09 19:23:09', NULL, '2025-01-09 19:12:37', '2025-01-09 19:23:09'),
(165, 'App\\Models\\User', 17, 'auth_token', '144b372ef916eef71eb78aebe64a08af383eb11606049b49a942b3d659c547e0', '[\"*\"]', '2025-01-09 19:48:19', NULL, '2025-01-09 19:23:32', '2025-01-09 19:48:19'),
(166, 'App\\Models\\User', 17, 'auth_token', 'ad6c999593b30acb90ee4ea7cd3568dbbf82bcc0a9200f7a6cee9d24a41f9080', '[\"*\"]', '2025-01-09 22:47:24', NULL, '2025-01-09 22:47:05', '2025-01-09 22:47:24'),
(167, 'App\\Models\\User', 20, 'auth_token', '5b31bdc7098b01812bed96d959cd0f0761869ca301e509844bd9bee966e7c88f', '[\"*\"]', NULL, NULL, '2025-01-09 22:51:03', '2025-01-09 22:51:03'),
(168, 'App\\Models\\User', 17, 'auth_token', '90540e657269cc530cefb68f07bc9470de90077391e7a81d3f440c956564f7c7', '[\"*\"]', '2025-01-09 23:29:34', NULL, '2025-01-09 23:08:40', '2025-01-09 23:29:34'),
(169, 'App\\Models\\User', 17, 'auth_token', '930cf296e55e3f5d8f8eca6cb306e96830e4399c1484cdbc9737efcac8bf05ff', '[\"*\"]', NULL, NULL, '2025-01-09 23:56:25', '2025-01-09 23:56:25'),
(170, 'App\\Models\\User', 17, 'auth_token', '3d804bde49d09342b505b696b06f42012f6b5a9a60a52276cb2b55ed2a3eca8b', '[\"*\"]', '2025-01-10 02:06:53', NULL, '2025-01-09 23:56:37', '2025-01-10 02:06:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(15,0) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` tinyint NOT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `product_name`, `price`, `description`, `status`, `category_id`, `created_at`, `updated_at`) VALUES
(104, 'Quần jean nam JBAGY dáng suông cạp chun \r\n', 120000, 'Một chiếc quần jean ống rộng phải đặt tiêu chí Thoải Mái lên hàng đầu. Nên\r\nJBAGY sử dụng chất vải denim cotton 100% giặt mềm, \r\nĐiểm nhấn là phần cạp chun phía sau co giãn nhẹ sẽ fit với vòng bụng của các bạn. ', 0, 408, '2024-11-08 13:02:52', '2024-11-13 14:44:25'),
(105, 'Áo sơ mi nam ngắn tay cổ vest cao cấp không nhăn LADOS-8109 thời trang, dễ phối đồ', 139000, 'Áo sơ mi nam ngắn tay cổ vest cao cấp không nhăn LADOS-8109 thời trang, dễ phối đồ\r\nThông tin sản phẩm:\r\nChất liệu: chất mago mềm mịn , thoáng mát \r\nÁo thấm hút mồ hôi tốt\r\nForm rộng vừa, đứng form áo cực kỳ trẻ trung năng động\r\nChất vải dày đẹp, không xù lông, không phai màu\r\nĐường may cực tỉ mỉ cực đẹp\r\nCó thể mặc đi làm, đi chơi, đặc biệt đi tiệc sự kiện , cực sang trọng', 1, 408, '2024-11-08 13:03:58', '2024-11-13 14:44:25'),
(106, 'Giày Sandal Nam Nữ SHONDO F6 Sport', 375000, 'THÔNG SỐ KĨ THUẬT\r\nThương hiệu: THEWOLF\r\nChất liệu: Da bò nhập khẩu\r\nLót trong: Vải canvas cao cấp\r\nĐế giữa: PU cao cấp\r\nĐế dưới: Chất liệu IP\r\nĐộ cao đế: 4cm', 0, 408, '2024-11-10 00:46:26', '2024-11-13 14:44:25'),
(267, 'Giày Thể Thao Phối G011 Màu Đen', 253000, 'THÔNG TIN SẢN PHẨM\r\n\r\nGiày form chuẩn nên các bạn chọn đúng size mình đang đi, hoặc các bạn nhắn tin trực tiếp cho shop để được tư vấn size nhé\r\nKiểu dáng hot trend, trẻ trung dễ phối đồ.\r\nGiày đẹp, nhẹ, bền, giá phải chăng.', 1, 408, '2024-11-12 14:43:33', '2024-11-13 14:44:25'),
(268, 'Thắt Lưng khóa tự động TL175', 100000, ' Dây Thắt Lưng Nam được làm từ chất liệu da Safiano Italia: SAFIANO là dòng da nổi tiếng Của Ý, trong quá trình sản xuất đã được xử lý kỹ bề mặt với hợp chất đặc biệt nên chất da hầu như rất ít thấm nước, khó trầy xướt, không bị gãy hay nhăm khi sử dụng, Vì vậy dòng da này đặc biệt phù hợp với người dùng có mồ hôi múi, ra nhiều mồ hôi hay làm ở môi trường có độ ẩm nóng cao', 1, 414, '2024-11-13 14:48:47', '2024-11-13 14:48:47'),
(269, 'Dây chuyền bạc s925', 299000, 'Bạc 925 là tiêu chuẩn quốc tế của trang sức bạc, trong đó 92.5% trọng lượng là bạc nguyên chất còn lại 7.5% là các hợp kim khác chủ yếu là đồng tạo nên độ cứng, độ bóng sáng, bền đẹp cho sản phẩm. Do bạc nguyên chất quá mềm nên không thể làm những chi tiết sản phẩm nhỏ tinh tế  nhiều kiểu dáng, đặc biệt là khi gắn nhiều viên đá bé nên người ta phải cho thêm các hợp chất khác để tạo độ bền, độ cứng và sáng bóng. Chính vì vậy, mỗi thiết kế trang sức bạc 925 đều tinh xảo hơn, thời trang hơn điều mà bạc nguyên chất không thể làm được', 1, 408, '2024-11-13 14:48:47', '2024-11-13 14:48:47'),
(272, 'Quần jean nam JBAGY dáng suông cạp chun \r\n', 120000, 'Một chiếc quần jean ống rộng phải đặt tiêu chí Thoải Mái lên hàng đầu. Nên\r\nJBAGY sử dụng chất vải denim cotton 100% giặt mềm, \r\nĐiểm nhấn là phần cạp chun phía sau co giãn nhẹ sẽ fit với vòng bụng của các bạn.', 0, 408, '2024-11-08 06:02:52', '2024-11-13 07:44:25'),
(273, 'Áo sơ mi nam ngắn tay cổ vest cao cấp không nhăn LADOS-8109 thời trang, dễ phối đồ', 139000, 'Áo sơ mi nam ngắn tay cổ vest cao cấp không nhăn LADOS-8109 thời trang, dễ phối đồ\r\nThông tin sản phẩm:\r\nChất liệu: chất mago mềm mịn , thoáng mát \r\nÁo thấm hút mồ hôi tốt\r\nForm rộng vừa, đứng form áo cực kỳ trẻ trung năng động\r\nChất vải dày đẹp, không xù lông, không phai màu\r\nĐường may cực tỉ mỉ cực đẹp\r\nCó thể mặc đi làm, đi chơi, đặc biệt đi tiệc sự kiện , cực sang trọng', 1, 408, '2024-11-08 06:03:58', '2024-11-13 07:44:25'),
(274, 'Giày Sandal Nam Nữ SHONDO F6 Sport', 375000, 'THÔNG SỐ KĨ THUẬT\r\nThương hiệu: THEWOLF\r\nChất liệu: Da bò nhập khẩu\r\nLót trong: Vải canvas cao cấp\r\nĐế giữa: PU cao cấp\r\nĐế dưới: Chất liệu IP\r\nĐộ cao đế: 4cm', 0, 408, '2024-11-09 17:46:26', '2024-11-13 07:44:25'),
(275, 'Giày Thể Thao Phối G011 Màu Đen', 253000, 'THÔNG TIN SẢN PHẨM\r\n\r\nGiày form chuẩn nên các bạn chọn đúng size mình đang đi, hoặc các bạn nhắn tin trực tiếp cho shop để được tư vấn size nhé\r\nKiểu dáng hot trend, trẻ trung dễ phối đồ.\r\nGiày đẹp, nhẹ, bền, giá phải chăng.', 1, 408, '2024-11-12 07:43:33', '2024-11-13 07:44:25'),
(276, 'Thắt Lưng khóa tự động TL175', 100000, 'Dây Thắt Lưng Nam được làm từ chất liệu da Safiano Italia: SAFIANO là dòng da nổi tiếng Của Ý, trong quá trình sản xuất đã được xử lý kỹ bề mặt với hợp chất đặc biệt nên chất da hầu như rất ít thấm nước, khó trầy xướt, không bị gãy hay nhăm khi sử dụng, Vì vậy dòng da này đặc biệt phù hợp với người dùng có mồ hôi múi, ra nhiều mồ hôi hay làm ở môi trường có độ ẩm nóng cao', 1, 414, '2024-11-13 07:48:47', '2024-11-13 07:48:47'),
(277, 'Dây chuyền bạc s925', 299000, 'Bạc 925 là tiêu chuẩn quốc tế của trang sức bạc, trong đó 92.5% trọng lượng là bạc nguyên chất còn lại 7.5% là các hợp kim khác chủ yếu là đồng tạo nên độ cứng, độ bóng sáng, bền đẹp cho sản phẩm. Do bạc nguyên chất quá mềm nên không thể làm những chi tiết sản phẩm nhỏ tinh tế  nhiều kiểu dáng, đặc biệt là khi gắn nhiều viên đá bé nên người ta phải cho thêm các hợp chất khác để tạo độ bền, độ cứng và sáng bóng. Chính vì vậy, mỗi thiết kế trang sức bạc 925 đều tinh xảo hơn, thời trang hơn điều mà bạc nguyên chất không thể làm được', 1, 408, '2024-11-13 07:48:47', '2024-11-13 07:48:47'),
(278, 'Quần jean nam slim fit', 150000, 'Quần jean nam slim fit, thiết kế thời trang, ôm vừa vặn cơ thể. Chất liệu denim bền đẹp, mang lại cảm giác thoải mái khi di chuyển. Phù hợp với nhiều phong cách khác nhau.', 1, 408, '2024-11-14 04:00:00', '2024-11-14 04:00:00'),
(279, 'Áo khoác nam dạ dài', 780000, 'Áo khoác nam dạ dài, thiết kế sang trọng, ấm áp cho mùa đông. Chất liệu dạ cao cấp, giữ ấm tốt và dễ phối đồ với nhiều trang phục khác nhau. Lý tưởng cho những ngày lạnh giá.', 0, 408, '2024-11-14 04:02:00', '2024-11-14 04:02:00'),
(280, 'Giày thể thao sneaker nam', 450000, 'Giày thể thao sneaker nam với thiết kế hiện đại, đế cao su bền bỉ, đệm êm ái giúp bạn thoải mái khi di chuyển. Phù hợp cho các hoạt động thể thao và đi dạo.', 1, 408, '2024-11-14 04:04:00', '2024-11-14 04:04:00'),
(281, 'Áo thun nam kẻ sọc', 100000, 'Áo thun nam kẻ sọc, kiểu dáng trẻ trung và thời trang. Chất liệu cotton mịn, thấm hút mồ hôi tốt, mang lại cảm giác thoải mái cả ngày dài.', 0, 408, '2024-11-14 04:06:00', '2024-11-14 04:06:00'),
(282, 'Giày loafer nam', 350000, 'Giày loafer nam, kiểu dáng lịch lãm và thời trang. Chất liệu da cao cấp, thoáng khí và bền bỉ. Phù hợp với các dịp đi làm, tiệc tùng, hoặc dạo phố.', 1, 408, '2024-11-14 04:08:00', '2024-11-14 04:08:00'),
(283, 'Thắt lưng da nam cao cấp', 200000, 'Thắt lưng da nam cao cấp, được làm từ chất liệu da thật, đường may chắc chắn. Dây thắt lưng bền đẹp, phù hợp cho mọi hoàn cảnh từ công sở đến đi chơi.', 1, 408, '2024-11-14 04:10:00', '2024-11-14 04:10:00'),
(284, 'Áo sơ mi nam trắng', 190000, 'Áo sơ mi nam trắng, thiết kế thanh lịch, phù hợp cho môi trường công sở hoặc các sự kiện. Chất liệu cotton cao cấp, dễ chịu khi mặc cả ngày dài.', 0, 408, '2024-11-14 04:12:00', '2024-11-14 04:12:00'),
(285, 'Dây chuyền bạc nam', 280000, 'Dây chuyền bạc nam, thiết kế sang trọng với bạc 925, bền đẹp và sáng bóng. Phù hợp với các dịp đặc biệt hoặc làm quà tặng cho người thân.', 1, 408, '2024-11-14 04:14:00', '2024-11-14 04:14:00'),
(286, 'Áo len nam cổ lọ', 350000, 'Áo len nam cổ lọ, chất liệu len ấm áp, ôm sát cơ thể, phù hợp cho mùa đông lạnh. Thiết kế đơn giản nhưng sang trọng, dễ phối đồ.', 0, 408, '2024-11-14 04:16:00', '2024-11-14 04:16:00'),
(287, 'Quần shorts nam', 250000, 'Quần shorts nam, chất liệu cotton nhẹ nhàng, thoải mái, dễ chịu. Phù hợp cho các hoạt động thể thao, dạo phố hoặc đi biển.', 1, 408, '2024-11-14 04:18:00', '2024-11-14 04:18:00'),
(288, 'Áo hoodie nam', 320000, 'Áo hoodie nam với thiết kế năng động, phù hợp cho những ngày se lạnh. Chất liệu nỉ mềm mại, giữ ấm tốt, dễ phối đồ với quần jean hoặc quần thể thao.', 1, 408, '2024-11-14 04:20:00', '2024-11-14 04:20:00'),
(289, 'Giày boots nam', 650000, 'Giày boots nam, thiết kế mạnh mẽ, chất liệu da cao cấp bền bỉ. Phù hợp cho những ngày lạnh và có thể kết hợp với nhiều kiểu trang phục khác nhau.', 0, 408, '2024-11-14 04:22:00', '2024-11-14 04:22:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` int UNSIGNED NOT NULL,
  `product_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_img`, `product_id`, `created_at`, `updated_at`) VALUES
(113, 'https://4menshop.com/images/thumbs/2022/06/-16908-slide-products-62b161ed8af8e.png', 105, NULL, NULL),
(114, 'https://4menshop.com/images/thumbs/2022/06/-16908-slide-products-62b161ee099d1.png', 105, NULL, NULL),
(115, 'https://4menshop.com/images/thumbs/2022/06/-16908-slide-products-62b161eec1308.png', 105, NULL, NULL),
(122, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd8eb8e4.jpg', 104, NULL, NULL),
(123, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd905324.jpg', 104, NULL, NULL),
(124, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd91ae3e.jpg', 104, NULL, NULL),
(125, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a872e4abc.jpg', 106, NULL, NULL),
(126, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87302f7d.jpg', 106, NULL, NULL),
(127, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87311819.jpg', 106, NULL, NULL),
(128, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d163df.JPG', 267, NULL, NULL),
(129, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d8b6ac.JPG', 267, NULL, NULL),
(130, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9db5911.JPG', 267, NULL, NULL),
(131, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219ac21c1.jpg', 268, NULL, NULL),
(132, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219aceea5.jpg', 268, NULL, NULL),
(133, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 268, NULL, NULL),
(134, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a82bb0f.jpg', 269, NULL, NULL),
(135, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a83dd92.jpg', 269, NULL, NULL),
(136, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a8587b8.jpg', 269, NULL, NULL),
(139, 'https://4menshop.com/images/thumbs/2022/06/-16908-slide-products-62b161ed8af8e.png', 105, NULL, NULL),
(140, 'https://4menshop.com/images/thumbs/2022/06/-16908-slide-products-62b161ee099d1.png', 105, NULL, NULL),
(141, 'https://4menshop.com/images/thumbs/2022/06/-16908-slide-products-62b161eec1308.png', 105, NULL, NULL),
(142, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd8eb8e4.jpg', 104, NULL, NULL),
(143, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd905324.jpg', 104, NULL, NULL),
(144, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd91ae3e.jpg', 104, NULL, NULL),
(145, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a872e4abc.jpg', 106, NULL, NULL),
(146, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87302f7d.jpg', 106, NULL, NULL),
(147, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87311819.jpg', 106, NULL, NULL),
(148, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d163df.JPG', 267, NULL, NULL),
(149, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d8b6ac.JPG', 267, NULL, NULL),
(150, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9db5911.JPG', 267, NULL, NULL),
(151, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219ac21c1.jpg', 268, NULL, NULL),
(152, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219aceea5.jpg', 268, NULL, NULL),
(153, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 268, NULL, NULL),
(154, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a82bb0f.jpg', 269, NULL, NULL),
(155, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a83dd92.jpg', 269, NULL, NULL),
(156, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a8587b8.jpg', 269, NULL, NULL),
(157, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd8eb8e4.jpg', 272, NULL, NULL),
(158, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd905324.jpg', 272, NULL, NULL),
(159, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd905324.jpg', 272, NULL, NULL),
(160, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a872e4abc.jpg', 273, NULL, NULL),
(161, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87302f7d.jpg', 273, NULL, NULL),
(162, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87302f7d.jpg', 273, NULL, NULL),
(163, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d163df.JPG', 274, NULL, NULL),
(164, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d163df.JPG', 274, NULL, NULL),
(165, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d8b6ac.JPG', 274, NULL, NULL),
(166, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219ac21c1.jpg', 275, NULL, NULL),
(167, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219aceea5.jpg', 275, NULL, NULL),
(168, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219aceea5.jpg', 275, NULL, NULL),
(169, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a82bb0f.jpg', 276, NULL, NULL),
(170, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a83dd92.jpg', 276, NULL, NULL),
(171, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a83dd92.jpg', 276, NULL, NULL),
(172, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 277, NULL, NULL),
(173, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 277, NULL, NULL),
(174, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a8587b8.jpg', 277, NULL, NULL),
(175, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd8eb8e4.jpg', 278, NULL, NULL),
(176, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd8eb8e4.jpg', 278, NULL, NULL),
(177, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd905324.jpg', 278, NULL, NULL),
(178, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a872e4abc.jpg', 279, NULL, NULL),
(179, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a872e4abc.jpg', 279, NULL, NULL),
(180, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87302f7d.jpg', 279, NULL, NULL),
(181, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d163df.JPG', 280, NULL, NULL),
(182, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d8b6ac.JPG', 280, NULL, NULL),
(183, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d8b6ac.JPG', 280, NULL, NULL),
(184, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219ac21c1.jpg', 281, NULL, NULL),
(185, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219ac21c1.jpg', 281, NULL, NULL),
(186, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219aceea5.jpg', 281, NULL, NULL),
(187, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a82bb0f.jpg', 282, NULL, NULL),
(188, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a82bb0f.jpg', 282, NULL, NULL),
(189, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a83dd92.jpg', 282, NULL, NULL),
(190, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 283, NULL, NULL),
(191, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 283, NULL, NULL),
(192, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 283, NULL, NULL),
(193, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd8eb8e4.jpg', 284, NULL, NULL),
(194, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd8eb8e4.jpg', 284, NULL, NULL),
(195, 'https://4menshop.com/images/thumbs/2024/10/quan-jeans-wash-bac-co-rau-meo-theu-4m-form-regular-qj106-mau-xanh-bien-dam-18828-slide-products-6715dbd905324.jpg', 284, NULL, NULL),
(196, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a872e4abc.jpg', 285, NULL, NULL),
(197, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a872e4abc.jpg', 285, NULL, NULL),
(198, 'https://4menshop.com/images/thumbs/2024/05/dep-sandal-quai-ngang-da-microfiber-de-tpr-de005-18569-slide-products-6656a87302f7d.jpg', 285, NULL, NULL),
(199, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d163df.JPG', 286, NULL, NULL),
(200, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d8b6ac.JPG', 286, NULL, NULL),
(201, 'https://4menshop.com/images/thumbs/2022/08/-17096-slide-products-62ea4b9d8b6ac.JPG', 286, NULL, NULL),
(202, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219ac21c1.jpg', 287, NULL, NULL),
(203, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219ac21c1.jpg', 287, NULL, NULL),
(204, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219aceea5.jpg', 287, NULL, NULL),
(205, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a82bb0f.jpg', 288, NULL, NULL),
(206, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a82bb0f.jpg', 288, NULL, NULL),
(207, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a83dd92.jpg', 288, NULL, NULL),
(208, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 289, NULL, NULL),
(209, 'https://4menshop.com/images/thumbs/2024/11/that-lung-khoa-tu-dong-tl179-18881-slide-products-672c219adc83f.jpg', 289, NULL, NULL),
(210, 'https://4menshop.com/images/thumbs/2023/07/-18185-slide-products-64c1e4a8587b8.jpg', 289, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_skus`
--

CREATE TABLE `product_skus` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `sku` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` decimal(15,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `rating`, `comment`, `user_id`, `product_id`, `order_id`, `created_at`, `updated_at`) VALUES
(8, 3, 'tot', 18, 104, 3, '2024-11-30 03:48:57', '2024-11-30 03:48:57'),
(9, 2, 'kjkj', 17, 105, NULL, '2025-01-09 23:23:12', '2025-01-09 23:23:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('4mkNzKx0EtVJlNOiqGqr5SwXnXq24FbvbtdvhvT3', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2xJRkdVSnN4NFFkUjFEU1N3R3hXZFh2dnR0SE5JbVczVlFuZXFVaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1733143323),
('8sCN3S8yr01GYUzSDhHTrI2YaoeFiX2mwPxgdhWn', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMDhicXduV29BV2sxN2l2Rld2eVpGVnN2RENGbVVCbk1BenFQUHE0RSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1732942142),
('Bomm4kRvjwAVWsXoIalXMxONUHVz6fYGvbeNjjUh', NULL, '127.0.0.1', 'PostmanRuntime/7.42.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaWR5WEtna0FDOVJBNTNnUHE5aXBERTNKRFliMTlnOG9YckN6RUFiZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1732704591),
('NGjPFFseSsDoW9SnDnYKaSLfZKi5firsyx6WT2w0', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2tpUE01NGlwWmxzT2p0aTVEdHhUYUt0NWhiZjVLNGo3UlNWNUhYRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1732880682),
('QuvanA28xArWUwX5fBYPFXT5O1pBPMDPqkqQtlTn', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0RFSU1rY2o1bm03emkyelFDQ3hYNGxXUzRPN0U0cnliV05EeXg0USI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1735112892),
('tRRALzUlaTTti0WYgXWxOZiYHVPci94x2QSk8JTj', NULL, '127.0.0.1', 'PostmanRuntime/7.42.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2dVMHNMRWlSWkRnOVhMUzVTVTZna05TWWhjbGs0WXM3V3NTQlBpdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1732780074);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `id` bigint UNSIGNED NOT NULL,
  `shipping_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `shipping_phone` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `shipping_address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `shipping_addresses`
--

INSERT INTO `shipping_addresses` (`id`, `shipping_name`, `user_id`, `shipping_phone`, `shipping_address`, `created_at`, `updated_at`) VALUES
(2, 'Thành Tam', 16, '0367659411', 'Chùa An Long', '2024-11-07 11:24:11', '2024-11-07 11:26:24'),
(57, 'hung nguyen', 20, '0367659411', 'Câu ông cớm, Xã Thạnh Ngãi, Huyện Mỏ Cày Bắc, Tỉnh Bến Tre', '2024-11-28 05:06:28', '2024-11-28 05:06:28'),
(86, 'Thành Tâm', 17, '0367659411', 'Hưng Thanh, Xã Phú Lương, Huyện Lương Tài, Tỉnh Bắc Ninh', '2024-12-11 03:58:24', '2024-12-11 03:58:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sku_values`
--

CREATE TABLE `sku_values` (
  `id` bigint UNSIGNED NOT NULL,
  `product_sku_id` bigint UNSIGNED DEFAULT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `option_id` bigint UNSIGNED NOT NULL,
  `option_value_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_id` varchar(225) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `last_login`, `phone`, `google_id`) VALUES
(16, 'tam', 'inetbumbaby2@gmail.com', NULL, '$2y$12$vLBobjbJ7YWftPyCrfkAquYs619hm5eosYtHjoQZ5OhB/uV82i8qS', 1, NULL, '2024-11-07 04:05:27', '2025-01-09 20:40:47', '2024-11-27 09:05:27', '0367659411', NULL),
(17, 'Tam', 'inetbumbaby123@gmail.com', NULL, '$2y$12$A/1Ds.aO6rNL2QbfmvwmTucdiz65RVlIUWbDXeuix894S6hSqGl.W', 1, NULL, '2024-11-07 04:58:57', '2025-01-09 23:56:37', '2025-01-09 23:56:37', '0367659412', NULL),
(18, 'Huy', 'qndh!@gmail.com', NULL, '$2y$12$lJOG67DqyhpkIH8755mzS.20KiWofWhQe6t28PDsyf0oEXwoANQRm', 1, NULL, '2024-11-08 02:49:48', '2024-11-09 23:51:03', '2024-11-27 10:00:33', '0188382', NULL),
(20, 'ngan', 'ha6862238@gmail.com', NULL, '$2y$12$ecqcGPHDNbYminJrHkAETOt3jEX3HpWfQpKA/xziWq.dfWT3ATQr2', 0, NULL, '2024-11-12 06:30:38', '2025-01-09 19:12:37', '2025-01-09 19:12:37', '0786912938', NULL),
(21, 'Nguyễn', 'inetbumbaby156@gmail.com', NULL, '$2y$12$VM04CQWKmNLe7s7rqTTe/O3jjEzmZ4R3BEt7CMsBvdBZOisGKQ7Vi', 1, NULL, '2024-11-29 02:03:09', '2024-11-29 02:03:09', '2024-11-28 10:00:44', NULL, NULL),
(22, 'tâm Nguyễn', 'inetbumbaby12223@gmail.com', NULL, '$2y$12$sPrNgSfLjBNPKSlJ08FtLuSoRMh3NQ8jpbIIV9ve3zojoElQs9mEC', 1, NULL, '2024-11-29 22:20:07', '2024-11-29 22:20:07', NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `option_values`
--
ALTER TABLE `option_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `option_values_ibfk_1` (`product_id`),
  ADD KEY `option_id` (`option_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_skus`
--
ALTER TABLE `product_skus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `sku_values`
--
ALTER TABLE `sku_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sku_values_ibfk_1` (`product_id`),
  ADD KEY `sku_id` (`product_sku_id`),
  ADD KEY `option_id` (`option_id`),
  ADD KEY `sku_values_ibfk_4` (`option_value_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=457;

--
-- AUTO_INCREMENT cho bảng `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `options`
--
ALTER TABLE `options`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT cho bảng `option_values`
--
ALTER TABLE `option_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=290;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT cho bảng `product_skus`
--
ALTER TABLE `product_skus`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT cho bảng `sku_values`
--
ALTER TABLE `sku_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `option_values`
--
ALTER TABLE `option_values`
  ADD CONSTRAINT `option_values_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `option_values_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `product_skus`
--
ALTER TABLE `product_skus`
  ADD CONSTRAINT `product_skus_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `sku_values`
--
ALTER TABLE `sku_values`
  ADD CONSTRAINT `sku_values_ibfk_1` FOREIGN KEY (`product_sku_id`) REFERENCES `product_skus` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `sku_values_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `sku_values_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
