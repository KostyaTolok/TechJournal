from django.core.mail import send_mail
from celery import shared_task
from TechJournal import settings


@shared_task
def send_greetings_email_task(email, username):
    send_mail(
        'Welcome to TechJournal!',
        f'Thank you for joining TechJournal, {username}!',
        settings.EMAIL_HOST,
        [email],
        fail_silently=False,
    )
