from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['super_user'] = user.is_staff

        return token


class UserSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128)
    username = serializers.CharField(max_length=150)
#    first_name = serializers.CharField(max_length=30, allow_blank=True, allow_null=True, default=None)
#    last_name = serializers.CharField(max_length=150, allow_blank=True, allow_null=True, default=None)
#    email = serializers.EmailField(allow_blank=True, allow_null=True, default=None)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password")
        instance.__dict__.update(validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'