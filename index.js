const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Connect to MongoDB.
//  */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// Init Middleware
app.use(express.json());

/**
 * Express configuration.
 */
app.set('host', process.env.NODEJS_SERVER_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.NODEJS_SERVER_IP || 8080);

/**
 * Start Express server.
 */
app.listen(app.get('port'), async () => {
  //Conecting to Database
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log(
      '%s MongoDB connection error. Please make sure MongoDB is running.',
      chalk.red('✗'),
    );
    process.exit(1);
  });
  console.log('%s Database Connected...', chalk.green('✓'));

  //Running server.
  console.log(
    '%s App is running at %s:%d in %s mode',
    chalk.green('✓'),
    app.get('host'),
    app.get('port'),
    app.get('env'),
  );
  console.log('  Press CTRL-C to stop\n');
});
