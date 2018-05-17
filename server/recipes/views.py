from rest_framework import status, views, generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, MessageSerializer, MyRecipeSerializer
from .models import MyRecipe
from .permissions import IsOwner
from rest_framework import status, views, generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MessageSerializer, MyTokenObtainPairSerializer, UserSerializer
import requests


class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GetRecipeList(generics.ListCreateAPIView):
    serializer_class = MyRecipeSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        RecipeList = MyRecipe.objects.filter(owner=user)
        return RecipeList


class GetMyRecipe(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyRecipe.objects.all()
    serializer_class = MyRecipeSerializer
    lookup_field = 'recipe_id'
    lookup_url_kwarg = 'name'
    permission_classes = (IsOwner,)




