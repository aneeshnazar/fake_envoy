from rest_framework.response import Response

from patient.models import Patient
from rest_framework import serializers
from rest_framework.views import APIView


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id',
                  'first_name',
                  'last_name',
                  'description',
                  'email',
                  'check_in_time',
                  'hash')


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('first_name',
                  'last_name',
                  'check_in_time',
                  'hash')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['last_name'] = ret['last_name'][0]
        return ret
