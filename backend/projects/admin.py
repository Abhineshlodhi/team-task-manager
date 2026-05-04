from django.contrib import admin
from .models import Project, ProjectMember, Task

class ProjectMemberInline(admin.TabularInline):
    model = ProjectMember
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    search_fields = ('name',)
    inlines = [ProjectMemberInline]

@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ('project', 'user', 'joined_at')
    list_filter = ('project',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'priority', 'status', 'assigned_to', 'due_date')
    list_filter = ('status', 'priority', 'project')
    search_fields = ('title', 'description')
