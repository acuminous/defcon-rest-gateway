Sample request
```bash
curl -i -X POST localhost:8080/plugin/rest-gateway/api/v1/event -H "Content-Type: application/json" -d "{\"group\": \"repocop\", \"system\": \"repocop\", \"type\": \"release\", \"environment\": \"Integration\", \"message\": \"Released to integration\", \"severity\": \"5\", \"link\": \"${BUILD_URL}\" }"
```