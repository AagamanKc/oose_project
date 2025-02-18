from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'  # Or specify the fields you need like ['id', 'title', 'year', 'imdb_rating']
