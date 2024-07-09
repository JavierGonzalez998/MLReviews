# Usa una imagen base de Python
FROM python:3.10.14-slim-bookworm

# Establece las variables de entorno
ENV PYTHONBUFFERED=1
ENV VIRTUAL_ENV=/code/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

WORKDIR /code

# Actualiza los paquetes del sistema e instala las dependencias necesarias
RUN apt-get update -y && apt-get install -y git

# Copia y instala las dependencias
COPY requirements.txt .
RUN python -m venv $VIRTUAL_ENV
RUN . /code/.venv/bin/activate
RUN $VIRTUAL_ENV/bin/pip install --upgrade pip
RUN $VIRTUAL_ENV/bin/pip install -r requirements.txt

# Copia el código de la aplicación
COPY conf/gunicorn_config.py /code/conf/gunicorn_config.py
COPY app /code/app
COPY mlReview /code/mlReview
COPY models /code/models
COPY manage.py /code/manage.py

# Lista los contenidos del directorio /code para verificación
RUN ls -la /code

# Ejecuta las migraciones de Django
RUN $VIRTUAL_ENV/bin/python manage.py migrate

# Exponer el puerto 8000
EXPOSE 8000

# Comando por defecto para ejecutar la aplicación
CMD ["gunicorn", "-c", "conf/gunicorn_config.py", "userService"]