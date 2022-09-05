CREATE SCHEMA IF NOT EXISTS `online_shop` DEFAULT CHARACTER SET utf8mb3 ;
USE `online_shop` ;

-- -----------------------------------------------------
-- Table `online_shop`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`customer` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone` (`phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`order_status` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`shipping_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`shipping_address` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NOT NULL,
  `house_no` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `postcode` VARCHAR(45) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `uc_address` UNIQUE (`street`,`house_no`,`city` , `postcode`,`country`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`customer_shipping_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`customer_shipping_address` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `shipping_address_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_customer_shipping_address_customer_id_idx` (`customer_id` ASC) VISIBLE,
  INDEX `fk_customer_shipping_address_shipping_address_id_idx` (`shipping_address_id` ASC) VISIBLE,
  CONSTRAINT `fk_customer_shipping_address_customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `online_shop`.`customer` (`id`),
  CONSTRAINT `fk_customer_shipping_address_shipping_address_id`
    FOREIGN KEY (`shipping_address_id`)
    REFERENCES `online_shop`.`shipping_address` (`id`),
     CONSTRAINT `uc_customer_address` UNIQUE (`customer_id`,`shipping_address_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`customer_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`customer_order` (
  `customer_order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `order_date` DATETIME NOT NULL,
  `order_status` INT UNSIGNED NULL DEFAULT NULL,
  `order_shipping_address` INT UNSIGNED NOT NULL,
  `order_total` DECIMAL(10,2) NULL,
  PRIMARY KEY (`customer_order_id`),
  INDEX `fk_customer_order_customer_id_idx` (`customer_id` ASC) VISIBLE,
  INDEX `fk_customer_order_order_status_idx` (`order_status` ASC) VISIBLE,
  INDEX `fk_customer_order_customer_shipping_address_idx` (`order_shipping_address` ASC) VISIBLE,
  CONSTRAINT `fk_customer_order_customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `online_shop`.`customer` (`id`),
  CONSTRAINT `fk_customer_order_order_status`
    FOREIGN KEY (`order_status`)
    REFERENCES `online_shop`.`order_status` (`id`),
  CONSTRAINT `fk_customer_order_customer_shipping_address`
    FOREIGN KEY (`order_shipping_address`)
    REFERENCES `online_shop`.`customer_shipping_address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `price` INT NOT NULL,
  `stock_count` INT NULL DEFAULT '0',
  `category_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_product_category_id`
    FOREIGN KEY (`id`)
    REFERENCES `online_shop`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`order_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`order_details` (
  `customer_order_id` INT UNSIGNED NOT NULL,
  `product_id` INT NOT NULL,
  `product_count` INT NOT NULL,
  `total_product_price` DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (`customer_order_id`, `product_id`),
  INDEX `fk_order_id_idx` (`customer_order_id` ASC) VISIBLE,
  INDEX `fk_product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_id`
    FOREIGN KEY (`customer_order_id`)
    REFERENCES `online_shop`.`customer_order` (`customer_order_id`),
  CONSTRAINT `fk_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `online_shop`.`product` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `online_shop`.`order_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_shop`.`order_payment` (
  `id` INT NOT NULL,
  `customer_order_id` INT UNSIGNED NOT NULL,
  `amount_paid` INT NOT NULL,
  `payment_date` DATETIME NULL DEFAULT NULL,
  `payment_description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_payment_order_id`
    FOREIGN KEY (`customer_order_id`)
    REFERENCES `online_shop`.`customer_order` (`customer_order_id`))
ENGINE = InnoDB;

