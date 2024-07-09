# Usa una imagen base de Python
FROM python:3.12.4-slim-bookworm
ENV PYTHONBUFFERED=1

WORKDIR /code

# Actualiza los paquetes del sistema e instala las dependencias necesarias
RUN apt-get update -y 

RUN apt-get install -y git

COPY requirements.txt .

RUN python -m venv .venv
RUN . /code/.venv/bin/activate 

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

COPY app .
COPY mlReview .
COPY models .

RUN python manage.py migrate

EXPOSE 8000

CMD ["gunicorn", "-c", "conf/gunicorn_config.py", "userService"]