# models.py in 'user' app
from django.db import models


from django.contrib.auth.hashers import make_password, check_password

class Users(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    email = models.EmailField()
    password = models.CharField(max_length=255)  # Store the hashed password
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


