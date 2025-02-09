from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from .serializers import RegisterSerializer, LoginSerializer
from .models import Users
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny




class Register(APIView):
    permission_classes = [AllowAny]  # ✅ This allows public access to login
    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)
        if not serializer.is_valid():
            return Response({
                'status':False,
                'message': serializer.errors
                },status= status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({
            'message':'user created'
        },status=status.HTTP_201_CREATED)
    

class Login(APIView):
    permission_classes = [AllowAny]  # ✅ This allows public access to login
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data = data)
        if not serializer.is_valid():
            return Response({
                'status':False,
                'message': serializer.errors
                },status= status.HTTP_400_BAD_REQUEST)
        # Access the user object from validated data
        user = serializer.validated_data['user']
        
        # Generate a refresh token and an access token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({
            'status':True,
            'message':'user login successfully',
            'access_token': access_token,
            'refresh_token': str(refresh)
        },status=status.HTTP_202_ACCEPTED)


        

