from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Note


class Test(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')
        self.note = Note.objects.create(user=self.user, title='Test Note', content='Test content')

    def test_create_note(self):
        response = self.client.post('/create_note/', {'title': 'Test Note', 'content': 'Test content'})
        self.assertEqual(response.status_code, 302)  # Check if the note is created successfully and user is redirected

    def test_delete_note(self):
        response = self.client.get(reverse('delete_note', args=[self.note.id]))
        self.assertEqual(response.status_code, 302)  # Check if the note is deleted successfully and user is redirected

    def test_edit_note(self):
        response = self.client.post(reverse('edit_note', args=[self.note.id]), {'title': 'Updated Note', 'content': 'Updated content'})
        self.assertEqual(response.status_code, 302)  # Check if the note is edited successfully and user is redirected

    def test_view_note(self):
        response = self.client.get(reverse('view_note', args=[self.note.id]))
        self.assertEqual(response.status_code, 200)  # Check if the note is viewed successfully

    def test_share_note_access(self):
        shared_user = User.objects.create_user(username='shareduser', password='sharedpassword')
        response = self.client.post(reverse('share_note_access', args=[self.note.id]), {'username': 'shareduser'})
        self.assertEqual(response.status_code, 302)  # Check if the note is shared successfully and user is redirected

    def test_shared_notes(self):
        response = self.client.get('/shared_notes/')
        self.assertEqual(response.status_code, 200)  # Check if the shared notes are viewed successfully

    def test_view_statistics(self):
        response = self.client.get('/statistics/')
        self.assertEqual(response.status_code, 200)

    def test_create_note_with_invalid_content(self):
        response = self.client.post('/create_note/', {'title': 'Test Note', 'content': 'a' * 500})
        self.assertEqual(response.status_code, 400)

    def test_delete_note_nonexistent_id(self):
        nonexistent_id = self.note.id + 1
        response = self.client.get(reverse('delete_note', args=[nonexistent_id]))
        self.assertEqual(response.status_code, 404)

    def test_edit_note_with_invalid_content(self):
        response = self.client.post(reverse('edit_note', args=[self.note.id]),
                                    {'title': 'Updated Note', 'content': 'a' * 500})
        self.assertEqual(response.status_code, 400)

    def test_view_note_nonexistent_id(self):
        nonexistent_id = self.note.id + 1
        response = self.client.get(reverse('view_note', args=[nonexistent_id]))
        self.assertEqual(response.status_code, 404)

    def test_shared_notes_view(self):
        response = self.client.get('/shared_notes/')
        self.assertEqual(response.status_code, 200)

    def test_share_note_access_nonexistent_user(self):
        nonexistent_username = 'nonexistentuser'
        response = self.client.post(reverse('share_note_access', args=[self.note.id]),
                                    {'username': nonexistent_username})
        self.assertEqual(response.status_code,
                         404)