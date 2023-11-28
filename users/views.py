from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm
from django.contrib.auth.decorators import login_required
from .models import Note

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your Account has been created, You can Login Now!')
            return redirect('/login')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})
@login_required
def notes(request):
    user = request.user
    id = int(request.GET.get('id', 0))
    documents = Note.objects.filter(user=user)

    if request.method == 'POST':
        id = int(request.POST.get('id', 0))
        title = request.POST.get('title')
        content = request.POST.get('content', '')

        if id > 0:
            document = Note.objects.get(pk=id, user=user)
            document.title = title
            document.content = content
            document.save()
            return redirect('/notes/?id=%i' % id)
        else:
            document = Note.objects.create(title=title, content=content, user=user)
            return redirect('/notes/?id=%i' % document.id)

    if id > 0:
        document = Note.objects.get(pk=id, user=user)
    else:
        document = ''

    context = {
        'id': id,
        'documents': documents,
        'document': document
    }
    return render(request, 'users/notes.html', context)

@login_required
def delete_note(request, id):
    user = request.user
    document = Note.objects.get(pk=id, user=user)
    document.delete()
    messages.success(request, f'Note Deleted Successfully')
    return redirect('/notes/?id=0')
