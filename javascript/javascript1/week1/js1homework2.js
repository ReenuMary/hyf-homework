//Excercise 3

function HousePrice(houseDimension, gardenSize, actualPricePaid, userName) {
  this.houseDimension = houseDimension;
  this.gardenSize = gardenSize;
  this.actualPricePaid = actualPricePaid;
  this.userName = userName;

  this.houseVolume = function () {
    return houseDimension[0] * houseDimension[1] * houseDimension[2];
  };

  this.housePrice = function () {
    return this.houseVolume() * 2.5 * 1000 + this.gardenSize * 300;
  };

  this.analysePrice = function () {
    const differenceInPrice = this.actualPricePaid - this.housePrice();
    if (differenceInPrice > 0) {
      console.log(
        `${
          this.userName
        } paid ${differenceInPrice} more than the calculated price which is ${this.housePrice()}`
      );
    } else if (differenceInPrice === 0) {
      console.log(
        `${this.userName} paid the same price as the calculated price`
      );
    } else {
      console.log(
        `${this.userName} paid ${
          differenceInPrice * -1
        } less than the calculated price  which is ${this.housePrice()}`
      );
    }
  };
}

const housePricePeter = new HousePrice([8, 10, 10], 100, 2500000, "Peter");
housePricePeter.analysePrice();
const housePriceJulia = new HousePrice([5, 11, 8], 70, 1000000, "Julia");
housePriceJulia.analysePrice();
