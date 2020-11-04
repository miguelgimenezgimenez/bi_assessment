const loggingService = console // this could be a service where we could do monitoring of the logs


const logger = () => {
  if (process.env.NODE_ENV === 'test') {
    return { log: () => { } }
  }
  if (process.env.NODE_ENV === 'development') {
    return console
  } else {
    return loggingService
  }
}


module.exports = logger()
