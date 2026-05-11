import React from 'react'; 
import './App.css';
  import banner from './assets/banner.png'; 
  import mapImage from './assets/map.png';
   import bnr1 from './assets/bnr1.png'; 
   import whats from './assets/whats.png';
   import anuncio from './assets/anuncio.png';

function App() { return ( <div className="app"> 

<a
  href="https://wa.me/5581982840782"
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp-btn"
>
  <img className='whats' src={whats} alt="WhatsApp" />
</a>
<header className="header">
     <img className="anuncio" src={anuncio} alt="Master Cartuchos Logo" /> 
     <nav className="nav"> 
        <a href="#inicio">Início</a> 
      <a href="#servicos">Serviços</a> 
     <a href="#contato">Contato</a> </nav> 
</header>

 <main className="main"> 
    <section className="banner"> 
        <img className='bnr1' src={bnr1} alt="Banner Master Cartuchos" /> 
        </section> 
        <section className="description"> 
            <p>Trabalhamos com máquinas que promovem resultados de excelentes em qualidade.</p>
             </section>
              <hr /> 

<section className="info"> <div className='banner1'>
         <img src={banner} alt="Banner Master Cartuchos" /> </div> 
     <div className="info-card"> 


<h3 className="local">Localização</h3> <div class="mapa"> <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7899.781155780016!2d-34.921631!3d-8.112623!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1fedb45461db%3A0x2a303a65a07e8af1!2sRecarga%20de%20Cartuchos%20%E2%80%94%20Venda%20de%20cartucho%2C%20venda%20de%20Clip%20e%20Bomba%20de%20V%C3%A1cuo%20%E2%80%94%20Ipsep!5e0!3m2!1spt-BR!2sbr!4v1769741641317!5m2!1spt-BR!2sbr" loading="lazy" referrerpolicy="no-referrer-when-downgrade"> </iframe> </div> </div> </section>



 <footer className="footer"> <p>Rua Dr. Raposo Pinto - 199 Ipsep, Recife PE</p> <p>WhatsApp: 81 98284-0782</p> 
 <p>© 2026 Master Cartuchos. Todos os direitos reservados.</p> 
 </footer>
  </main> 
  </div> ); }
 
 export default App;