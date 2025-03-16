<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>TechnicIA - @yield('title')</title>
    
    <!-- CSS from CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    <style>
        :root {
            --background-primary: #030712;
            --background-secondary: #111827;
            --accent-primary: #3b82f6;
            --accent-secondary: #60a5fa;
            --text-primary: #f8fafc;
            --text-secondary: #cbd5e1;
        }

        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--background-primary);
            color: var(--text-primary);
            min-height: 100vh;
            margin: 0;
            overflow-x: hidden;
        }

        .glass-card {
            background: rgba(17, 24, 39, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
            transform: translateY(-5px) scale(1.02);
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
        }

        .btn-primary {
            background-color: var(--accent-primary);
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 8px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .btn-primary:hover {
            background-color: var(--accent-secondary);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-primary::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300%;
            height: 300%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 50%);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary:hover::before {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }

        .btn-outline {
            background: transparent;
            border: 2px solid var(--accent-primary);
            color: var(--accent-primary);
            padding: 0.8rem 2rem;
            border-radius: 8px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-outline:hover {
            background-color: var(--accent-primary);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .form-control {
            background-color: var(--background-secondary);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            background-color: var(--background-secondary);
            border-color: var(--accent-primary);
            color: var(--text-primary);
            box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
        }

        .navbar {
            background-color: rgba(3, 7, 18, 0.8);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-link {
            color: var(--text-secondary);
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--accent-primary);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        }

        .nav-link:hover {
            color: var(--accent-primary);
        }

        .nav-link:hover::after {
            transform: scaleX(1);
        }

        .nav-link.active {
            color: var(--accent-primary);
        }

        .nav-link.active::after {
            transform: scaleX(1);
        }

        .gradient-bg {
            background: linear-gradient(135deg, var(--background-primary), var(--background-secondary));
            position: relative;
            overflow: hidden;
        }

        .gradient-bg::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
                circle,
                var(--accent-primary) 0%,
                transparent 70%
            );
            opacity: 0.1;
            animation: rotate 20s linear infinite;
        }

        .gradient-text {
            background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .particle {
            position: absolute;
            pointer-events: none;
            background-color: var(--accent-primary);
            border-radius: 50%;
            opacity: 0.2;
            will-change: transform, opacity;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .float {
            animation: float 4s ease-in-out infinite;
        }

        /* Intro Animation */
        .intro-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background-color: var(--background-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: opacity 0.5s ease;
        }

        .intro-overlay.hidden {
            opacity: 0;
            pointer-events: none;
        }

        .intro-content {
            text-align: center;
            position: relative;
        }

        .intro-logo {
            width: 128px;
            height: 128px;
            margin: 0 auto 2rem;
            position: relative;
        }

        .intro-logo::before {
            content: '';
            position: absolute;
            inset: -10px;
            border-radius: 50%;
            background: var(--accent-primary);
            opacity: 0.2;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.1); opacity: 0.3; }
        }

        .typing-text {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 2px solid var(--accent-primary);
            animation: typing 3.5s steps(40, end), blink 0.75s step-end infinite;
        }

        @keyframes typing {
            from { width: 0 }
            to { width: 100% }
        }

        @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: var(--accent-primary); }
        }
    </style>
</head>
<body>
    @if(!session('intro_shown'))
    <div id="introOverlay" class="intro-overlay">
        <div class="intro-content">
            <div class="intro-logo">
                <i class="fas fa-brain fa-5x text-primary"></i>
            </div>
            <h1 class="gradient-text mb-4">TechnicIA</h1>
            <p class="typing-text">{{ __('intro.slogan') }}</p>
            <button id="skipIntro" class="btn btn-link text-secondary position-absolute bottom-0 end-0 m-4">
                {{ __('intro.skip') }} <i class="fas fa-times ms-2"></i>
            </button>
        </div>
    </div>
    @endif

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="{{ route('home') }}">
                <i class="fas fa-brain text-primary me-2"></i>
                <span class="gradient-text">TechnicIA</span>
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <i class="fas fa-bars text-primary"></i>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link {{ Request::is('/') ? 'active' : '' }}" href="{{ route('home') }}">
                            {{ __('nav.home') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ Request::is('demo') ? 'active' : '' }}" href="{{ route('demo') }}">
                            {{ __('nav.demo') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ Request::is('about') ? 'active' : '' }}" href="{{ route('about') }}">
                            {{ __('nav.about') }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ Request::is('contact') ? 'active' : '' }}" href="{{ route('contact') }}">
                            {{ __('nav.contact') }}
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-globe me-1"></i>{{ strtoupper(app()->getLocale()) }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a class="dropdown-item" href="{{ route('language', 'fr') }}">Français</a></li>
                            <li><a class="dropdown-item" href="{{ route('language', 'en') }}">English</a></li>
                            <li><a class="dropdown-item" href="{{ route('language', 'de') }}">Deutsch</a></li>
                            <li><a class="dropdown-item" href="{{ route('language', 'it') }}">Italiano</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-5">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="gradient-bg py-5 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="gradient-text mb-3">TechnicIA</h5>
                    <p class="text-secondary">{{ __('footer.description') }}</p>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5 class="text-white mb-3">{{ __('footer.quickLinks') }}</h5>
                    <ul class="list-unstyled">
                        <li><a href="{{ route('home') }}" class="nav-link">{{ __('nav.home') }}</a></li>
                        <li><a href="{{ route('demo') }}" class="nav-link">{{ __('nav.demo') }}</a></li>
                        <li><a href="{{ route('about') }}" class="nav-link">{{ __('nav.about') }}</a></li>
                        <li><a href="{{ route('contact') }}" class="nav-link">{{ __('nav.contact') }}</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5 class="text-white mb-3">{{ __('footer.contact') }}</h5>
                    <ul class="list-unstyled text-secondary">
                        <li><i class="fas fa-envelope me-2"></i>contact@technicia.com</li>
                        <li><i class="fas fa-phone me-2"></i>+33 1 23 45 67 89</li>
                        <li><i class="fas fa-map-marker-alt me-2"></i>123 Tech Street, Paris</li>
                    </ul>
                </div>
                <div class="col-lg-3">
                    <h5 class="text-white mb-3">{{ __('footer.newsletter') }}</h5>
                    <form action="{{ route('newsletter.subscribe') }}" method="POST" class="newsletter-form">
                        @csrf
                        <div class="input-group mb-3">
                            <input type="email" name="email" class="form-control" placeholder="{{ __('footer.newsletterPlaceholder') }}" required>
                            <button class="btn btn-primary" type="submit">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <hr class="border-secondary">
            <div class="text-center text-secondary">
                <small>&copy; {{ date('Y') }} TechnicIA. {{ __('footer.copyright') }}</small>
            </div>
        </div>
    </footer>

    <!-- JavaScript from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    
    <!-- Intro Animation -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const introOverlay = document.getElementById('introOverlay');
            const skipIntro = document.getElementById('skipIntro');
            
            if (introOverlay) {
                // Check if intro has been shown before
                if (!localStorage.getItem('introShown')) {
                    setTimeout(() => {
                        introOverlay.classList.add('hidden');
                        localStorage.setItem('introShown', 'true');
                        fetch('{{ route("intro.shown") }}', {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': '{{ csrf_token() }}'
                            }
                        });
                    }, 4000);
                } else {
                    introOverlay.style.display = 'none';
                }

                skipIntro?.addEventListener('click', () => {
                    introOverlay.classList.add('hidden');
                    localStorage.setItem('introShown', 'true');
                    fetch('{{ route("intro.shown") }}', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}'
                        }
                    });
                });
            }
        });
    </script>

    <!-- Particle Animation -->
    <script>
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            document.body.appendChild(particle);

            gsap.to(particle, {
                x: 'random(-100, 100)',
                y: 'random(-100, 100)',
                opacity: 0,
                duration: 'random(2, 4)',
                ease: 'power1.out',
                onComplete: () => {
                    particle.remove();
                    createParticle();
                }
            });
        }

        for (let i = 0; i < 50; i++) {
            createParticle();
        }
    </script>

    <!-- Newsletter Form Handling -->
    <script>
        document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = this;
            const email = form.querySelector('input[name="email"]').value;
            
            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    alert('{{ __("messages.newsletter_success") }}');
                } else {
                    alert(data.message || '{{ __("messages.error") }}');
                }
            })
            .catch(() => {
                alert('{{ __("messages.error") }}');
            });
        });
    </script>

    @stack('scripts')
</body>
</html>