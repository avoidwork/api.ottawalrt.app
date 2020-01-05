# api.ottawalrt.app
API for OttawaLRT

### Docker
Login to docker, & pull latest image: `avoidwork/ottawalrt-api:latest`

#### Environment Variables

```
OLRT_API_KEY str
OLRT_APP_ID str
OLRT_CORS_ORIGINS str (optional: comma delimited hosts, *, or "" for no CORS)
OLRT_SECURITY_SECRET str
OLRT_SEED int (optional: 233)
OLRT_SESSION_REDIS_HOST str
OLRT_SESSION_REDIS_PORT int (optional: 6379)
OLRT_SESSION_SECRET str
```

#### Running Container
`docker run --name=olrt --e OLRT_API_KEY=CHANGEME --e OLRT_APP_ID=CHANGEME --e OLRT_SECURITY_SECRET=CHANGEME -e OLRT_SESSION_REDIS_HOST=CHANGEME -e OLRT_SESSION_SECRET=CHANGEME -p 8050:8050 -d --cpus=1 --memory-reservation=128m --memory=256m --restart unless-stopped avoidwork/ottawalrt-api:latest`

### API Routes

#### / (GET)
Returns `["api"]`

#### /api (GET)
Returns `["alerts", "status", "stops"]`

#### /api/alerts (GET)
Returns array of alerts from OC Transportation

#### /api/status (GET)
Returns string describing LRT status

#### /api/stops (GET)
Returns array of LRT stops from OC Transportation
