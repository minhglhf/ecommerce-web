const express = require('express');
const env = require('dotenv');

const mongoose = require('mongoose');
const app = express();
const path = require('path')
const cors = require('cors')

env.config();

const authRoutes = require('./routes/auth')
const authAdminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

const dataRoutes = require('./routes/data');

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

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public/', express.static(path.join(__dirname, 'uploads')))
app.use('/api', authRoutes);
app.use('/api', authAdminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', dataRoutes);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})