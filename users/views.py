import json

from django.contrib.auth.models import User
from django.http import  JsonResponse, Http404, HttpResponseBadRequest
from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import get_object_or_404

from .forms import UserRegisterForm, NoteForm, ShareAccessForm
from django.contrib.auth.decorators import login_required
from .models import Note, SharedAccess


from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm

from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User

from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout
# views.py

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages

from django.contrib.auth.models import User
from django.http import JsonResponse

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username', '')
        password = data.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success'})
    return render(request, 'login.html')
def register(request):
    if request.method == 'POST':
        # Get form data from request
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        password1 = data.get('password')
        password2 = data.get('confirmPassword')

        # Perform manual form validation
        if password1 != password2:
            return JsonResponse({'success': False, 'message': 'Passwords do not match'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'message': 'Username is already taken'}, status=400)

        # Create user manually
        user = User.objects.create_user(username=username, email=email, first_name=first_name, last_name=last_name, password=password1)
        user.save()

        return JsonResponse({'success': True})
    else:
        return render(request, 'register.html')

@login_required
def logout_view(request):
    logout(request)
    return render(request, 'logout.html')

@login_required
def notes(request):
    if request.method == 'POST':
        user = request.user
        notes = Note.objects.filter(user=user)
        notes_list = [{'id': note.id, 'title': note.title, 'content': note.content, "date":note.created_at} for note in notes]
        return JsonResponse(notes_list, safe=False)
    else:
        return render(request, 'notes.html')
@login_required
def create_note(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            note = form.save(commit=False)
            note.user = request.user
            content = note.content
            if len(content) >= 404:
                return HttpResponseBadRequest("Content is too long. Maximum length is 404 characters.")
            note.save()
            return redirect('/notes/')
    else:
        form = NoteForm()

    context = {
        'form': form,
    }
    return render(request, 'create_note.html', context)


@login_required
def delete_note(request, id):
    user = request.user
    try:
        document = Note.objects.get(pk=id, user=user)
        document.delete()
        messages.success(request, f'Note Deleted Successfully')
        return redirect('/notes/')
    except Note.DoesNotExist:
        raise Http404("Note not found.")


@login_required
def edit_note(request, id):
    user = request.user
    note = get_object_or_404(Note, pk=id)

    if user != note.user and user not in note.users_with_edit_access.all():
        raise Http404("You do not have permission to edit this note.")

    if request.method == 'POST':
        form = NoteForm(request.POST, instance=note)
        if form.is_valid():
            content = note.content
            if len(content) >= 404:
                return HttpResponseBadRequest("Content is too long. Maximum length is 404 characters.")
            form.save()
            messages.success(request, 'Note Updated Successfully')
            return redirect('/notes/')
    else:
        form = NoteForm(instance=note)

    context = {
        'form': form,
    }
    return render(request, 'edit_note.html', context)


@login_required
def view_note(request, id):
    user = request.user
    try:
        note = Note.objects.get(pk=id)
    except Note.DoesNotExist:
        raise Http404("Note does not exist or you do not have permission to view it.")

    if user != note.user and user not in note.users_with_edit_access.all():
        raise Http404("Note does not exist or you do not have permission to view it.")

    context = {
        'note': note,
    }
    return render(request, 'view.html', context)


@login_required
def share_note_access(request, note_id):
    user = request.user
    note = get_object_or_404(Note, pk=note_id, user=user)
    max_shared_accesses = 5
    if note.sharedaccess_set.count() >= max_shared_accesses:
        return JsonResponse({'error': 'Maximum number of shared accesses reached'}, status=400)

    if request.method == 'POST':
        form = ShareAccessForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']

            try:
                shared_user = User.objects.get(username=username)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User with given username doesn\'t exist.'}, status=404)

            if shared_user == user or shared_user in note.users_with_edit_access.all():
                return JsonResponse({'error': 'User already has access to the note'}, status=400)

            if not note.users_with_edit_access.filter(username=username).exists():
                shared_access, created = SharedAccess.objects.get_or_create(
                    note=note,
                    shared_user=shared_user,
                    last_edit=timezone.now()
                )
                if created:
                    note.users_with_edit_access.add(shared_user)

                    messages.success(request, f'Note Given Access Successfully')
                    return redirect('/notes/')

    form = ShareAccessForm()
    context = {
        'form': form,
        'note': note,
    }
    return render(request, 'share_note.html', context)


@login_required
def shared_notes(request):
    user = request.user
    shared_notes = Note.objects.filter(users_with_edit_access=user)

    context = {
        'shared_notes': shared_notes,
    }
    return render(request, 'shared_notes.html', context)


@login_required
def view_statistics(request):
    user = request.user

    user_notes = Note.objects.filter(user=user)

    user_shared_accesses = SharedAccess.objects.filter(shared_user=user)

    context = {
        'user_notes': user_notes,
        'user_shared_accesses': user_shared_accesses,
    }
    return render(request, 'statistics.html', context)
