
document.addEventListener("DOMContentLoaded", function () {
    const btnLogin = document.querySelector(".btn-login");
    const emailInput = document.querySelector('input[name="usuario"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const messageDiv = document.getElementById("msg");
  
    btnLogin.addEventListener("click", function (event) {
      event.preventDefault(); // evita envio imediato
  
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      let errorMsg = "";
  
      if (!email.includes("@")) {
        errorMsg += "O email precisa conter '@'.<br>";
      }
  
      if (password.length < 6) {
        errorMsg += "A senha precisa ter no mínimo 6 caracteres.";
      }
  
      if (errorMsg !== "") {
        messageDiv.innerHTML = errorMsg;
        messageDiv.style.color = "red";
      } else {
        messageDiv.innerHTML = "Login bem-sucedido! Redirecionando...";
        messageDiv.style.color = "green";
  
        // Redireciona após 1 segundo
        setTimeout(() => {
          window.location.href = "homepage.html";
        }, 1000);
      }
    });
    

    // document.addEventListener("DOMContentLoaded", function () {
    //   const btn = document.getElementById("showCreditsBtn");
    //   const creditsDiv = document.getElementById("credits");
    
    //   btn.addEventListener("click", function () {
    //     creditsDiv.style.display = "block"; // exibe a div
    //   });
    // });
    


  //   function toggleInfo(section) {
  //     const element = document.getElementById(section);
  //     element.style.display = element.style.display === "block" ? "none" : "block";
  //   }
  });
  

