from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TechJournal.settings')

app = Celery('TechJournal')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks(packages=['TechJournal.jwt_auth'])