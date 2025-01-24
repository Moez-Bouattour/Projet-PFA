@component('mail::message')
# Change password Request

Your email: {{ $email }}

Your password: {{ $password }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
