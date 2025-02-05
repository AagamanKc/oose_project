from rest_framework import serializers
from .models import Users

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure the password is write-only
    class Meta:
        model = Users
        fields = ['name', 'age', 'email', 'password']
    def validate_email(self, value):
        """Ensure the email is unique"""
        if Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    def create(self, validated_data):
        # Get the password from the validated data
        password = validated_data.pop('password')
        # Create the user without the password (it will be set later)
        user = Users(**validated_data)
        # Set the hashed password
        user.set_password(password)
        # Save the user object with the hashed password
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            user = Users.objects.get(email=data['email'])
        except Users.DoesNotExist:
            raise serializers.ValidationError("User not found!")
        # Check if the password matches
        if not user.check_password(data['password']):
            raise serializers.ValidationError("Incorrect password!")
        return data