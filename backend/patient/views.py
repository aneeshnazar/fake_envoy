# Create your views here.
from django.template.backends import django
from rest_framework import status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from patient.models import Patient
from patient.resources import PatientSerializer, DoctorSerializer


class Patients(APIView):
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    def post(self, request: Request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Doctor(APIView):
    def get(self, request):
        patients = Patient.objects.all()
        serializer = DoctorSerializer(patients, many=True)
        return Response(serializer.data)

class NextPatient(APIView):
    def get(self, request, pk):
        patient = Patient.objects.get(pk=pk)
        serializer = DoctorSerializer(patient, many=False)
        return Response(serializer.data)

    def delete(self, request, pk):
        next_patient = Patient.objects.get(pk=pk)
        serializer = DoctorSerializer(next_patient, many=False)
        next_patient.delete()
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

