git pull
docker-compose up --build -d
# - docker build -t lucis_lunchpad_ci:$CI_COMMIT_SHORT_SHA -f ./deploy/Dockerfile .
# - docker run --name lucis_lunchpad_ci --network lucis_network --restart unless-stopped -p 3001:3001 -d lucis_lunchpad_ci:$CI_COMMIT_SHORT_SHA