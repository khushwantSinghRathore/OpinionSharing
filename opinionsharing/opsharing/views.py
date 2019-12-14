from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OpPostSerializer
from .models import OpPost

# Create your views here.

# class OPsharingView(viewsets.ModelViewSet):    
#     # queryset = OpPost.object.all()  
#     serializer_class = OPSerializer

class Opinions(APIView):

    def get(self, request):
        vari = OpPost.objects.all()
        serializer = OpPostSerializer(vari, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer  = OpPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #         article = request.data.get('article')

    #         # Create an article from the above data
    #         serializer = ArticleSerializer(data=article)
    #         if serializer.is_valid(raise_exception=True):
    #             article_saved = serializer.save()
    #         return Response({"success": "Article '{}' created successfully".format(article_saved.title)})
        
