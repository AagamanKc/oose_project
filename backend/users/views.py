from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer, LoginSerializer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        data = request.data
        serializer = UserSerializer(data= data)
        if serializer.is_valid():
            # Create a new user and hash the password
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            # If valid, return success message or token
            return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
