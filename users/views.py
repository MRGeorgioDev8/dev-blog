
from django.shortcuts import render

from django.shortcuts import render, redirect
from .models import Profile, Message
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from .forms import CustomUserCreationForm, ProfileForm, SkillForm, MessageForm
from django.contrib.auth.decorators import login_required
from .utils import search_profiles, paginate_profiles


def profiles(request):
    prof, search_query = search_profiles(request)

    custom_range, prof = paginate_profiles(request, prof, 3)

    context = {
        "profiles": prof,
        "search_query": search_query,
        "custom_range": custom_range
    }
    return render(request, 'users/index.html', context)


def user_profile(request, pk):
    prof = Profile.objects.get(id=pk)

    top_skills = prof.skill_set.exclude(description__exact="")

    other_skills = prof.skill_set.filter(description="")

    context = {
        'profile': prof,
        'top_skills': top_skills,
        'other_skills': other_skills
    }
    return render(request, 'users/profile.html', context)


def login_user(request):
    if request.user.is_authenticated:
        return redirect('profiles')

    if request.method == "POST":
        username = request.POST['username'].lower()
        password = request.POST['password']

        try:
            user = User.objects.get(username=username)
        except ObjectDoesNotExist:
            messages.error(request, "Имя пользователя не существует")


        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('profiles')
        else:
            messages.error(request, "Имя пользователя или пароль неверны")


    return render(request, "users/login_register.html")


def logout_user(request):
    logout(request)
    messages.info(request, "Пользователь вышел из системы!")

    return redirect('login')


def register_user(request):
    page = 'register'
    form = CustomUserCreationForm()

    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            messages.success(request, 'Учетная запись пользователя создана!')


            login(request, user)
            return redirect('profiles')
        else:
            messages.error(request, 'Во время регистрации произошла ошибка')

    context = {'page': page, 'form': form}
    return render(request, "users/login_register.html", context)


@login_required(login_url='login')
def user_account(request):
    prof = request.user.profile
    skills = prof.skill_set.all()
    projects = prof.project_set.all()
    context = {
        'profile': prof,
        'skills': skills,
        'projects': projects
    }
    return render(request, 'users/account.html', context)


@login_required(login_url='login')
def edit_account(request):
    profile = request.user.profile
    form = ProfileForm(instance=profile)

    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('account')

    context = {"form": form}
    return render(request, "users/profile_form.html", context)


@login_required(login_url='login')
def create_skill(request):
    profile = request.user.profile
    form = SkillForm()

    if request.method == "POST":
        form = SkillForm(request.POST)
        if form.is_valid():
            skill = form.save(commit=False)
            skill.owner = profile
            skill.save()
            messages.success(request, "Навык успешно добавлен!")

            return redirect("account")

    context = {"form": form}
    return render(request, "users/skill_form.html", context)


@login_required(login_url='login')
def update_skill(request, pk):
    profile = request.user.profile
    skill = profile.skill_set.get(id=pk)
    form = SkillForm(instance=skill)

    if request.method == "POST":
        form = SkillForm(request.POST, instance=skill)
        if form.is_valid():
            form.save()
            messages.success(request, "Навык был успешно обновлен!")

            return redirect("account")

    context = {'form': form}
    return render(request, "users/skill_form.html", context)


@login_required(login_url='login')
def delete_skill(request, pk):
    profile = request.user.profile
    skill = profile.skill_set.get(id=pk)
    if request.method == "POST":
        skill.delete()
        messages.success(request, "Навык был успешно удален!")

        return redirect('account')
    context = {'object': skill}
    return render(request, "projects/delete.html", context)


@login_required(login_url='login')
def inbox(request):
    profile = request.user.profile
    message_request = profile.messages.all()
    unread_count = message_request.filter(is_read=False).count()
    context = {
        "message_request": message_request,
        "unread_count": unread_count
    }
    return render(request, 'users/inbox.html', context)


@login_required(login_url='login')
def view_message(request, pk):
    profile = request.user.profile
    message = profile.messages.get(id=pk)
    if message.is_read is False:
        message.is_read = True
        message.save()
    return render(request, 'users/message.html', {'message': message})


def create_message(request, pk):
    recipient = Profile.objects.get(id=pk)
    form = MessageForm()

    try:
        sender = request.user.profile
    except:
        sender = None

    if request.method == "POST":
        form = MessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.sender = sender
            message.recipient = recipient

            if sender:
                message.name = sender.name
                message.email = sender.email
            message.save()

            messages.success(request, 'Ваше сообщение доставлено!')

            return redirect('user_profile', pk=recipient.id)

    context = {
        'recipient': recipient,
        'form': form
    }

    return render(request, 'users/message_form.html', context)


