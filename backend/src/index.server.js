const express = require('express');
const env = require('dotenv');

const mongoose = require('mongoose');
const app = express();

env.config();

const authRoutes = require('./routes/auth')
const authAdminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

mongoose.connect(
    `mongodb+srv://${process.env.MONGGO_DB_USERNAME}:${process.env.MONGGO_DB_PASSWORD}@nodetuts.7eeft.mongodb.net/${process.env.MONGGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => {
        console.log("database connect")
    }).catch(() => {
        console.log("error connect")
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', authAdminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})