import runServer from './runServer'

const serve = async () => {
  try {
    const server = await runServer()
    process.on('SIGTERM', () => server.close())
    process.on('SIGINT', () => server.close())
  } catch (err) {
    console.error(err)
    process.exit()
  }
}

serve()
