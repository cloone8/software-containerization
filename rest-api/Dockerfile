FROM python:3.7-alpine

MAINTAINER Fiachra O Cochlain "focochlain@gmail.com"

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY ./

COPY ./src /app/src

EXPOSE 5000

CMD ["flask", "run"]
