from django.db import models

# Create your models here.
class OpPost(models.Model):
    hashtag = models.CharField(max_length=255)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.hashtag