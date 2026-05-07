from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Project, ProjectMember, Task
from .serializers import ProjectSerializer, ProjectMemberSerializer, TaskSerializer

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'Admin'

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Admin':
            return (Project.objects.filter(created_by=user) | Project.objects.filter(members__user=user)).distinct()
        return Project.objects.filter(members__user=user).distinct()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        project = serializer.save(created_by=self.request.user)
        ProjectMember.objects.create(project=project, user=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsAdminUser])
    def add_member(self, request, pk=None):
        project = self.get_object()
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'user_id required'}, status=status.HTTP_400_BAD_REQUEST)
        
        member, created = ProjectMember.objects.get_or_create(project=project, user_id=user_id)
        if not created:
            return Response({'error': 'User is already a member'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(ProjectMemberSerializer(member).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'], url_path='remove_member/(?P<user_id>[^/.]+)', permission_classes=[permissions.IsAuthenticated, IsAdminUser])
    def remove_member(self, request, user_id=None, pk=None):
        project = self.get_object()
        member = get_object_or_404(ProjectMember, project=project, user_id=user_id)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Admin':
            return (Task.objects.filter(project__created_by=user) | Task.objects.filter(project__members__user=user)).distinct()
        return (Task.objects.filter(assigned_to=user) | Task.objects.filter(project__members__user=user)).distinct()

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def update(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()
        
        # Members can only update status
        if user.role != 'Admin':
            data = {'status': request.data.get('status', instance.status)}
            serializer = self.get_serializer(instance, data=data, partial=True)
        else:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'Admin':
            tasks = (Task.objects.filter(project__created_by=user) | Task.objects.filter(project__members__user=user)).distinct()
        else:
            tasks = Task.objects.filter(assigned_to=user).distinct()

        total_tasks = tasks.count()
        completed_tasks = tasks.filter(status='Completed').count()
        pending_tasks = tasks.filter(status__in=['Todo', 'In Progress']).count()
        
        from django.utils import timezone
        overdue_tasks = tasks.filter(due_date__lt=timezone.now().date()).exclude(status='Completed').count()
        
        return Response({
            'total': total_tasks,
            'completed': completed_tasks,
            'pending': pending_tasks,
            'overdue': overdue_tasks,
        })
