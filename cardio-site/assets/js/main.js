// =============================================
// CONFIGURAÇÃO CENTRAL DO TEMPLATE
// =============================================
const siteConfig = {
    doctorName: "Dra. Mariana Silva",
    specialty: "Cardiologia",
    whatsappNumber: "5531989126437",     
    clinicName: "Clínica Cardioprev",
    address: "Av. Paulista, 1234 - 8º andar, São Paulo, SP • CEP 01310-100",
    crm: "123.456 / RQE 45.678",
    pixelId: "",                         
    gaId: ""                            
};

// =============================================
// WHATSAPP DINÂMICO (Lead quente)
// =============================================
function sendToWhatsApp(nome, telefone, mensagem) {
    const texto = `Olá Dra. Mariana! \n\n` +
                  `Meu nome é *${nome}*.\n` +
                  `Telefone/WhatsApp: *${telefone}*\n\n` +
                  `Mensagem:\n${mensagem}\n\n` +
                  `Gostaria de agendar uma consulta.`;

    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}

// =============================================
// FORMULÁRIO
// =============================================
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim() || "Gostaria de agendar uma consulta.";

    if (!nome || !telefone) {
        alert("Por favor, preencha nome e telefone.");
        return;
    }

    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<span class="flex items-center gap-3"><i class="fa-solid fa-check"></i> ENVIANDO...</span>`;
    btn.disabled = true;

    // 1. Abre WhatsApp com mensagem rica
    sendToWhatsApp(nome, telefone, mensagem);

    // 2. (Futuro) Enviar para Webhook / Make / n8n
    // fetch('https://hook.us1.make.com/SEU_WEBHOOK_AQUI', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nome, telefone, mensagem, doctor: siteConfig.doctorName })
    // }).catch(err => console.log("Webhook falhou (demo)", err));

});

// =============================================
// Mobile Menu, Animações e Navbar (mantido do original)
// =============================================
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
}

// Navbar effect
function handleNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('shadow-xl', 'bg-white/95');
        } else {
            navbar.classList.remove('shadow-xl', 'bg-white/95');
        }
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Init
window.onload = function() {
    handleScrollAnimations();
    handleNavbar();

    // Keyboard ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    console.log(`%c✅ Template ${siteConfig.doctorName} carregado com sucesso!`, 'color:#0f766e; font-weight:bold');
};