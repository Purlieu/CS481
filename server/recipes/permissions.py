from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    message = 'You are not the owner of this movie'
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user