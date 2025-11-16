# If first arg is "--no-clean", skip cleanup
if ($args.Count -eq 0 -or $args[0] -ne "--no-clean") {
    docker-compose down -v
}

# Build and start database
docker-compose up -d --build db

# Wait for initialization
Start-Sleep -Seconds 15

# Build and start app
docker-compose up --build app