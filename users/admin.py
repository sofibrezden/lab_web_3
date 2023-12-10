from django.contrib import admin
from .models import SharedAccess, Note

class SharedAccessInline(admin.TabularInline):
    model = SharedAccess
    extra = 1

class NoteAdmin(admin.ModelAdmin):
    inlines = [SharedAccessInline]

admin.site.register(Note, NoteAdmin)
