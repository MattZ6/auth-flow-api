import app from '@main/config/app';

function printError(message: string) {
  console.log('\x1b[31m%s\x1b[0m', message);
}

async function initializeServer() {
  console.log('⏳ Starting server...');

  try {
    app.listen(process.env.API_PORT, () => {
      console.log(
        `🚀 Server is running at ${process.env.API_HOST}:${process.env.API_PORT}\n`
      );
    });
  } catch (error) {
    printError('-----------------------------------------');
    printError('----- Server initialization failure -----');
    printError('-----------------------------------------');

    console.log('\n');

    console.log(JSON.stringify(error, null, 2));
  }
}

initializeServer();
