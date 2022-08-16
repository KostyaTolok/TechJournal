from django.contrib import admin
from django.contrib.auth.models import Group

from users.models import *

admin.site.register(User)
admin.site.register(UserProfile)
admin.site.unregister(Group)
