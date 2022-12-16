const { faker } = require("@faker-js/faker");
const moment = require("moment");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const driver_roles = ["General", "VIP", "Chauffeur"];
const operator_roles = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Expert Level",
];
const insurance_brands = [
  "Direct Line",
  "Prudential",
  "AXA",
  "Churchill, and LV",
];
const vehicle_status = [
  "roadworthy",
  "in_for_service",
  "awaiting_repair",
  "written_off",
];
const gender = ["Male", "Female", "Others", "Not Specified"];
const shifts = [
  {
    type: "first",
    working_hours: {
      start: 0,
      end: 7,
    },
  },
  {
    type: "second",
    working_hours: {
      start: 8,
      end: 15,
    },
  },
  {
    type: "third",
    working_hours: {
      start: 16,
      end: 23,
    },
  },
];

const client_types = ["Private", "Corporate"];
const occurance = ["daily", "weekly", "monthly"];
const payment_status = [
  "pending",
  "in-progress",
  "completed",
  "unfullfilled",
  "cancelled",
];
function genDriver(componensation = "percentage") {
  const full_name = faker.name.firstName() + " " + faker.name.lastName();

  const temp = {
    full_name: full_name,
    gender: gender[getRandomInt(0, 3)],
    date_of_birth: faker.date.birthdate({ min: 25, max: 50, mode: "age" }),
    driver_code: faker.random.alphaNumeric(5, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    email: faker.internet.exampleEmail(full_name),
    phone_number: faker.phone.number("+44 #########"),
    driving_license: faker.random.alphaNumeric(16, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    ni_number: faker.random.alphaNumeric(9, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    address: {
      street: faker.address.buildingNumber() + "," + faker.address.street(),
      city: "London",
      pincode: faker.random.alphaNumeric(5, {
        casing: "upper",
        bannedChars: ["A"],
      }),
    },
    shift: shifts[getRandomInt(0, 2)],
    bank_account: {
      sort_code: faker.random.numeric(6),
      account_number: faker.random.numeric(8),
    },
    componensation:
      componensation === "percentage"
        ? {
            type: "percentage",
            occurance: "monthly",
            percentage: 60.0,
            currency: "GBP",
          }
        : {
            type: "fixed",
            occurance: "monthly",
            amount: 1000.0,
            currency: "GBP",
          },
    experience: [
      {
        company_name: "Noobs- A Taxi Company",
        start_date: faker.date.betweens(
          "2021-01-01T00:00:00.000Z",
          "2022-01-01T00:00:00.000Z",
          1
        )[0],
        end_date: null,
        role: "General",
        blackmarks: null,
        ratings: getRandomInt(3, 5),
      },
      {
        company_name: faker.company.name(),
        start_date: faker.date.betweens(
          "2020-01-01T00:00:00.000Z",
          "2022-01-01T00:00:00.000Z",
          1
        )[0],
        end_date: faker.date.betweens(
          "2020-01-01T00:00:00.000Z",
          "2021-01-01T00:00:00.000Z",
          1
        )[0],
        role: driver_roles[getRandomInt(0, 2)],
        blackmarks: null,
        ratings: getRandomInt(3, 5),
      },
    ],
  };

  return temp;
}

function genVehicle() {
  let reg_date = faker.date.betweens(
    "2015-01-01T00:00:00.000Z",
    "2018-01-01T00:00:00.000Z",
    1
  )[0];
  const temp = {
    registration_number: faker.vehicle.vrm(),
    registration_date: reg_date,
    identification_number: faker.vehicle.vin(),
    manufacturer: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    fuel: faker.vehicle.fuel(),
    latest_mot: faker.date.betweens(
      "2015-01-01T00:00:00.000Z",
      "2022-01-01T00:00:00.000Z",
      1
    )[0],
    insurance: {
      insurer: insurance_brands[getRandomInt(0, 3)],
      expire_on: faker.date.betweens(
        "2023-01-01T00:00:00.000Z",
        "2025-01-01T00:00:00.000Z",
        1
      )[0],
      remarks: "NA",
    },
    owners: [
      {
        full_name: faker.name.firstName() + " " + faker.name.lastName(),
        address: {
          street: faker.address.buildingNumber() + "," + faker.address.street(),
          city: "London",
          pincode: faker.random.alphaNumeric(5, {
            casing: "upper",
            bannedChars: ["A"],
          }),
        },
        start_date: reg_date,
        end_date: faker.date.betweens(
          "2018-01-02T00:00:00.000Z",
          "2020-01-01T00:00:00.000Z",
          1
        )[0],
      },
    ],
    allowed_passengers: getRandomInt(3, 4),
    status: "roadworthy",
  };
  return temp;
}

function genOperator() {
  const full_name = faker.name.firstName() + " " + faker.name.lastName();

  const temp = {
    full_name: full_name,
    gender: gender[getRandomInt(0, 3)],
    date_of_birth: faker.date.birthdate({ min: 25, max: 50, mode: "age" }),
    email: faker.internet.exampleEmail(full_name),
    phone_number: faker.phone.number("+44 #########"),
    operator_code: faker.random.alphaNumeric(5, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    address: {
      street: faker.address.buildingNumber() + "," + faker.address.street(),
      city: "London",
      pincode: faker.random.alphaNumeric(5, {
        casing: "upper",
        bannedChars: ["A"],
      }),
    },
    ni_number: faker.random.alphaNumeric(9, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    shift: shifts[getRandomInt(0, 2)],
    bank_account: {
      sort_code: faker.random.numeric(6),
      account_number: faker.random.numeric(8),
    },
    componensation: {
      type: "fixed",
      occurance: "monthly",
      amount: 1000.0,
      currency: "GBP",
    },
    experience: [
      {
        company_name: "Noobs- A Taxi Company",
        start_date: faker.date.betweens(
          "2021-01-01T00:00:00.000Z",
          "2022-01-01T00:00:00.000Z",
          1
        )[0],
        end_date: null,
        role: operator_roles[getRandomInt(0, 3)],
        blackmarks: null,
        ratings: getRandomInt(3, 5),
      },
      {
        company_name: faker.company.name(),
        start_date: faker.date.betweens(
          "2020-01-01T00:00:00.000Z",
          "2022-01-01T00:00:00.000Z",
          1
        )[0],
        end_date: faker.date.betweens(
          "2020-01-01T00:00:00.000Z",
          "2021-01-01T00:00:00.000Z",
          1
        )[0],
        role: operator_roles[getRandomInt(0, 1)],
        blackmarks: null,
        ratings: getRandomInt(3, 5),
      },
    ],
  };

  return temp;
}

function genClient() {
  const full_name = faker.name.firstName() + " " + faker.name.lastName();
  let client_type = client_types[getRandomInt(0, 1)];

  const temp = {
    full_name: full_name,
    gender: gender[getRandomInt(0, 3)],
    age: getRandomInt(19, 49),
    email: faker.internet.exampleEmail(full_name),
    phone_number: faker.phone.number("+44 #########"),
    client_type: client_type,
    regular_bookings:
      client_type === "Corporate"
        ? {
            occurance: occurance[getRandomInt(0, 2)],
            frequency: getRandomInt(1, 5),
            end_date: moment().add(7, "days").format(),
          }
        : null,
    bank_account:
      client_type === "Corporate"
        ? {
            sort_code: faker.random.numeric(6),
            account_number: faker.random.numeric(8),
          }
        : null,
    discount: client_type === "Corporate" ? 10 : 0,
  };

  return temp;
}

function genPayment(booking, payment_type = "payment") {
  let temp = {
    client_id: booking.client_id.toString(),
    booking_id: booking._id.toString(),
    cash_machine_id: faker.random.alphaNumeric(10, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    collected_by: booking.driver_code,
    transaction_reference: faker.random.alphaNumeric(16, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    card: faker.random.numeric(4) + "XXXXXXXX" + faker.random.numeric(4),
    paid_amount: booking.total_amount,
    type_of_transaction: payment_type,
    status: booking.status,
    refund: null,
    payment_date: booking.booking_date,
  };
  return temp;
}

function genBooking(
  client,
  vehicle,
  operator,
  current_date = moment().format()
) {
  let temp = {
    waiting_time_charge: {
      amount: getRandomInt(5, 10),
      currency: "GBP",
    },
    tax_fees: {
      amount: getRandomInt(5, 10),
      currency: "GBP",
    },
    service_fees: {
      amount: getRandomInt(50, 100),
      currency: "GBP",
    },
  };
  const book = {
    client_id: client._id.toString(),
    vehicle_id: vehicle._id.toString(),
    driver_id: vehicle.driver_id.toString(),
    operator: operator._id.toString(),
    pickup_location: {
      building_number: getRandomInt(1, 10),
      street: faker.address.street(),
      city: "London",
      pincode: faker.random.alphaNumeric(5, {
        casing: "upper",
        bannedChars: ["A"],
      }),
    },
    drop_location: {
      building_number: getRandomInt(1, 10),
      street: faker.address.street(),
      city: "London",
      pincode: faker.random.alphaNumeric(5, {
        casing: "upper",
        bannedChars: ["A"],
      }),
    },
    no_of_passengers: getRandomInt(2, 3),
    status: payment_status[getRandomInt(0, 4)],
    remarks: "NA",
    waiting_time_charge: temp.waiting_time_charge,
    tax_fees: temp.tax_fees,
    service_fees: temp.service_fees,
    total_amount: {
      amount:
        temp.service_fees.amount +
        temp.tax_fees.amount +
        temp.waiting_time_charge.amount,
      currency: temp.service_fees.currency,
    },
    trip_distance: getRandomInt(10, 20),
    waiting_time_in_minutes: getRandomInt(10, 20),
    total_trip_time_in_minutes: getRandomInt(30, 60),
    on_peak: getRandomInt(0, 1) === 1 ? true : false,
    is_regular_booking: client.client_type === "Corporate" ? true : false,
    booking_date: moment(current_date).hour(getRandomInt(0, 23)).format(),
    driver_rating: getRandomInt(1, 5),
    operator_rating: getRandomInt(1, 5),
  };
  return book;
}

function genCompensation(user, transaction_for, type, date) {
  let txn_amount = 0;
  if (type === "salary") txn_amount = getRandomInt(1000, 2000);
  else txn_amount = getRandomInt(100, 200);
  const temp = {
    driver_id:
      user && transaction_for === "driver" ? user._id.toString() : null,
    operator_id:
      user && transaction_for === "operator" ? user._id.toString() : null,
    type_of_transaction: type,
    transaction_reference: faker.random.alphaNumeric(16, {
      casing: "upper",
      bannedChars: ["A"],
    }),
    bank_account: user ? user.bank_account : null,
    status: payment_status[getRandomInt(0, 4)],
    payment_date: date,
    transaction_amount: {
      amount: txn_amount,
      currency: "GBP",
    },
  };
  return temp;
}

function genRevenue(date) {
  const temp = {
    total_revenue: {
      amount: getRandomInt(1000000, 2000000),
      currency: "GBP",
    },
    operating_cost: {
      amount: getRandomInt(200000, 250000),
      currency: "GBP",
    },
    drivers_compensation_cost: {
      amount: getRandomInt(300000, 350000),
      currency: "GBP",
    },
  };
  let net_profit =
    temp.total_revenue.amount -
    temp.operating_cost.amount -
    temp.drivers_compensation_cost.amount;
  const revenue = {
    total_revenue: temp.total_revenue,
    operating_cost: temp.operating_cost,
    drivers_compensation_cost: temp.drivers_compensation,
    net_profit: {
      amount: net_profit,
      currency: "GBP",
    },
    status: net_profit > 0 ? "profit" : "loss",
    date: date,
  };
  return revenue;
}
module.exports = {
  insurance_brands,
  driver_roles,
  vehicle_status,
  gender,
  operator_roles,
  getRandomInt,
  genVehicle,
  genDriver,
  genOperator,
  genClient,
  genBooking,
  genPayment,
  genCompensation,
  genRevenue,
};
