document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const sectionsToFadeIn = document.querySelectorAll('.fade-in');
    sectionsToFadeIn.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener("load", function () {
        document.body.classList.add("loaded");
    });

    const menuMobile = document.querySelector('.menu-mobile');
    const nav = document.querySelector('header nav');

    if (menuMobile) {
        menuMobile.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        nav.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    const progressBars = document.querySelectorAll('.progress');
    const skillsSection = document.getElementById('habilidades');

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
    }

    const projectTriggers = document.querySelectorAll(".img-port");

    projectTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project");
        const modal = document.getElementById(`modal-${projectId}`);
        if (modal) {
          modal.style.display = "flex";
        }
      });
    });

    const closeButtons = document.querySelectorAll(".close-button");

    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modal = this.closest(".project-modal");
        if (modal) {
          modal.style.display = "none";
        }
      });
    });

    window.addEventListener("click", function (event) {
      document.querySelectorAll(".project-modal").forEach((modal) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    });

    window.formatarTelefone = function(telefone) {
        const apenasNumeros = telefone.value.replace(/\D/g, "");
        const formatoTelefone = apenasNumeros
            .replace(/(\d{2})(\d)(\d{4})(\d+)/, "($1) $2 $3-$4")
            .trim();
        telefone.value = formatoTelefone;
    };

    const contatoForm = document.getElementById("contatoForm");
    if (contatoForm) {
        contatoForm.onsubmit = function (event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch("envia.php", {
                method: "POST",
                body: formData,
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao enviar o formulário");
                }
                return response.text();
            })
            .then((data) => {
                const mensagemResposta = document.getElementById("mensagemResposta");
                if (mensagemResposta) {
                    mensagemResposta.textContent = "Mensagem enviada com sucesso!";
                    mensagemResposta.style.color = "green";
                    mensagemResposta.style.display = "block";
                    contatoForm.reset();
                }
            })
            .catch((error) => {
                const mensagemResposta = document.getElementById("mensagemResposta");
                if (mensagemResposta) {
                    mensagemResposta.textContent =
                        "Ops, algo deu errado! Pode entrar em contato comigo pelo WhatsApp: 61 99640-6276";
                    mensagemResposta.style.color = "red";
                    mensagemResposta.style.display = "block";
                }
            });
        };
    }

    // Lógica para o scroll suave dos links do menu
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    let currentIndex = 0; // Índice atual das filas
    const graphicFlexContainers = document.querySelectorAll(".graphic-flex");
});