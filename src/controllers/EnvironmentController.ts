function checkEnvironmentVariables() {
    const databaseURL = process.env.DATABASE_URL
    const port = process.env.PORT

    console.log(`Conecting to the database with the url: ${databaseURL}`)
    
    return { databaseURL, port }
}

export { checkEnvironmentVariables }