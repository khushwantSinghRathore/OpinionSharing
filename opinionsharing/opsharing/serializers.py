from rest_framework import serializers
from .models import OpPost

class OpPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpPost
        fields = ('hashtag','content')

