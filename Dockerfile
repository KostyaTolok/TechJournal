FROM python:3.8

ENV PYTHONUNBUFFERED=1

RUN mkdir /api
WORKDIR /api

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8000

COPY . .