from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import onnxruntime as ort
import numpy as np
import math
from transformers import BertTokenizer


ort_session = ort.InferenceSession('models/model.onnx')
treshold = 0.5

def sigmoid(x):
    return 1 / (1+ math.exp(-x)) 

def tokenize(text):
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    return tokenizer(text, return_tensors='np', padding='max_length', truncation=True, max_length=20786)

class Reviews(APIView):
    def post(self, request):
        review = request.data["review"] #Se obtiene la reseña enviada por el usuario
        token = tokenize(review) #Se tokeniza el texto para tener el formato del input del modelo
        input_name = ort_session.get_inputs()[0].name #Se obtiene el nombre del input
        outputs = ort_session.get_outputs()[0].name #Se obtiene el nombre del output
        ort_inputs = { #Se define el input, con formato de float32
            input_name: token['input_ids'].astype(np.float32)  
        }
        ort_output = ort_session.run([outputs], ort_inputs)[0] #Se ejecuta el modelo, con el input
        output = sigmoid(ort_output) #Se obtiene el output y se calcula el porcentaje de acierto
        return Response({"output": output, "response": "positivo" if output > treshold else "negativo"}, status=status.HTTP_200_OK) #Se retorna la respuesta para ser manejada por el frontend