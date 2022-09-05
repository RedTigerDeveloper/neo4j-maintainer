FROM python:3.9-alpine
WORKDIR /app
COPY apidocs/ apidocs/
COPY server.py .
COPY gunicorn.sh .
COPY requirements.txt .
RUN pip3 install -r requirements.txt
RUN chmod +x gunicorn.sh
RUN mkdir queries/
EXPOSE 8080
ENTRYPOINT ["./gunicorn.sh"]

