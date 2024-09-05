gcloud config set project PROJECT && \
gcloud builds submit --tag gcr.io/PROJECT/PROJECT-development &&
gcloud run deploy PROJECT-development --image gcr.io/starsac/PROJECT-development --platform managed --region us-east1 --allow-unauthenticated
