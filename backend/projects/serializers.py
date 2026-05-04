from rest_framework import serializers
from .models import Project, ProjectMember, Task
from users.serializers import UserSerializer

class ProjectMemberSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    class Meta:
        model = ProjectMember
        fields = ('id', 'user', 'user_details', 'joined_at')
        read_only_fields = ('id', 'joined_at')

class ProjectSerializer(serializers.ModelSerializer):
    members = ProjectMemberSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'created_by', 'created_at', 'members')
        read_only_fields = ('id', 'created_by', 'created_at')

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_details = UserSerializer(source='assigned_to', read_only=True)
    class Meta:
        model = Task
        fields = ('id', 'project', 'title', 'description', 'priority', 'status', 'due_date', 'assigned_to', 'assigned_to_details', 'created_by', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_by', 'created_at', 'updated_at')
