class HamburguerMenu extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // Crie o botão do hamburguer
    const button = document.createElement('button');
    button.id = 'hamburger-button';
    button.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    // Adicione um evento de clique para alternar a classe "active" e a animação
    button.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Estilos para o componente
    const style = document.createElement('style');
    style.textContent = `

      #hamburger-button {
        background-color: transparent;
        border: 0;
        overflow: hidden;
        cursor: pointer;
        padding: 0;
      }

      #hamburger-button span {
        width: 30px;
        display: block;
        border: 2px solid var(--hamburguer-color);
        border-radius: 10%;
        transition: transform 0.2s ease-out;
        margin-top: 6px;
      }

      #hamburger-button span:nth-child(1) {
        margin:0;
      }

      #hamburger-button span:nth-child(2) {
        width: 20px;
      }

    `;

    shadow.appendChild(style);
    shadow.appendChild(button);

    // Feche o menu quando um link do menu é clicado
    const menuItems = document.querySelectorAll('.menu-item a');
    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.closeMenu();
      });
    });
  }

  toggleMenu() {
    const sidebar = document.querySelector('#sidebar');
    if (this.classList.contains('active')) {
      sidebar.style.left = '-1000px';
    } else {
      sidebar.style.left = '0';
    }

    const spans = this.shadowRoot.querySelectorAll('#hamburger-button span');
    if (this.classList.contains('active')) {
      spans[0].style.transform = 'rotate(0) translate(0)';
      spans[1].style.transform = 'translate(0px)';
      spans[2].style.transform = 'rotate(0) translate(0)';
    } else {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 8px)';
      spans[1].style.transform = 'translate(-50px)';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
    }

    // Alterna a classe "active" no componente
    this.classList.toggle('active');
    this.toggleBodyScroll();
  }

  toggleBodyScroll() {
    const body = document.body;
    if (window.innerWidth < 920) {
      if (this.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'auto';
      }
    }
  }

  closeMenu() {
    this.toggleMenu(); // Feche o menu chamando o método toggleMenu
  }
}

customElements.define('hamburguer-menu', HamburguerMenu);
