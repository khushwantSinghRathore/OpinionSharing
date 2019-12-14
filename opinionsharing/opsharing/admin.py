from django.contrib import admin
from .models import OpPost

# # Register your models here.

class OpAdmin(admin.ModelAdmin): 
    list_display = ('hashtag', 'content') 



admin.site.register(OpPost,OpAdmin)
