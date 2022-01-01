FROM python:3.9

WORKDIR /app

EXPOSE 5050

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . ./

CMD ["python", "main.py"]
