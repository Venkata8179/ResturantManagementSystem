const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// configure middleware
app.use(bodyParser.urlencoded({ extended: false }));

// create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@root',
  database: 'Restaurant'
});
app.use(express.static(__dirname));
// connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

app.get('/', (req, res) => {
      res.send('Hello');
  });

// CREATE - add a new customer to the database
app.post('/customers', (req, res) => {
  const { name, phone_number, email } = req.body;
  const sql = 'INSERT INTO Customers (name, phone_number, email) VALUES (?, ?, ?)';
  connection.query(sql, [name, phone_number, email], (err, result) => {
    if (err) throw err;
    res.send('Customer added successfully!');
  });
});

// READ - get list of all customers in the database
app.get('/customers', (req, res) => {
  const sql = 'SELECT * FROM Customers';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// UPDATE - update an existing customer in the database
app.put('/customers/:id', (req, res) => {
  const { name, phone_number, email } = req.body;
  const sql = 'UPDATE Customers SET name = ?, phone_number = ?, email = ? WHERE customer_id = ?';
  connection.query(sql, [name, phone_number, email, req.params.id], (err, result) => {
    if (err) throw err;
    res.send('Customer updated successfully!');
  });
});

// REPLACE - replace an existing customer in the database
app.patch('/customers/:id', (req, res) => {
  const { name, phone_number, email } = req.body;
  const sql = 'REPLACE INTO Customers (customer_id, name, phone_number, email) VALUES (?, ?, ?, ?)';
  connection.query(sql, [req.params.id, name, phone_number, email], (err, result) => {
    if (err) throw err;
    res.send('Customer replaced successfully!');
  });
});

// DELETE - delete an existing customer from the database
app.delete('/customers/:id', (req, res) => {
  const sql = 'DELETE FROM Customers WHERE customer_id = ?';
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send('Customer deleted successfully!');
  });
});

// CREATE - add a new menu item to the database
app.post('/menuitems', (req, res) => {
    const { item_name, description, price } = req.body;
    const sql = 'INSERT INTO MenuItems (item_name, description, price) VALUES (?, ?, ?)';
    connection.query(sql, [item_name, description, price], (err, result) => {
      if (err) throw err;
      res.send('Menu item added successfully!');
    });
  });

  
  // READ - get list of all menu items from the database
  app.get('/menuitems', (req, res) => {
    const sql = 'SELECT * FROM MenuItems';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
      });
    });

  
  // UPDATE - update an existing menu item in the database
  app.put('/menuitems/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const { item_name, description, price } = req.body;
    const sql = 'UPDATE MenuItems SET item_name = ?, description = ?, price = ? WHERE item_id = ?';
    connection.query(sql, [item_name, description, price, itemId], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.send('Menu item updated successfully!');
    });
  });
  
  // REPLACE - replace an existing menu item in the database
  app.patch('/menuitems/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const { item_name, description, price } = req.body;
    const sql = 'UPDATE MenuItems SET item_name = ?, description = ?, price = ? WHERE item_id = ?';
    connection.query(sql, [item_name, description, price, itemId], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.send('Menu item replaced successfully!');
    });
  });
  
  // DELETE - delete an existing menu item from the database
  app.delete('/menuitems/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const sql = 'DELETE FROM MenuItems WHERE item_id = ?';
    connection.query(sql, [itemId], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.send('Menu item deleted successfully!');
    });
  });
// CREATE - Add a new order to the database
app.post('/orders', (req, res) => {
    const { customer_id, order_date, total_amount } = req.body;
    const sql = 'INSERT INTO Orders (customer_id, order_date, total_amount) VALUES (?, ?, ?)';
    connection.query(sql, [customer_id, order_date, total_amount], (err, result) => {
      if (err) throw err;
      res.send('Order created successfully!');
    });
  });
  
  // READ - Get list of all orders from the database
  app.get('/orders123', (req, res) => {
    const sql = 'SELECT * FROM Orders';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // UPDATE - Update an existing order in the database
  app.put('/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const { customer_id, order_date, total_amount } = req.body;
    const sql = 'UPDATE Orders SET customer_id = ?, order_date = ?, total_amount = ? WHERE order_id = ?';
    connection.query(sql, [customer_id, order_date, total_amount, orderId], (err, result) => {
      if (err) throw err;
      res.send('Order updated successfully!');
    });
  });
  
  // REPLACE - Replace an existing order in the database
  app.patch('/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const { customer_id, order_date, total_amount } = req.body;
    const sql = 'REPLACE INTO Orders (order_id, customer_id, order_date, total_amount) VALUES (?, ?, ?, ?)';
    connection.query(sql, [orderId, customer_id, order_date, total_amount], (err, result) => {
      if (err) throw err;
      res.send('Order replaced successfully!');
    });
  });
  
  // DELETE - Delete an existing order from the database
  app.delete('/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const sql = 'DELETE FROM Orders WHERE order_id = ?';
    connection.query(sql, [orderId], (err, result) => {
      if (err) throw err;
      res.send('Order deleted successfully!');
    });
  });


   // GET a  order items
app.get('/orderitems', (req, res) => {
    const orderId = req.params.id;
    connection.query('SELECT * FROM OrderItems', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (rows.length === 0) {
        res.status(404).send('Not Found');
      } else {
        res.send(rows);
      }
    });
  });


  // GET a specific order item
app.get('/orderitems/:id', (req, res) => {
    const orderId = req.params.id;
    connection.query('SELECT * FROM OrderItems WHERE order_item_id = ?', orderId, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (rows.length === 0) {
        res.status(404).send('Not Found');
      } else {
        res.send(rows[0]);
      }
    });
  });
  
  // POST a new order item
  app.post('/orderitems', (req, res) => {
    const { order_id, item_id, quantity } = req.body;
    connection.query('INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (?, ?, ?)', [order_id, item_id, quantity], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).send(`Order item created with ID: ${result.insertId}`);
      }
    });
  });
  
  // PUT (replace) an existing order item
  app.put('/orderitems/:id', (req, res) => {
    const orderId = req.params.id;
    const { order_id, item_id, quantity } = req.body;
    connection.query('UPDATE OrderItems SET order_id = ?, item_id = ?, quantity = ? WHERE order_item_id = ?', [order_id, item_id, quantity, orderId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.status(200).send(`Order item ${orderId} updated successfully`);
      }
    });
  });
  
  // DELETE an existing order item
  app.delete('/orderitems/:id', (req, res) => {
    const orderId = req.params.id;
    connection.query('DELETE FROM OrderItems WHERE order_item_id = ?', orderId, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.status(200).send(`Order item ${orderId} deleted successfully`);
      }
    });
  });
  
 
  // Route to get menu items with order items
app.get('/menuitems-with-orderitems', (req, res) => {
    const query = `
      SELECT MenuItems.item_id, MenuItems.item_name, MenuItems.description, MenuItems.price, OrderItems.quantity
      FROM MenuItems
      INNER JOIN OrderItems ON MenuItems.item_id = OrderItems.item_id
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(results);
      }
    });
  });
  
  // Route to get customers with orders
  app.get('/customers-with-orders', (req, res) => {
    const query = `
      SELECT Customers.customer_id, Customers.name AS customer_name, Customers.phone_number, Customers.email,
             Orders.order_id, Orders.order_date, Orders.total_amount
      FROM Customers
      INNER JOIN Orders ON Customers.customer_id = Orders.customer_id
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(results);
      }
    });
  });
  
  // Route to get orders with order items
  app.get('/orders-with-orderitems', (req, res) => {
    const query = `
      SELECT Orders.order_id, Orders.customer_id, Orders.order_date, Orders.total_amount,
             OrderItems.order_item_id, OrderItems.item_id, OrderItems.quantity
      FROM Orders
      INNER JOIN OrderItems ON Orders.order_id = OrderItems.order_id
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(results);
      }
    });
  });
  
  // Route to get orders with customers and order items
  app.get('/orders-with-customers-and-orderitems', (req, res) => {
    const query = `
      SELECT Orders.order_id, Customers.name AS customer_name, Orders.order_date, Orders.total_amount,
             OrderItems.order_item_id, MenuItems.item_name, OrderItems.quantity
      FROM Orders
      INNER JOIN Customers ON Orders.customer_id = Customers.customer_id
      INNER JOIN OrderItems ON Orders.order_id = OrderItems.order_id
      INNER JOIN MenuItems ON OrderItems.item_id = MenuItems.item_id
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(results);
      }
    });
  });


// start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});