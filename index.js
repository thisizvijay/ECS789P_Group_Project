const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const moment = require("moment");

const { Drivers } = require("./collections/drivers");
const { Vehicles } = require("./collections/vehicles");
const { Operators } = require("./collections/operators");
const { ShiftHistory } = require("./collections/shift_history");
const { Clients } = require("./collections/clients");
const { Bookings } = require("./collections/bookings");
const { Payments } = require("./collections/payments");
const { Compensation } = require("./collections/compensation");
const { Revenue } = require("./collections/revenue");

const {
  insurance_brands,
  vehicle_status,
  driver_roles,
  genDriver,
  genVehicle,
  genOperator,
  genClient,
  genBooking,
  genPayment,
  genCompensation,
  genRevenue,
} = require("./utils");

const createDrivers = async () => {
  let temp = [];
  for (let index = 0; index < 10; index++) {
    if (index < 8) temp.push(genDriver());
    else temp.push(genDriver("fixed"));
  }
  const drivers = await Drivers.create(temp);
  return drivers;
};
const createVehicles = async () => {
  const drivers = await createDrivers();
  let temp = [];
  if (Array.isArray(drivers)) {
    for (let index = 0; index < drivers.length + 3; index++) {
      const vehicle = genVehicle();
      if (index < drivers.length && drivers[index]) {
        const driver = drivers[index];
        vehicle["driver_id"] = driver._id.toString();
        vehicle["owners"] = vehicle["owners"].push({
          full_name: driver.full_name,
          address: driver.address,
          start_date: faker.date.betweens(
            "2020-01-03T00:00:00.000Z",
            "2021-01-01T00:00:00.000Z",
            1
          )[0],
          end_date: null,
        });
        temp.push(vehicle);
      } else if (drivers[0]) {
        vehicle["driver_id"] = drivers[0]._id
          ? drivers[0]._id.toString()
          : null;
        vehicle["owners"] = vehicle["owners"].push({
          full_name: drivers[0].full_name,
          address: drivers[0].address,
          start_date: faker.date.betweens(
            "2020-01-03T00:00:00.000Z",
            "2021-01-01T00:00:00.000Z",
            1
          )[0],
          end_date: null,
        });
        vehicle["status"] = vehicle_status[index % drivers.length];
      }
    }
  }
  const vehicles = await Vehicles.create(temp);
  return vehicles;
};

const createOperators = async () => {
  let temp = [];
  for (let index = 0; index < 8; index++) {
    temp.push(genOperator());
  }
  const operators = await Operators.create(temp);
  return operators;
};

const createShiftHistory = async () => {
  const drivers = await Drivers.find();
  let dates = [
    moment().subtract(2, "days").format(),
    moment().subtract(1, "days").format(),
    moment().format(),
  ];
  let temp = [];
  for (temp_date of dates) {
    for (let index = 0; index < drivers.length; index++) {
      let driver = drivers[index];
      if (driver.shift) {
        let shift_start_time = moment(temp_date)
          .hour(driver.shift["working_hours"].start)
          .minute(0)
          .second(0)
          .format();
        let shift_end_time = moment(temp_date)
          .hour(driver.shift["working_hours"].end)
          .minute(0)
          .second(0)
          .format();
        temp.push({
          role: "driver",
          driver_id: driver._id.toString(),
          shift: driver.shift,
          shift_start_time: shift_start_time,
          shift_end_time: shift_end_time,
        });
      }
    }

    const operators = await Operators.find();
    for (let index = 0; index < operators.length; index++) {
      let operator = operators[index];
      if (operator.shift) {
        let shift_start_time = moment(temp_date)
          .hour(operator.shift["working_hours"].start)
          .minute(0)
          .second(0)
          .format();
        let shift_end_time = moment(temp_date)
          .hour(operator.shift["working_hours"].end)
          .minute(0)
          .second(0)
          .format();
        temp.push({
          role: "operator",
          operator_id: operator._id.toString(),
          shift: operator.shift,
          shift_start_time: shift_start_time,
          shift_end_time: shift_end_time,
        });
      }
    }
  }
  if (temp.length > 0) await ShiftHistory.create(temp);
};

const createClients = async () => {
  let temp = [];
  for (let index = 0; index < 20; index++) {
    temp.push(genClient());
  }
  const clients = await Clients.create(temp);
};

const createBooking = async () => {
  const vehicles = await Vehicles.find({ status: "roadworthy" });
  const operators = await Operators.find();
  const clients = await Clients.find();
  console.log(vehicles.length, "vehciles length");
  let temp = [];
  let dates = [
    moment().subtract(1, "month").format(),
    moment().subtract(1, "week").format(),
    moment().format(),
  ];
  for (const current_date of dates) {
    for (let index = 0; index < 50; index++) {
      let sub_index = index % 10;
      if (
        sub_index < vehicles.length &&
        sub_index < operators.length &&
        sub_index < clients.length
      ) {
        temp.push(
          genBooking(
            clients[sub_index],
            vehicles[sub_index],
            operators[sub_index],
            current_date
          )
        );
      }
    }
  }

  const bookings = await Bookings.create(temp);
  let temp_payments = [];
  for (let index = 0; index < bookings.length; index++) {
    if (
      bookings[index].status != "cancelled" &&
      bookings[index].status != "unfullilled"
    ) {
      temp_payments.push(genPayment(bookings[index]));
    }
  }
  const payments = await Payments.create(temp_payments);
};

const createCompensation = async () => {
  const drivers = await Drivers.find();
  const operators = await Operators.find();
  let temp = [];
  for (let index = 0; index < 12; index++) {
    let payment_date = moment()
      .subtract(index, "month")
      .startOf("month")
      .format();
    for (let sub_index = 0; sub_index < drivers.length; sub_index++) {
      temp.push(
        genCompensation(drivers[sub_index], "driver", "salary", payment_date)
      );
    }
    for (let sub_index = 0; sub_index < drivers.length; sub_index++) {
      temp.push(
        genCompensation(
          drivers[sub_index],
          "driver",
          "maintainance",
          payment_date
        )
      );
    }
    for (let sub_index = 0; sub_index < operators.length; sub_index++) {
      temp.push(
        genCompensation(
          operators[sub_index],
          "operator",
          "salary",
          payment_date
        )
      );
    }
    for (let sub_index = 0; sub_index < operators.length; sub_index++) {
      temp.push(
        genCompensation(
          operators[sub_index],
          "operator",
          "maintainance",
          payment_date
        )
      );
    }
  }
  const comp = await Compensation.create(temp);
  return comp;
};

const createRevenue = async () => {
  let temp = [];
  for (let index = 0; index < 12; index++) {
    let date = moment().subtract(index, "month").endOf("month").format();
    temp.push(genRevenue(date));
  }
  const revenue = await Revenue.create(temp);
  return revenue;
};
const initProcess = async () => {
  console.log(
    "Initializing the process........It will few to minutes to process"
  );
  const vehicles = await createVehicles();
  const operators = await createOperators();
  const history = await createShiftHistory();
  const clients = await createClients();
  const bookings = await createBooking();
  const comp = await createCompensation();
  const revenue = await createRevenue();
  console.log("Finished process........");
  // console.log(operators, "operators");
  // console.log(vehicles, "vehicles");
};

const url = `mongodb+srv://taxi:LP1jSgxQjQXP3xYi@cluster0.k9bvbd7.mongodb.net/`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(async () => {
    console.log("Connected to the database ");
    await initProcess();
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
