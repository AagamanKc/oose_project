from django.db import models

class Movie(models.Model):
    imdb_id = models.CharField(max_length=20, unique=True)  # Ensure uniqueness
    title = models.CharField(max_length=255)
    year = models.CharField(max_length=10)
    rated = models.CharField(max_length=10, null=True, blank=True)
    released = models.CharField(max_length=50, null=True, blank=True)
    runtime = models.CharField(max_length=50, null=True, blank=True)
    genre = models.CharField(max_length=255, null=True, blank=True)
    director = models.CharField(max_length=255, null=True, blank=True)
    actors = models.TextField(null=True, blank=True)
    plot = models.TextField(null=True, blank=True)
    language = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    awards = models.TextField(null=True, blank=True)
    poster = models.URLField(null=True, blank=True)
    imdb_rating = models.CharField(max_length=10, null=True, blank=True)
    box_office = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.year})"


