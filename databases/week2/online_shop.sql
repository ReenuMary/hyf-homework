-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`, `email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(500) NULL,
  `price` INT NOT NULL,
  `stock_count` INT NULL DEFAULT 0,
  `category_id` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_category_id`
    FOREIGN KEY (`id`)
    REFERENCES `mydb`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_count` INT NOT NULL,
  `total_product_price` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order_payment` (
  `id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `amount_paid` INT NOT NULL,
  `payment_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_payment_order_id_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_payment_order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `mydb`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order_status` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`shipping_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`shipping_address` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NOT NULL,
  `house_no` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `postcode` VARCHAR(45) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customer_shipping_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer_shipping_address` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `shipping_address_id` INT UNSIGNED NOT NULL,
  INDEX `fk_customer_shipping_address_customer_id_idx` (`customer_id` ASC) VISIBLE,
  INDEX `fk_customer_shipping_address_shipping_address_id_idx` (`shipping_address_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_customer_shipping_address_customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `mydb`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_shipping_address_shipping_address_id`
    FOREIGN KEY (`shipping_address_id`)
    REFERENCES `mydb`.`shipping_address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customer_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer_order` (
  `customer_id` INT UNSIGNED NOT NULL,
  `order_id` INT NOT NULL,
  `order_date` DATETIME NOT NULL,
  `order_status` INT UNSIGNED NULL,
  `order_shipping_address` INT UNSIGNED NULL,
  INDEX `fk_customer_order_customer_id_idx` (`customer_id` ASC) VISIBLE,
  INDEX `fk_customer_order_order_id_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_customer_order_order_status_idx` (`order_status` ASC) VISIBLE,
  INDEX `fk_customer_order_shipping_address_idx` (`order_shipping_address` ASC) VISIBLE,
  CONSTRAINT `fk_customer_order_customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `mydb`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_order_order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `mydb`.`order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_order_order_status`
    FOREIGN KEY (`order_status`)
    REFERENCES `mydb`.`order_status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_order_shipping_address`
    FOREIGN KEY (`order_shipping_address`)
    REFERENCES `mydb`.`customer_shipping_address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


