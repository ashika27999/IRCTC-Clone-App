const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const trainRoutes = require('./routes/train');
const authRoutes = require('./routes/auth');

const PORT = 4000;
const app = express();

mongoose.connect('mongodb+srv://testUser:test1234@irctc-clone-cluster-zvxkt.mongodb.net/irctc-clone?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/trains', trainRoutes);
app.use('/', authRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log('Server up an running at port: ', PORT);
});