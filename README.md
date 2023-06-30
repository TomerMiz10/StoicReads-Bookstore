# Online Store Web Application - README

This is the README file for the final project in the web application development course. The project is an online store implemented using JavaScript, Node.js, Express, and MongoDB. The system follows the MVC (Model-View-Controller) architecture, providing a clear separation between the View, Controller, and Model components.

## Requirements

1. **System Infrastructure**: The server-side of the application will be based on JS.Node using the Express framework.
2. **Data Storage**: Storing and retrieving data will be done using MongoDB.
3. **MVC Design**: The system will be designed and implemented using the MVC pattern.
4. **Support for Multiple Models**: The system must support at least three different models, such as products, customers, and suppliers.
5. **Shopping Cart and Orders**: The system must contain a shopping cart that allows users to place orders. Each user should be able to view their order history, which includes the list of items and prices.
6. **Manager Interface**: The store manager should have access to a manager interface to view and manage all customer orders, including order details and products.
7. **Populating the Store**: Sufficient information must be entered into the store before deployment to resemble an actual store. This includes entering products and making test orders.
8. **Error Handling and Validations**: The system must handle edge cases, errors, and validations on both the server and client sides. It should avoid server crashes and handle unexpected user behavior.
9. **JQuery Integration**: The system's views should extensively utilize the capabilities of the JQuery library, including the use of Ajax calls to the server. The implementation of client-side code should consider using JQuery.
10. **Statistical Data**: The system should display statistical data using at least two graphs. The data should be retrieved from the database and dynamically updated based on the available information.
11. **Web Service Integration**: The system should integrate at least one web service. The integration should involve sending and receiving data from the service and displaying the retrieved data on the website. Writing custom code for accessing and handling the service is required.
12. **Google Maps/Bing Maps Integration**: The system should display a map, based on either Google Maps or Bing Maps, on one of the pages. The map should mark addresses read from the database, such as a list of store branches.
13. **Social Media API Integration**: The system should interface with either the Twitter API or the Facebook API. It should allow for receiving and transmitting data accordingly, such as user login. Basic functionalities like sharing/liking buttons or iframes are not considered sufficient. Custom code should be written to interact with the API.

## Instructions for Running the Application

1. Clone the repository to your local machine.
2. Install Node.js and MongoDB if not already installed.
3. Run `npm install` to install the project dependencies.
4. Configure the database connection in the `config.js` file.
5. Populate the database with sample data for testing purposes.
6. Start the server by running `npm start`.
7. Access the web application through the provided URL.
8. Explore the different features and functionalities of the online store.

