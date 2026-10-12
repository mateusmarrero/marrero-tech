/* ==========================================================================
   Marrero Tech — interações
   ========================================================================== */
(function () {
    'use strict';

    /* --------------------------- Configuração --------------------------- */
    var CONFIG = {
        // Número no formato internacional, só dígitos.
        whatsapp: '5521992724377',
        // Mensagem padrão quando nenhum data-wa é informado.
        defaultMessage: 'Olá, Mateus! Preciso de suporte técnico remoto.'
    };

    var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
    var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

    /* --------------------------- WhatsApp ------------------------------- */
    function waLink(message) {
        return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(message);
    }

    function initWhatsApp() {
        $$('[data-wa]').forEach(function (el) {
            var raw = el.getAttribute('data-wa') || '';
            var msg;
            try { msg = raw ? decodeURIComponent(raw) : CONFIG.defaultMessage; }
            catch (e) { msg = raw || CONFIG.defaultMessage; }

            el.setAttribute('href', waLink(msg));
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener');
        });
    }

    /* --------------------------- Menu mobile ---------------------------- */
    function initNav() {
        var toggle = $('#navToggle');
        var nav = $('#primaryNav');
        if (!toggle || !nav) return;

        function close() {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
            document.body.classList.remove('nav-open');
        }

        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            document.body.classList.toggle('nav-open', open);
        });

        $$('a', nav).forEach(function (a) { a.addEventListener('click', close); });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 720) close();
        });
    }

    /* --------------------------- Cabeçalho / topo ----------------------- */
    function initScrollUI() {
        var header = $('#siteHeader');
        var toTop = $('#toTop');

        function onScroll() {
            var y = window.scrollY || window.pageYOffset;
            if (header) header.classList.toggle('is-scrolled', y > 12);
            if (toTop) toTop.classList.toggle('is-visible', y > 600);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* --------------------------- Reveal on scroll ----------------------- */
    function initReveal() {
        var items = $$('.reveal');
        if (!items.length) return;

        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        items.forEach(function (el) { io.observe(el); });
    }

    /* --------------------------- Formulário ----------------------------- */
    function initForm() {
        var form = $('#contactForm');
        if (!form) return;
        var note = $('#formNote');
        var defaultNote = note ? note.textContent : '';

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nome = (form.nome.value || '').trim();
            var tel = (form.telefone.value || '').trim();
            var servico = form.servico.value || '';
            var msg = (form.mensagem.value || '').trim();

            if (!nome || !tel || !msg) {
                if (note) {
                    note.textContent = 'Preencha nome, WhatsApp e a descrição do problema.';
                    note.className = 'form__note is-err';
                }
                return;
            }

            var texto =
                'Olá, Mateus! Meu nome é ' + nome + '.\n' +
                'WhatsApp: ' + tel + '\n' +
                'Assunto: ' + servico + '\n' +
                'Problema: ' + msg;

            window.open(waLink(texto), '_blank', 'noopener');

            if (note) {
                note.textContent = 'Abrindo o WhatsApp… se não abrir, fale direto: (21) 99272-4377.';
                note.className = 'form__note is-ok';
            }
            form.reset();
            window.setTimeout(function () {
                if (note) { note.textContent = defaultNote; note.className = 'form__note'; }
            }, 7000);
        });
    }

    /* --------------------------- Ano do rodapé -------------------------- */
    function initYear() {
        var el = $('#ano');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* --------------------------- Boot ----------------------------------- */
    function init() {
        initWhatsApp();
        initNav();
        initScrollUI();
        initReveal();
        initForm();
        initYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
