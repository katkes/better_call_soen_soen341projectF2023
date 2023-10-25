# from django.http import HttpResponse
# from rest_framework.views import APIView
# from rest_framework.response import Response


# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.decorators import api_view

from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *

# Create your views here.
# def home(request):
#     return HttpResponse("hello world!")

# Main class
# class ReactView(APIView):
#     def get(self, request):
#         output = [{"employee": output.employee,
#                    "department":output.department}
#                   for output in React.objects.all()]
#         return Response(output) #display employee after get method
#
#     def post(self, request):
#         serializer = ReactSerializer(data = request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data) #save the data by passing the data to the React serializer method


# New main class

class ReactView(generics.ListCreateAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer

# @api_view(['GET', 'POST'])
# def data_list(request):
#     if request.method == 'GET':
#         data = DataModel.objects.all()
#         serializer = DataSerializer(data, many=True)  # Create a serializer
#         return Response(serializer.data)



