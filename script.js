document.addEventListener("DOMContentLoaded", function () {
  // Inicialização do AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Animação inicial de fade-in para as seções principais
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  const sectionsToFadeIn = document.querySelectorAll(".fade-in");
  sectionsToFadeIn.forEach((section) => {
    observer.observe(section);
  });

  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // Lógica para o Menu Mobile
  const menuMobile = document.querySelector(".menu-mobile");
  const nav = document.querySelector("header nav");

  if (menuMobile) {
    menuMobile.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
    nav.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }

  // Animação das barras de progresso (Seção Habilidades)
  const progressBars = document.querySelectorAll(".progress");
  const skillsSection = document.getElementById("habilidades");

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressBars.forEach((bar) => {
              const width = bar.getAttribute("data-width");
              bar.style.width = width;
            });
            skillsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillsObserver.observe(skillsSection);
  }

  // Lógica para os Modais de Projeto
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

  // --- FUNÇÃO PARA EXIBIR TOASTS ---
  function showToast(message, type = "success") {

    const toast = document.getElementById("toast-message");
    const toastText = document.getElementById("toast-text");

    toastText.textContent = message;
    toast.className = "toast show " + type;

    setTimeout(function () {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

  // Função para formatar o telefone
  window.formatarTelefone = function (telefone) {
    const apenasNumeros = telefone.value.replace(/\D/g, "");
    const formatoTelefone = apenasNumeros
      .replace(/(\d{2})(\d)(\d{4})(\d+)/, "($1) $2 $3-$4")
      .trim();
    telefone.value = formatoTelefone;
  };

  // Lógica de envio do formulário de contato
  const contatoForm = document.getElementById("contatoForm");
  if (contatoForm) {
    contatoForm.onsubmit = function (event) {
      event.preventDefault();

      const myForm = event.target;
      const formData = new FormData(myForm);

      formData.append("form-name", myForm.getAttribute("id"));

      fetch("/", {
        method: "POST",
        body: new URLSearchParams(formData).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          if (response.ok) {
            showToast("Mensagem enviada com sucesso!", "success");
            contatoForm.reset();
          } else {

            showToast(
              "Ops, algo deu errado! Por favor, tente novamente.",
              "error"
            );
            console.error(
              "Erro ao enviar formulário Netlify:",
              response.statusText
            );
          }
        })
        .catch((error) => {
          console.error("Erro no fetch do formulário:", error);
          showToast(
            "Ops, algo deu errado! Por favor, tente novamente.",
            "error"
          );
        });
    };
  }

  let currentIndex = 0;
  const graphicFlexContainers = document.querySelectorAll(".graphic-flex");

  function updateGraphicScroll() {
    graphicFlexContainers.forEach((container, index) => {
      container.style.display = index === currentIndex ? "flex" : "none";
    });
  }
  updateGraphicScroll();
});
