CREATE TABLE `products`
(
    `id`      INTEGER PRIMARY KEY,
    `name`    TEXT NOT NULL,
    `barcode` TEXT NOT NULL
);

CREATE TABLE `prices`
(
    `id`             INTEGER PRIMARY KEY,
    `product_id`     INTEGER NOT NULL,
    `value`          INTEGER NOT NULL,
    `effective_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

CREATE TABLE `orders`
(
    `id`           INTEGER PRIMARY KEY,
    `order_date`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `order_items`
(
    `id`         INTEGER PRIMARY KEY,
    `order_id`   INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity`   INTEGER NOT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);
