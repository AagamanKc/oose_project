from rest_framework import serializers
from .models import Users

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure the password is write-only
    class Meta:
        model = Users
        fields = '__all__'
    def create(self, validated_data):
        # Hash the password before saving
        password = validated_data.pop('password')  # Remove password from validated_data
        user = Users(**validated_data)  # Create the user instance without password
        print(user)
        user.set_password(password)  # Hash the password
        user.save()  # Save the user instance with hashed password
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure the password is write-only
    class Meta:
        model = Users
        fields = ['email', 'password']

    def validate(self, data):
        try:
            # Try to get the user by email
            user = Users.objects.get(email=data['email'])
            print("User found:", user)
        except Users.DoesNotExist:
            raise serializers.ValidationError("User not found!")
        # Check if the password matches
        if not user.check_password(data['password']):
            print("Password does not match")
            raise serializers.ValidationError("Incorrect password!")
        # Return the user object in the validated data (you can add it if needed)
        data['user'] = user  # Optionally, you can return the user object for token creation
        return data