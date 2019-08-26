const getNewCar = () => {
  return {
    city: "Toronto",
    passengers: 0,
    gas: 100
  };
};

const addCar = (cars, newCar) => {
  cars.push(newCar);
  return "Adding new car to fleet. Fleet size is now " + cars.length + ".";
};

const pickUpPassenger = car => {
  car["passengers"] += 1;
  car["gas"] -= 10;
  return (
    "Picked up passenger. Car now has " + car["passengers"] + " passengers."
  );
};

const getDestination = car => {
  if (car["city"] == "Toronto") {
    return "Mississauga";
  } else if (car["city"] == "Mississauga") {
    return "London";
  } else if (car["city"] == "London") {
    return "Toronto";
  }
};

const getGasDisplay = gasAmount => {
  return gasAmount + "%";
};

const fillUpGas = car => {
  const oldGas = car["gas"];
  car["gas"] = 100;
  return (
    "Filled up to " +
    getGasDisplay(car["gas"]) +
    " on gas from " +
    getGasDisplay(oldGas) +
    "."
  );
};

const drive = (car, cityDistance) => {
  if (car["gas"] < cityDistance) {
    return fillUpGas(car);
  }
  car["city"] = getDestination(car);
  car["gas"] -= cityDistance;
  return (
    "Drove to " +
    car["city"] +
    ". Remaining gas: " +
    getGasDisplay(car["gas"]) +
    ". "
  );
};

const dropOffPassengers = car => {
  const previousPassengers = car["passengers"];
  car["passengers"] = 0;
  return "Dropped off " + previousPassengers + " passengers.";
};

const act = car => {
  const distanceBetweenCities = 50;

  if (car["gas"] < 20) {
    return fillUpGas(car);
  } else if (car["passengers"] < 3) {
    return pickUpPassenger(car);
  } else {
    if (car["gas"] < distanceBetweenCities) {
      return fillUpGas(car);
    }
    const droveTo = drive(car, distanceBetweenCities);
    const passengersDropped = dropOffPassengers(car);
    return droveTo + passengersDropped;
  }
};

const commandFleet = cars => {
  i = 1;
  for (let car of cars) {
    const action = act(car);
    console.log("Car " + i + ": " + action);
    i += 1;
  }
  console.log("---");
};

const addOneCarPerDay = (cars, numDays) => {
  for (let day = 0; day < numDays; day++) {
    const newCar = getNewCar();
    console.log(addCar(cars, newCar));
    commandFleet(cars);
  }
};

const cars = [];
addOneCarPerDay(cars, 10);
