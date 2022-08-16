from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self, email, username, password):
        if not email:
            raise ValueError('Email must be specified')
        if not username:
            raise ValueError('Username must be specified')

        user = self.model(email=email, username=username)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password=None):
        user = self.create_user(email="admin@gmail.com", username=username, password=password)

        user.is_admin = True
        user.save(using=self._db)

        UserProfile.objects.create(user=user)

        return user


class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="Email пользователя", max_length=40, unique=True)
    username = models.CharField(verbose_name="Имя пользователя", max_length=40, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'username']

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin

    @staticmethod
    def has_perm(perm, obj=None):
        return True

    @staticmethod
    def has_module_perms(app_label):
        return True

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self


class UserProfile(models.Model):
    user = models.OneToOneField(User, verbose_name="Пользователь", on_delete=models.CASCADE)
    image = models.ImageField(verbose_name="Изображение пользователя", upload_to="users/", blank=True, null=True)

    def __str__(self):
        return "Профиль пользователя " + self.user.username