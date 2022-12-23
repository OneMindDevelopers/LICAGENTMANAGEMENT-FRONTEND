import * as catagorysAPI from "../services/fakeCatagoryService";

const gallaries = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Cycle1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cycle" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Cycle2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cycle" },
    numberInStock: 5,
    dailyRentalRate: 2.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Bike3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bike" },
    numberInStock: 8,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Car1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471814", name: "Car" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Car2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471814", name: "Car" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Car3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471814", name: "Car" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Bike1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bike" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Bike2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bike" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Cycle3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cycle" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },

  {
    _id: "5b21ca3eeb7f6fbccd471811",
    title: "Pen1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471822", name: "Pen" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471812",
    title: "Pen2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471822", name: "Pen" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471813",
    title: "Pen3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471822", name: "Pen" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },


  {
    _id: "5b21ca3eeb7f6fbccd471814",
    title: "Book1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471823", name: "Book" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Book2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471823", name: "Book" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Book3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471823", name: "Book" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },

  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Pencil1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471824", name: "Pencil" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    title: "Pencil2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471824", name: "Pencil" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Pencil3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471824", name: "Pencil" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },


  {
    _id: "5b21ca3eeb7f6fbccd471820",
    title: "TShirt1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471825", name: "TShirt" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "TShirt2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471825", name: "TShirt" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471823",
    title: "TShirt3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471825", name: "TShirt" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },

  {
    _id: "5b21ca3eeb7f6fbccd471824",
    title: "Shirt1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471826", name: "Shirt" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471825",
    title: "Shirt2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471826", name: "Shirt" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471826",
    title: "Shirt3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471826", name: "Shirt" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },

  {
    _id: "5b21ca3eeb7f6fbccd471827",
    title: "FormalShirt1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471827", name: "FormalShirt" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471828",
    title: "FormalShirt2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471827", name: "FormalShirt" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471829",
    title: "FormalShirt3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471827", name: "FormalShirt" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },

  {
    _id: "5b21ca3eeb7f6fbccd471830",
    title: "Jeans1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471828", name: "Jeans" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471831",
    title: "Jean2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471828", name: "Jeans" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471832",
    title: "Jean3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471828", name: "Jeans" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },

  {
    _id: "5b21ca3eeb7f6fbccd471833",
    title: "FormalPant1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471829", name: "FormalPant" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471834",
    title: "FormalPant2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471829", name: "FormalPant" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471835",
    title: "FormalPant3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471829", name: "FormalPant" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },

  {
    _id: "5b21ca3eeb7f6fbccd471836",
    title: "CasualPant1",
    catagory: { _id: "5b21ca3eeb7f6fbccd471830", name: "CasualPant" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471837",
    title: "CasualPant2",
    catagory: { _id: "5b21ca3eeb7f6fbccd471830", name: "CasualPant" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471838",
    title: "CasualPant3",
    catagory: { _id: "5b21ca3eeb7f6fbccd471830", name: "CasualPant" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  }
];

export function getGallaries() {
  return gallaries;
}

export function getMovie(id) {
  return gallaries.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = gallaries.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.catagory = catagorysAPI.catagories.find(g => g._id === movie.catagoryId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    gallaries.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = gallaries.find(m => m._id === id);
  gallaries.splice(gallaries.indexOf(movieInDb), 1);
  return movieInDb;
}
