from django.contrib.auth.models import User
from django.db import models


class MyRecipe(models.Model):
    recipe_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    image_url = models.URLField()
    ingredient1 = models.CharField(max_length=1024)
    ingredient2 = models.CharField(max_length=1024, null=True)
    owner = models.ForeignKey(User,on_delete=models.CASCADE, null=True)

